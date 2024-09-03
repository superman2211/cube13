import { Point, point, pointAdd, pointNormalize } from "./geom/point";
import { isKeyPressed, KEY_DOWN, KEY_LEFT, KEY_RIGHT, KEY_UP } from "./input";
import { man0, man1, man10, man11, man12, man13, man14, man15, man2, man3, man4, man5, man6, man7, man8, man9 } from "./resources/ids";
import { cubes } from "./stage";
import { mathFloor } from "./utils/math";

const animationDown = [man0, man1, man2, man3];
const animationRight = [man4, man5, man6, man7];
const animationUp = [man8, man9, man10, man11];
const animationLeft = [man12, man13, man14, man15];

export interface Player {
    frame: number,
    position: Point,
}

export const player: Player = {
    frame: 0,
    position: point(),
}

export function initPlayer() {
    let cube = cubes.find((c) => c.id === 0);

    if (cube) {
        player.position.x = cube.x;
        player.position.y = cube.y;
    }
}

export function updatePlayer(time: number) {
    let cube = cubes.find((c) => c.id === 0);

    if (cube) {
        let animation = undefined;

        const direction = point();

        if (isKeyPressed(KEY_LEFT)) {
            animation = animationLeft;
            direction.x = -1;
        } else if (isKeyPressed(KEY_RIGHT)) {
            animation = animationRight;
            direction.x = 1;
        }

        if (isKeyPressed(KEY_UP)) {
            animation = animationUp;
            direction.y = -1;
        } else if (isKeyPressed(KEY_DOWN)) {
            animation = animationDown;
            direction.y = 1;
        }

        if (animation) {
            player.frame += time * 10.0;
            let frame = mathFloor((player.frame) % animation.length);
            cube.info.front!.id = animation[frame];

            pointNormalize(direction, time * 30.0);
            pointAdd(player.position, direction);

            cube.x = mathFloor(player.position.x);
            cube.y = mathFloor(player.position.y);
        }
    }
}
