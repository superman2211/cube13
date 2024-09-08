import { border, cells, cellSize } from "./config";
import { Cube } from "./cube";
import { DEBUG, FPS } from "./debug";
import { identity } from "./geom/transform";
import { getColoredImage, getImage, images } from "./resources/images";
import { cubes } from "./stage";
import { time } from "./time";
import { Image } from "./image";
import { createContext, domDocument, dpr, drawImage, getCanvas, getContext, getHeight, getWidth, now, resetTransform, setHeight, setWidth } from "./utils/browser";
import { limit, mathFloor, mathMin, mathRound } from "./utils/math";
import { isKeyPressed, Key } from "./input";
import { getIdByCharCode } from "./font";

const createWorld = (): CanvasRenderingContext2D => {
    const world = createContext();
    setWidth(world, cellSize * (cells + border * 2));
    setHeight(world, cellSize * (cells + border * 5));
    return world;
}

const sortCubes = (c0: Cube, c1: Cube): number => c0.y + c0.z - c1.y - c1.z;

export const world: CanvasRenderingContext2D = createWorld();
export const screen: CanvasRenderingContext2D = getContext(domDocument.getElementById('c') as HTMLCanvasElement);

export const render = () => {
    const worldWidth = getWidth(world);
    const worldHeight = getHeight(world);
    const worldCanvas = getCanvas(world);

    resetTransform(world);
    world.fillRect(0, 0, worldWidth, worldHeight);

    const offsetX = 0;
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
    const text = 'NUMEBS 01234567890';
    for (let i = 0; i < text.length; i++) {
        const code = text.charCodeAt(i);
        const id = getIdByCharCode(code);
        if (id !== undefined) {
            const char = getColoredImage(id, 0xffffff);
            drawImage(world, char, 1 + 8 * i, 1);
        }
    }
    const font = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (let i = 0; i < font.length; i++) {
        const code = font.charCodeAt(i);
        const id = getIdByCharCode(code);
        if (id !== undefined) {
            const char = getColoredImage(id, 0xff9999);
            drawImage(world, char, 1 + 8 * i, 1 + 8);
        }
    }

    const windowWidth = innerWidth * dpr;
    const windowHeight = innerHeight * dpr;

    if (getWidth(screen) != windowWidth) {
        setWidth(screen, windowWidth);
    }

    if (getHeight(screen) != windowHeight) {
        setHeight(screen, windowHeight);
    }

    const screenWidth = getWidth(screen);
    const screenHeight = getHeight(screen);

    const scale = mathMin(screenWidth / worldWidth, screenHeight / worldHeight);

    resetTransform(screen);
    screen.clearRect(0, 0, screenWidth, screenHeight);
    screen.setTransform(scale, 0, 0, scale, 0, 0);
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