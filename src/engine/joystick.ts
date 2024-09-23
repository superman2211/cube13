import { joystickBaseRadius, joystickPower } from "../config";
import { Point, pointAngle, pointLength, pointNormalize, vector } from "../geom/point";
import { touches } from "./input";
import { gameScale } from "./screen";
import { hasTouch } from "../utils/browser";
import { mathFloor, mathPI, mathPI2 } from "../utils/math";

export interface Joystick {
    id: string,
    base: Point,
    stick: Point,
}

export let joystick: Joystick | undefined;
export let joystickStep = -1;

const toWorld = (p: Point): Point => ({ x: p.x / gameScale, y: p.y / gameScale });

export const updateJoystick = () => {
    if (hasTouch) {
        if (!joystick) {
            for (const id in touches) {
                joystick = {
                    id,
                    base: toWorld(touches[id]),
                    stick: toWorld(touches[id]),
                }
                break;
            }
        } else {
            if (touches[joystick.id]) {
                joystick.stick = toWorld(touches[joystick.id]);

                const direction = vector(joystick.base, joystick.stick);
                const distance = pointLength(direction);
                if (distance > joystickBaseRadius) {
                    pointNormalize(direction, joystickBaseRadius);
                    joystick.stick.x = joystick.base.x + direction.x;
                    joystick.stick.y = joystick.base.y + direction.y;
                }
            } else {
                joystick = undefined;
            }
        }

        joystickStep = -1;

        if (joystick) {
            const joystickDirection = vector(joystick.base, joystick.stick);
            const joystickPowerValue = pointLength(joystickDirection) / joystickBaseRadius;
            if (joystickPowerValue > joystickPower) {
                let angle = pointAngle(joystickDirection);
                if (angle < 0) angle += mathPI2;

                joystickStep = mathFloor((angle + mathPI / 8) / (mathPI / 4));
            }
        }
    }
}