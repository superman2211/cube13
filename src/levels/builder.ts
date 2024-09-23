import { cellSize } from "../config";
import { CubeInfo, Id } from "../game/cube";
import { DEBUG } from "../debug";
import { cubes } from "../engine/stage";
import { cloneObject } from "../utils/browser";
import { infos } from "./infos";
import { level10 } from "./level10";
import { level11 } from "./level11";
import { level2 } from "./level2";
import { level3 } from "./level3";
import { level4 } from "./level4";
import { level5 } from "./level5";
import { level6 } from "./level6";
import { level7 } from "./level7";
import { level8 } from "./level8";
import { level9 } from "./level9";
import { level0 } from "./level0";
import { level1 } from "./level1";
import { level12 } from "./level12";

export const levels = [
    level0,
    level1,
    level2,
    level3,
    level4,
    level5,
    level6,
    level7,
    level8,
    level9,
    level10,
    level11,
    level12,
]

export const buildLevel = (levelIndex: number) => {
    const layers = levels[levelIndex];

    if (DEBUG) {
        if (layers) {
            console.log(`build level ${levelIndex}`);
        } else {
            throw `level not found ${levelIndex}`;
        }
    }

    cubes.splice(0, cubes.length);

    let z = 0;

    for (const layer of layers) {
        let x = 0;
        let y = 0;

        for (const row of layer) {
            for (const symbol of row) {
                if (symbol !== ' ') {
                    let source_info = infos[symbol];

                    if (DEBUG) {
                        if (!source_info) {
                            throw 'info not found ' + symbol;
                        }
                    }

                    const info: CubeInfo = cloneObject(source_info);

                    cubes.push({ x, y, z, info });
                }

                x += cellSize;
            }

            x = 0;
            y += cellSize;
        }

        z += cellSize;
    }
}

// test levels

if (DEBUG) {
    const testLevel = (layers: string[][], index: number) => {
        const requiredCubes = [
            Id.Player,
            Id.Door,
            Id.DoorExit,
        ];

        for (const layer of layers) {
            for (const row of layer) {
                for (const symbol of row) {
                    if (symbol !== ' ') {
                        let info = infos[symbol];
                        if (DEBUG) {
                            if (!info) {
                                throw `level ${index}: info not found:  ${symbol}`;
                            }
                        }

                        if (info.id !== undefined) {
                            let cubeIndex = requiredCubes.indexOf(info.id);
                            if (cubeIndex !== -1) {
                                requiredCubes.splice(cubeIndex, 1);
                            }
                        }
                    }
                }
            }
        }

        for (const id of requiredCubes) {
            throw `level ${index}:  required cube not found ${id}`;
        }
    }

    for (let i = 0; i < levels.length; i++) {
        testLevel(levels[i], i + 1);
    }

    console.log('levels tested');
}

