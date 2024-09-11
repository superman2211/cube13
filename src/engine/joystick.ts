import { joystickBaseRadius } from "../config";
import { Point, pointLength, pointNormalize, vector } from "../geom/point";
import { touches } from "./input";
import { gameScale } from "./screen";
import { hasTouch } from "../utils/browser";

export interface Joystick {
    id: string,
    base: Point,
    stick: Point,
}

export let joystick: Joystick | undefined;

export const updateJoystick = () => {
    if (hasTouch) {
        if (!joystick) {
            for (const id in touches) {
                joystick = {
                    id,
                    base: touches[id],
                    stick: touches[id],
                }
                break;
            }
        } else {
            if (touches[joystick.id]) {
                joystick.stick = touches[joystick.id];

                const direction = vector(joystick.base, joystick.stick);
                const distance = pointLength(direction);
                const radius = joystickBaseRadius * gameScale;

                if (distance > radius) {
                    pointNormalize(direction, radius);
                    joystick.stick.x = joystick.base.x + direction.x;
                    joystick.stick.y = joystick.base.y + direction.y;
                }
            } else {
                joystick = undefined;
            }
        }
    }
}