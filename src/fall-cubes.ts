import { animate, quadraticIn, quadraticOut } from "./animation"
import { cells, cellSize } from "./config"
import { DEBUG } from "./debug";
import { sound_explosion } from "./resources/ids";
import { playSound } from "./resources/sounds";
import { cubes } from "./stage"
import { mathFloor, randomRange } from "./utils/math";

export const fallCubes = () => {

    const offsets = [];

    for (let x = 1; x < 14; x++) {
        for (let y = 1; y < 14; y++) {
            offsets[y * cells + x] = randomRange(0, 1);
        }
    }

    const duration = 0.5;

    for (const cube of cubes) {
        if (cube.x > 0 &&
            cube.x < cellSize * 14 &&
            cube.y > 0 &&
            cube.y < cellSize * 14
        ) {
            const x = mathFloor(cube.x / cellSize);
            const y = mathFloor(cube.y / cellSize);

            const offset = offsets[y * cells + x] || 0;

            animate(cube, 'z', -cellSize * 5, offset, 0.5, quadraticIn);
        }
    }

    playSound(sound_explosion, 1.0);
}