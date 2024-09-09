import { cells, cellSize, joystickBaseRadius, joystickStickRadius } from "./config";
import { Cube } from "./cube";
import { DEBUG, FPS } from "./debug";
import { identity } from "./geom/transform";
import { getColoredImage, getImage, images } from "./resources/images";
import { cubes } from "./stage";
import { time } from "./time";
import { Image } from "./image";
import { createContext, domDocument, dpr, drawImage, getCanvas, getContext, now, resetTransform, setHeight, setWidth } from "./utils/browser";
import { limit, mathFloor, mathMin, mathPI2 } from "./utils/math";
import { getIdByCharCode } from "./font";
import { game } from "./game";
import { joystick } from "./joystick";
import { gameScale, windowHeight, windowWidth, stageWidth, screen } from "./screen";

export const world: CanvasRenderingContext2D = createContext();

const sortCubes = (c0: Cube, c1: Cube): number => c0.y + c0.z - c1.y - c1.z;

export const render = () => {
    setWidth(screen, windowWidth);
    setHeight(screen, windowHeight);

    const worldWidth = mathFloor(windowWidth / gameScale);
    const worldHeight = mathFloor(windowHeight / gameScale);
    const worldCanvas = getCanvas(world);

    setWidth(world, worldWidth);
    setHeight(world, worldHeight);

    resetTransform(world);
    world.clearRect(0, 0, worldWidth, worldHeight);

    const offsetX = mathFloor((worldWidth - stageWidth) / 2);
    const offsetY = cellSize * 4;

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

    resetTransform(world);
    const text = '01234567890 LEVEL ' + game.level + ' TIME ' + mathFloor(game.timeS);
    for (let i = 0; i < text.length; i++) {
        const code = text.charCodeAt(i);
        const id = getIdByCharCode(code);
        if (id !== undefined) {
            const char = getColoredImage(id, 0xffffff);
            drawImage(world, char, 1 + 8 * i + offsetX, 1);
        }
    }
    const font = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (let i = 0; i < font.length; i++) {
        const code = font.charCodeAt(i);
        const id = getIdByCharCode(code);
        if (id !== undefined) {
            const char = getColoredImage(id, 0xff9999);
            drawImage(world, char, 1 + 8 * i + offsetX, 1 + 8);
        }
    }

    if (joystick) {
        drawCircle(world, joystick.base.x / gameScale, joystick.base.y / gameScale, joystickBaseRadius, 'rgba(255,255,255,0.3)');
        drawCircle(world, joystick.stick.x / gameScale, joystick.stick.y / gameScale, joystickStickRadius, 'rgba(255,255,255,0.5)');
    }

    resetTransform(screen);
    screen.clearRect(0, 0, windowWidth, windowHeight);
    screen.setTransform(gameScale, 0, 0, gameScale, 0, 0);
    screen.imageSmoothingEnabled = false;
    drawImage(screen, worldCanvas, 0, 0);

    if (FPS) {
        const frameTime = (now() - time.nowMS).toFixed();
        const fps = (1 / time.deltaS).toFixed();

        const mode = DEBUG ? 'DEBUG' : '';

        screen.fillStyle = 'white';
        screen.font = 'arial 20px';
        screen.fillText(`FPS ${fps}   TIME ${frameTime} ms   ${mode}`, 0, 27);
    }
}

const drawCircle = (context: CanvasRenderingContext2D, x: number, y: number, radius: number, color: string) => {
    resetTransform(world);

    world.beginPath();
    world.arc(
        mathFloor(x),
        mathFloor(y),
        mathFloor(radius),
        0, mathPI2, false
    );
    world.lineWidth = 2;
    world.strokeStyle = color;
    world.stroke();
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