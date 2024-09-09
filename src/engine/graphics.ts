import { cells, cellSize, joystickBaseRadius, joystickStickRadius } from "../config";
import { Cube } from "../game/cube";
import { DEBUG, FPS } from "../debug";
import { identity } from "../geom/transform";
import { getColoredImage, getImage, images } from "../resources/images";
import { cubes } from "./stage";
import { time } from "./time";
import { Image } from "../resources/image";
import { clear, createContext, domDocument, dpr, drawImage, getCanvas, getContext, now, resetTransform, setHeight, setWidth } from "../utils/browser";
import { limit, mathFloor, mathMax, mathMin, mathPI2, mathRound } from "../utils/math";
import { getIdByCharCode } from "../resources/font";
import { game } from "../game/game";
import { joystick } from "./joystick";
import { gameScale, windowHeight, windowWidth, stageWidth, screen } from "./screen";
import { icon0, icon1 } from "../resources/ids";
import { levels } from "../levels/builder";

export const world: CanvasRenderingContext2D = createContext();

const sortCubes = (c0: Cube, c1: Cube): number => c0.y + c0.z - c1.y - c1.z;

export const render = () => {
    setWidth(screen, windowWidth);
    setHeight(screen, windowHeight);

    const worldWidth = mathFloor(windowWidth / gameScale);
    const worldHeight = mathFloor(windowHeight / gameScale);

    setWidth(world, worldWidth);
    setHeight(world, worldHeight);

    clear(world);

    const offsetX = mathFloor((worldWidth - stageWidth) / 2);
    const offsetY = cellSize * 4;

    drawCubes(offsetX, offsetY);
    drawIndicators(offsetX, worldHeight);
    drawJoystick();

    clear(screen);
    screen.setTransform(gameScale, 0, 0, gameScale, 0, 0);
    screen.imageSmoothingEnabled = false;
    drawImage(screen, getCanvas(world), 0, 0);
}

function drawCubes(offsetX: number, offsetY: number) {
    cubes.sort(sortCubes);

    updateCubesShading();

    for (let cube of cubes) {
        const x = mathFloor(cube.x + offsetX);
        const y = mathFloor(cube.y + offsetY - cube.z);
        const info = cube.info;
        const height = info.cubeHeight || cellSize;
        drawCubeImage(world, x, y, info.front);
        drawCubeImage(world, x, y - height, info.top);
    }
}

function drawJoystick() {
    if (joystick) {
        drawCircle(world, joystick.base.x / gameScale, joystick.base.y / gameScale, joystickBaseRadius, 'rgba(255,255,255,0.3)');
        drawCircle(world, joystick.stick.x / gameScale, joystick.stick.y / gameScale, joystickStickRadius, 'rgba(255,255,255,0.5)');
    }
}

const drawIndicators = (offsetX: number, worldHeight: number) => {
    resetTransform(world);
    for (let i = 0; i < game.lives; i++) {
        drawImage(world, images[icon0], offsetX + 1 + i * 8, 10);
    }
    drawText(world, offsetX, 1, 'LIVES ' + game.lives, 0xFF2600);

    const times = mathRound(13 - game.timeS);
    for (let i = 0; i < times; i++) {
        drawImage(world, images[icon1], offsetX + cellSize * 14 + 8 - i * 8, 10);
    }
    const timesText = mathMax(0, times) + ' TIME';
    drawText(world, offsetX + 15 * cellSize - 1 - timesText.length * 8, 1, timesText, 0x0096FF);

    const levelsText = 'LEVEL ' + (game.level + 1);
    drawText(world, mathFloor(offsetX + (cellSize * 15 - levelsText.length * 8) / 2), 1, levelsText, 0xffffff);

    if (FPS) {
        const frameTime = (now() - time.nowMS).toFixed();
        const fps = (1 / time.deltaS).toFixed();
        const mode = DEBUG ? 'DEBUG' : '';

        drawText(
            world,
            1,
            worldHeight - 9,
            `FPS ${fps}  TIME ${frameTime}  ${mode}`,
            0xffffff
        );
    }
}

const drawText = (context: CanvasRenderingContext2D, x: number, y: number, text: string, color: number) => {
    resetTransform(context);
    for (let i = 0; i < text.length; i++) {
        const code = text.charCodeAt(i);
        const id = getIdByCharCode(code);
        if (id !== undefined) {
            const char = getColoredImage(id, color);
            drawImage(context, char, x + i * 8, y);
        }
    }
}

const drawCircle = (context: CanvasRenderingContext2D, x: number, y: number, radius: number, color: string) => {
    resetTransform(context);

    context.beginPath();
    context.arc(
        mathFloor(x),
        mathFloor(y),
        mathFloor(radius),
        0, mathPI2, false
    );
    context.lineWidth = 2;
    context.strokeStyle = color;
    context.stroke();
}

const drawCubeImage = (context: CanvasRenderingContext2D, x: number, y: number, image?: Image) => {
    if (image) {
        const canvas = getImage(image.id, image.brigthness);
        const transform = image.transformation || identity;
        context.setTransform(
            transform.a, transform.b, transform.c, transform.d,
            transform.e + x, transform.f + y
        );
        drawImage(context, canvas, 0, 0);
    }
}

const updateCubesShading = () => {
    const start = -cellSize * 3;
    const end = -cellSize * 0;
    const range = end - start;
    for (let cube of cubes) {
        const brigthness = limit(0, 1, (cube.z - start) / range);
        const info = cube.info;
        if (info.front) {
            info.front.brigthness = brigthness;
        }
        if (info.top) {
            info.top.brigthness = brigthness;
        }
    }
}

