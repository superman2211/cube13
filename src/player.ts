import { playerAnimationSpeed, playerSpeed } from "./config";
import { Id } from "./cube";
import { point, pointAdd, pointAngle, pointLength, pointNormalize, vector } from "./geom/point";
import { isKeyPressed, Key, touches } from "./input";
import { joystick } from "./joystick";
import { man0, man1, man10, man11, man12, man13, man14, man15, man2, man3, man4, man5, man6, man7, man8, man9 } from "./resources/ids";
import { getCube } from "./stage";
import { time } from "./time";
import { mathFloor, mathPI, mathPI2 } from "./utils/math";

const animationDown = [man0, man1, man2, man3];
const animationRight = [man4, man5, man6, man7];
const animationUp = [man8, man9, man10, man11];
const animationLeft = [man12, man13, man14, man15];

export interface Player {
    frame: number,
}

export const player: Player = {
    frame: 0,
}

export const updatePlayer = () => {
    const delta = time.deltaS;

    const cube = getCube(Id.Player);

    if (cube) {
        let direction = point();

        if (isKeyPressed(Key.Left) || isKeyPressed(Key.A)) {
            direction.x = -1;
        } else if (isKeyPressed(Key.Right) || isKeyPressed(Key.D)) {
            direction.x = 1;
        }

        if (isKeyPressed(Key.Up) || isKeyPressed(Key.W)) {
            direction.y = -1;
        } else if (isKeyPressed(Key.Down) || isKeyPressed(Key.S)) {
            direction.y = 1;
        }

        if (joystick) {
            const joystickDirection = vector(joystick.base, joystick.stick);
            let angle = pointAngle(joystickDirection);
            if (angle < 0) angle += mathPI2;
            const step = mathFloor((angle + mathPI / 8) / (mathPI / 4));
            
            if (step == 0) {
                direction = point(1, 0);
            } else if (step == 1) {
                direction = point(1, 1);
            } else if (step == 2) {
                direction = point(0, 1);
            } else if (step == 3) {
                direction = point(-1, 1);
            } else if (step == 4) {
                direction = point(-1, 0);
            } else if (step == 5) {
                direction = point(-1, -1);
            } else if (step == 6) {
                direction = point(0, -1);
            } else if (step == 7) {
                direction = point(1, -1);
            } else {
                direction = point(1, 0);
            }
        }

        if (pointLength(direction) > 0) {
            let animation = animationDown;

            if (direction.x < 0) {
                animation = animationLeft;
            } else if (direction.x > 0) {
                animation = animationRight;
            }

            if (direction.y < 0) {
                animation = animationUp;
            } else if (direction.y > 0) {
                animation = animationDown;
            }

            player.frame += delta * playerAnimationSpeed;
            let frame = mathFloor((player.frame) % animation.length);
            cube.info.front!.id = animation[frame];

            pointNormalize(direction, delta * playerSpeed);
            pointAdd(cube, direction);
        }
    }
}
