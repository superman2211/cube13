import { playerAnimationSpeed, playerSpeed } from "./config";
import { Id } from "./cube";
import { game, GameState } from "./game";
import { point, pointAdd, pointLength, pointNormalize, vector } from "./geom/point";
import { isKeyPressed, Key, touches } from "./input";
import { joystick } from "./joystick";
import { man0, man1, man10, man11, man12, man13, man14, man15, man2, man3, man4, man5, man6, man7, man8, man9 } from "./resources/ids";
import { getCube } from "./stage";
import { time } from "./time";
import { hasTouch } from "./utils/browser";
import { mathFloor } from "./utils/math";

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


        const direction = point();

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
            direction.x = joystickDirection.x;
            direction.y = joystickDirection.y;
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
