import { cellSize } from "./config";
import { boxesIntersects } from "./geom/box";
import { point, pointNormalize, vector } from "./geom/point";
import { Cube, cubes } from "./stage"
import { mathAbs } from "./utils/math";

export const bodies: Cube[] = []

export const getPhysicsObjects = () => {
    bodies.splice(0, bodies.length);

    for (const cube of cubes) {
        if (cube.info.body) {
            bodies.push(cube);
        }
    }
}

export const updatePhysics = () => {
    const bodiesLength = bodies.length;

    let iterations = 20;
    while (iterations--) {
        let collisions = 0;

        for (let i = 0; i < bodiesLength; i++) {
            const body0 = bodies[i];
            for (let j = i + 1; j < bodiesLength; j++) {
                const body1 = bodies[j];

                let hasCollision = false;

                if (body0.info.body!.static) {
                    if (body1.info.body!.static) {
                        // nothing
                    } else {
                        hasCollision = checkCollision(body0, body1, 0, 1);
                    }
                } else {
                    if (body1.info.body!.static) {
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

const checkCollision = (body0: Cube, body1: Cube, reaction0: number, reaction1: number): boolean => {
    // const hasCollision = body0.x <= body1.x + cellSize
    //     && body0.y <= body1.y + cellSize
    //     && body1.x <= body0.x + cellSize
    //     && body1.y <= body0.y + cellSize;

    const hasCollision = boxesIntersects(body0.info.body!.box, body0, body1.info.body!.box, body1);

    if (hasCollision) {
        const direction = vector(body0, body1);
        pointNormalize(direction, 1);

        if (mathAbs(direction.x) > mathAbs(direction.y)) {
            body0.x -= direction.x * reaction0;
            body1.x += direction.x * reaction1;
        } else {
            body0.y -= direction.y * reaction0;
            body1.y += direction.y * reaction1;
        }
    }

    return hasCollision;
}

