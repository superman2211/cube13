import { Cube, isFloorCube, isObjectCube } from "../game/cube";
import { box, Box, boxesIntersects } from "../geom/box";
import { pointNormalize, vector } from "../geom/point";
import { cubes, removeCube } from "./stage"
import { mathAbs, mathFloor, randomRange } from "../utils/math";
import { cellSize } from "../config";
import { animate, quadraticIn } from "./animation";
import { timeout } from "../utils/browser";
import { DEBUG } from "../debug";
import { defaultBox } from "../levels/infos";

const bodies: Cube[] = [];
const floor: Cube[] = [];
const objects: Cube[] = [];

let dirty = false;

export interface Body {
    isStatic?: boolean,
    box: Box,
}

export const updateBodies = () => {
    dirty = true;
}

const updateBodiesArrays = () => {
    if (!dirty) {
        return;
    }
    dirty = false;

    bodies.splice(0, bodies.length);
    floor.splice(0, floor.length);
    objects.splice(0, objects.length);

    for (const cube of cubes) {
        const body = cube.info.body;
        if (body) {
            bodies.push(cube);
        }

        if (isObjectCube(cube)) {
            objects.push(cube);
        }

        if (isFloorCube(cube)) {
            floor.push(cube);
        }
    }

    if (DEBUG) {
        console.log('cubes', cubes.length, 'bodies', bodies.length, 'objects', objects.length, 'floor', floor.length);
    }
}

export const updatePhysics = () => {
    updateBodiesArrays();
    update2dCollisions();
    updateZCollisions();
}

const checkCollision = (body0: Cube, body1: Cube, reaction0: number, reaction1: number): boolean => {
    const hasCollision = boxesIntersects(body0.info.body!.box, body0, body1.info.body!.box, body1);

    if (hasCollision) {
        const direction = vector(body0, body1);
        pointNormalize(direction, 1);

        if (mathAbs(direction.x) > mathAbs(direction.y)) {
            body0.x -= direction.x * reaction0;
            body1.x += direction.x * reaction1;

            body0.y = mathFloor(body0.y);
            body1.y = mathFloor(body1.y);
        } else {
            body0.y -= direction.y * reaction0;
            body1.y += direction.y * reaction1;

            body0.x = mathFloor(body0.x);
            body1.x = mathFloor(body1.x);
        }
    }

    return hasCollision;
}

function updateZCollisions() {
    for (const objectCube of objects) {
        if (objectCube.z == cellSize) {
            const box = objectCube.info.body ? objectCube.info.body.box : defaultBox;

            let hasCollision = false;

            for (const floorCube of floor) {
                if (boxesIntersects(box, objectCube, defaultBox, floorCube)) {
                    hasCollision = true;
                    break;
                }
            }

            if (!hasCollision) {
                fallCube(objectCube);
            }
        }
    }
}
function update2dCollisions() {
    const bodiesLength = bodies.length;

    let iterations = 20;
    while (iterations--) {
        let collisions = 0;

        for (let i = 0; i < bodiesLength; i++) {
            const body0 = bodies[i];
            for (let j = i + 1; j < bodiesLength; j++) {
                const body1 = bodies[j];

                let hasCollision = false;

                if (body0.info.body!.isStatic) {
                    if (body1.info.body!.isStatic) {
                        // nothing
                    } else {
                        hasCollision = checkCollision(body0, body1, 0, 1);
                    }
                } else {
                    if (body1.info.body!.isStatic) {
                        hasCollision = checkCollision(body0, body1, 1, 0);
                    } else {
                        hasCollision = checkCollision(body0, body1, 0.5, 0.5);
                    }
                }

                if (hasCollision) {
                    collisions++;
                }
            }
        }

        if (!collisions) {
            break;
        }
    }
}

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
    cube.z -= 1;
    delete cube.info.body;
    updateBodies();
    animate(cube, 'z', cube.z - cellSize * 6, 0.0, 0.5, quadraticIn, () => removeCube(cube));
}