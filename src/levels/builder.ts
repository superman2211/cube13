import { cellSize } from "../config";
import { DEBUG } from "../debug";
import { updateBodies } from "../physics";
import { cubes } from "../stage";
import { infos } from "./infos";
import { level1 } from "./level1";
import { level2 } from "./level2";

export const levels = [
    level1,
    level2,
]

export const buildLevel = (layers: string[][]) => {
    cubes.splice(0, cubes.length);

    let z = 0;

    for (const layer of layers) {
        let x = 0;
        let y = 0;

        for (const row of layer) {
            for (const symbol of row) {
                if (symbol !== ' ') {
                    let info = infos[symbol];

                    if (DEBUG) {
                        if (!info) {
                            throw 'info not found ' + symbol;
                        }
                    }

                    cubes.push({ x, y, z, info });
                }

                x += cellSize;
            }

            x = 0;
            y += cellSize;
        }

        z += cellSize;
    }

    updateBodies();
}

// test levels

if (DEBUG) {
    const testLevel = (layers: string[][], index: number) => {
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
                    }
                }
            }
        }
    }

    for (let i = 0; i < levels.length; i++) {
        testLevel(levels[i], i + 1);
    }

    console.log('levels tested');
}

