import { animate, quadraticIn, quadraticOut } from "../engine/animation"
import { cellSize } from "../config"
import { Cube, isFloorCube } from "./cube";
import { cubes } from "../engine/stage"
import { randomRange } from "../utils/math";
import { timeout } from "../utils/browser";
import { updateBodies } from "../engine/physics";

export const fallCubes = async () => {
    for (const cube of cubes) {
        if (isFloorCube(cube)) {
            fallCubeTimeout(cube, randomRange(0, 1));
        }
    }
}

export const fallCubeTimeout = async (cube: Cube, offset: number) => {
    await timeout(offset * 1000);
    fallCube(cube);
}

export const fallCube = (cube: Cube) => {
    delete cube.info.body;
    updateBodies();
    animate(cube, 'z', cube.z - cellSize * 6, 0.0, 0.5, quadraticIn);
}