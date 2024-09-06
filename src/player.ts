import { playerAnimationSpeed, playerSpeed } from "./config";
import { Id } from "./cube";
import { point, pointAdd, pointNormalize } from "./geom/point";
import { isKeyPressed, Key } from "./input";
import { man0, man1, man10, man11, man12, man13, man14, man15, man2, man3, man4, man5, man6, man7, man8, man9 } from "./resources/ids";
import { getCube } from "./stage";
import { time } from "./time";
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
        let animation = undefined;

        const direction = point();

        if (isKeyPressed(Key.Left)) {
            animation = animationLeft;
            direction.x = -1;
        } else if (isKeyPressed(Key.Right)) {
            animation = animationRight;
            direction.x = 1;
        }

        if (isKeyPressed(Key.Up)) {
            animation = animationUp;
            direction.y = -1;
        } else if (isKeyPressed(Key.Down)) {
            animation = animationDown;
            direction.y = 1;
        }

        if (animation) {
            player.frame += delta * playerAnimationSpeed;
            let frame = mathFloor((player.frame) % animation.length);
            cube.info.front!.id = animation[frame];

            pointNormalize(direction, delta * playerSpeed);
            pointAdd(cube, direction);
        }
    }
}
