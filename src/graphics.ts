import { border, cells, cellSize } from "./config";
import { Cube } from "./cube";
import { DEBUG } from "./debug";
import { identity } from "./geom/transform";
import { images } from "./resources/images";
import { cubes } from "./stage";
import { time } from "./time";
import { Image } from "./image";
import { createContext, domDocument, dpr, getCanvas, getContext, getHeight, getWidth, now, setHeight, setWidth } from "./utils/browser";
import { mathFloor, mathMin, mathRound } from "./utils/math";

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

    world.clearRect(0, 0, worldWidth, worldHeight);

    const offsetX = 0;
    const offsetY = cellSize * 4;

    cubes.sort(sortCubes);

    for (let cube of cubes) {
        const x = mathFloor(cube.x + offsetX);
        const y = mathFloor(cube.y + offsetY - cube.z);
        const info = cube.info;
        const height = info.cubeHeight || cellSize;
        drawImage(world, x, y, info.front);
        drawImage(world, x, y - height, info.top);
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

    screen.clearRect(0, 0, screenWidth, screenHeight);
    screen.setTransform(scale, 0, 0, scale, 0, 0);
    screen.shadowBlur = 0;
    screen.imageSmoothingEnabled = false;
    screen.drawImage(worldCanvas, 0, 0);

    if (DEBUG) {
        const frameTime = (now() - time.nowMS).toFixed();
        const fps = (1 / time.deltaS).toFixed();

        screen.shadowBlur = 10;
        screen.shadowColor = 'black';
        screen.fillStyle = 'white';
        screen.font = 'arial 20px';
        screen.fillText('FPS ' + fps + ' TIME ' + frameTime + ' ms', 0, 20);
    }
}


const drawImage = (context: CanvasRenderingContext2D, x: number, y: number, image?: Image) => {
    if (image) {
        const canvas = images[image.id];
        const transform = image.transformation || identity;
        context.setTransform(
            transform.a, transform.b, transform.c, transform.d,
            transform.e + x, transform.f + y
        );
        context.drawImage(canvas, 0, 0);
    }
}