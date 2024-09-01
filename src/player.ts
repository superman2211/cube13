import { Data } from "./data";
import { Point, point, pointAdd, pointNormalize } from "./geom/point";
import { isKeyPressed, KEY_DOWN, KEY_LEFT, KEY_RIGHT, KEY_UP } from "./input";
import { man0, man1, man10, man11, man12, man13, man14, man15, man2, man3, man4, man5, man6, man7, man8, man9 } from "./resources/ids";

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

export function initPlayer(data: Data) {
    let cube = data.stage.cubes.find((c) => c.id === 0);

    if (cube) {
        player.position.x = cube.x;
        player.position.y = cube.y;
    }
}

export function updatePlayer(data: Data, time: number) {
    let cube = data.stage.cubes.find((c) => c.id === 0);

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
            let frame = Math.floor((player.frame) % animation.length);
            cube.t.f = animation[frame];

            pointNormalize(direction, time * 30.0);
            pointAdd(player.position, direction);

            cube.x = Math.floor(player.position.x);
            cube.y = Math.floor(player.position.y);
        }
    }
}
