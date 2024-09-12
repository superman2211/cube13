import { cellSize, cellSizeHalf } from "../config";
import { bodies } from "../engine/physics";
import { cubes, getCubes, removeCube } from "../engine/stage"
import { time } from "../engine/time";
import { Box, boxesIntersects } from "../geom/box";
import { Point, pointAdd } from "../geom/point";
import { laser2, laser3, laser4, laser5 } from "../resources/ids";
import { cloneObject } from "../utils/browser";
import { randomSelect } from "../utils/math";
import { Cube, CubeInfo, Id } from "./cube"

const lines: Cube[][] = [];

const laserLineInfo: CubeInfo = { front: { id: laser2 }, id: Id.LaserLine };

const linesImages = [laser2, laser3, laser4, laser5];

export const laserBox: Box = { minX: 0, minY: cellSizeHalf - 1, maxX: cellSize, maxY: cellSizeHalf + 1 };

let timeS = 0;

export function removeLasers() {
    for (let i = 0; i < cubes.length; i++) {
        const cube = cubes[i];
        if (cube.info.id === Id.LaserLine ||
            cube.info.id === Id.LaserRight ||
            cube.info.id === Id.LaserLeft
        ) {
            cubes.splice(i, 1);
            i--;
        }
    }

    lines.splice(0, lines.length);
}


export const updateLasers = () => {
    updateLaser(Id.LaserLeft, -1);
    updateLaser(Id.LaserRight, 1);

    timeS -= time.deltaS;
    if (timeS < 0) {
        timeS = 0.1;

        for (const laserLines of lines) {
            for (const laserLine of laserLines) {
                laserLine.info.front!.id = randomSelect(linesImages);
            }
        }
    }
}

const updateLaser = (id: Id, direction: number) => {
    const laserBases = getCubes(id);

    for (const laserBase of laserBases) {
        if (laserBase) {
            if (laserBase.info.laserId === undefined) {
                laserBase.info.laserId = lines.length;
                lines.push([]);
            }

            const laserLines = lines[laserBase.info.laserId];

            while (laserLines.length < 13) {
                const lineCube: Cube = {
                    x: laserBase.x,
                    y: laserBase.y - 1,
                    z: laserBase.z - 1,
                    info: cloneObject(laserLineInfo)
                };
                laserLines.push(lineCube);
            }

            const first = laserLines[0];
            first.x = direction < 0 ? laserBase.x : laserBase.x;
            rayCast(first, direction);

            let x = first.x;

            for (const laserLine of laserLines) {
                laserLine.x = x;

                const visible = direction < 0 ? x < laserBase.x + cellSize : x > laserBase.x - cellSize;

                x -= cellSize * direction;

                if (visible) {
                    if (!cubes.includes(laserLine)) {
                        cubes.push(laserLine);
                    }
                } else {
                    if (cubes.includes(laserLine)) {
                        removeCube(laserLine);
                    }
                }
            }
        }
    }
}

const rayCast = (laserLine: Cube, direction: number) => {
    let i = 13 * cellSize;
    while (i--) {
        laserLine.x += direction;
        if (hasIntersection(laserLine)) {
            break;
        }
    }
}

const hasIntersection = (laserLine: Cube): boolean => {
    for (const cube of bodies) {
        if (cube.info.body) {
            if (boxesIntersects(laserBox, laserLine, cube.info.body.box, cube)) {
                return true;
            }
        }
    }
    return false;
} 