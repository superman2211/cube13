import { cells, cellSize, joystickBaseRadius, joystickStickRadius } from "../config";
import { Cube } from "../game/cube";
import { DEBUG, FPS } from "../debug";
import { identity } from "../geom/transform";
import { getColoredImage, getImage, images } from "../resources/images";
import { cubes } from "./stage";
import { time } from "./time";
import { Image } from "../resources/image";
import { clear, createContext, domDocument, dpr, drawImage, getCanvas, getContext, getHeight, getWidth, hasTouch, now, resetTransform, setHeight, setWidth } from "../utils/browser";
import { limit, mathFloor, mathMax, mathMin, mathPI2, mathRound } from "../utils/math";
import { getIdByCharCode } from "../resources/font";
import { game, GameState } from "../game/game";
import { joystick } from "./joystick";
import { gameScale, windowHeight, windowWidth, stageWidth, screen } from "./screen";
import { icon0, icon1, icon2, man0, man17, man22 } from "../resources/ids";
import { levels } from "../levels/builder";
import { colorToString } from "../utils/color";
import { point, Point } from "../geom/point";
import { shackingOffset } from "./shaking";
import { tasksCount } from "./tasks";

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

    switch (game.state) {
        case GameState.MainMenu:
            drawWindow(0xff000000, ['CUBE 13', man0, '', scoreTimeText(), '', continueText('START')]);
            break;

        case GameState.Intro:
            drawWindow(0xff333333, ['13 LEVELS %', '13 LIVES @', '130 SECONDS #', '', '', continueText('START')]);
            break;

        case GameState.LevelFail:
            drawWindow(0xdd660000, ['YOU ARE DEAD!', man17, '', `LIVES @ ${game.lives}`, '', '', continueText('TRY AGAIN')]);
            break;

        case GameState.LevelWin:
            drawWindow(0xdd006600, ['LEVEL PASSED!', man22, '', `NEXT LEVEL % ${game.level + 2}`, `TOTAL LEVELS % ${levels.length}`, '', '', continueText('CONTINUE')]);
            break;

        case GameState.GameOver:
            drawWindow(0xdd330000, ['GAME OVER!', man17, '', '', continueText('GO HOME')]);
            break;

        case GameState.GameWin:
            drawWindow(0xdd009900, ['YOU WIN!!!', man22, '', 'CONGRATULATIONS!', 'YOU ARE THE BEST!', scoreTimeText(), '', '', continueText('GO HOME')]);
            break;
    }

    drawFPS(worldHeight);

    clear(screen);
    screen.setTransform(gameScale, 0, 0, gameScale, 0, 0);
    screen.imageSmoothingEnabled = false;
    drawImage(screen, getCanvas(world), 0, 0);
}

const scoreTimeText = () => game.scoreTime > 0 ? `YOUR TIME # ${game.scoreTime.toFixed(1)} SECONDS` : '';
const continueText = (action: string) => hasTouch ? `TAP TO CONTINUE ${action}` : `PRESS ANY KEY TO ${action}`;

function drawCubes(offsetX: number, offsetY: number) {
    const worldX = shackingOffset.x + offsetX;
    const worldY = shackingOffset.y + offsetY;

    cubes.sort(sortCubes);

    updateCubesShading();

    for (let cube of cubes) {
        const x = mathFloor(worldX + cube.x);
        const y = mathFloor(worldY + cube.y - cube.z);
        const info = cube.info;
        const height = info.cubeHeight || cellSize;
        drawCubeImage(world, x, y, info.front);
        drawCubeImage(world, x, y - height, info.top);
    }
}

function drawJoystick() {
    if (joystick) {
        drawCircle(world, joystick.base.x / gameScale, joystick.base.y / gameScale, joystickBaseRadius, 0x55ffffff);
        drawCircle(world, joystick.stick.x / gameScale, joystick.stick.y / gameScale, joystickStickRadius, 0x99ffffff);
    }
}

const drawIndicators = (offsetX: number, worldHeight: number) => {
    resetTransform(world);
    for (let i = 0; i < game.lives; i++) {
        drawImage(world, images[icon0], offsetX + 1 + i * 8, 10);
    }
    drawText(world, offsetX, 1, 'LIVES ' + game.lives, 0xFF2600);

    const times = mathRound(game.timeS);
    const timesToDraw = mathMin(mathRound(game.timeS), 13);
    for (let i = 0; i < timesToDraw; i++) {
        drawImage(world, images[icon1], offsetX + cellSize * 14 + 8 - i * 8, 10);
    }
    const timesText = mathMax(0, times) + ' TIME';
    drawText(world, offsetX + 15 * cellSize - 1 - timesText.length * 8, 1, timesText, 0x0096FF);

    const levelsText = 'LEVEL ' + (game.level + 1);
    drawText(world, mathFloor(offsetX + (cellSize * 15 - levelsText.length * 8) / 2), 1, levelsText, 0xffffff);
}

const drawFPS = (worldHeight: number) => {
    if (FPS) {
        const frameTime = (now() - time.nowMS).toFixed();
        const fps = (1 / time.deltaS).toFixed();
        const mode = DEBUG ? 'DEBUG' : '';

        drawText(
            world,
            1,
            worldHeight - 9,
            `FPS ${fps} TIME ${frameTime} TASK ${tasksCount()} ${mode}`,
            0xffffff
        );
    }
}

const textSymbols: { [key: string]: number } = { 35: icon1, 64: icon0, 37: icon2 };

const drawText = (context: CanvasRenderingContext2D, x: number, y: number, text: string, color: number) => {
    resetTransform(context);
    for (let i = 0; i < text.length; i++) {
        const code = text.charCodeAt(i);
        if (textSymbols[code] !== undefined) {
            const symbol = images[textSymbols[code]];
            drawImage(context, symbol, x + i * 8, y);
        } else {
            const id = getIdByCharCode(code);
            if (id !== undefined) {
                const char = getColoredImage(id, color);
                drawImage(context, char, x + i * 8, y);
            }
        }
    }
}

const drawCircle = (context: CanvasRenderingContext2D, x: number, y: number, radius: number, color: number) => {
    resetTransform(context);

    context.beginPath();
    context.arc(
        mathFloor(x),
        mathFloor(y),
        mathFloor(radius),
        0, mathPI2, false
    );
    context.lineWidth = 2;
    context.strokeStyle = colorToString(color);
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

        if (image.alpha !== undefined) {
            context.globalAlpha = image.alpha;
        }

        drawImage(context, canvas, 0, 0);

        context.globalAlpha = 1;
    }
}

const updateCubesShading = () => {
    const start = -cellSize * 2;
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

function drawWindow(color: number, content: (string | number)[]) {
    const width = getWidth(world);
    const height = getHeight(world);
    const x = 0;
    const y = 0;

    resetTransform(world);

    world.fillStyle = colorToString(color);
    world.fillRect(x, y, width, height);

    const border = cellSize;

    let textsHeight = border * content.length;//(content.length * 3 - 2) * 8;
    let textsWidth = 0; //content.reduce((p, c) => mathMax(p, c.length), 0) * 8;

    for (let i = 0; i < content.length; i++) {
        const c = content[i];
        switch (typeof c) {
            case 'string':
                const text = c;
                textsHeight += 8;
                textsWidth = mathMax(textsWidth, text.length * 8);
                break;

            case 'number':
                const image = images[c];
                textsHeight += image.height;
                textsWidth = mathMax(textsWidth, image.width);
                break;
        }
    }

    const contentX = x + (width - textsWidth) / 2;
    let contentY = y + (height - textsHeight) / 2;

    for (let i = 0; i < content.length; i++) {
        const c = content[i];
        switch (typeof c) {
            case 'string':
                const text = c;
                drawText(
                    world,
                    mathFloor(contentX + (textsWidth - text.length * 8) / 2),
                    mathFloor(contentY),
                    text,
                    0xffffff
                );
                contentY += 8 + border;
                break;

            case 'number':
                const image = images[c];
                drawImage(
                    world,
                    image,
                    mathFloor(contentX + (textsWidth - image.width) / 2),
                    mathFloor(contentY)
                );
                contentY += image.height + border;
                break;
        }
    }
}
