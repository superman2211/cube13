import { cellSize } from "../config";
import { DEBUG } from "../debug";
import { updateBodies } from "../physics";
import { cubes } from "../stage";
import { infos } from "./infos";

export const buildLevel = (layers: string[][]) => {
    cubes.splice(0, cubes.length);

    let z = 0;

    for (const layer of layers) {
        let x = 0;
        let y = 0;

        for (const row of layer) {
            for (const s of row) {
                if (s !== ' ') {
                    let info = infos[s];

                    if (DEBUG) {
                        if (!info) {
                            throw 'info not found ' + s;
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