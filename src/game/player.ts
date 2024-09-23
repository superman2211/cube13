import { cellSize, playerAnimationSpeed, playerDeadTime, playerSpeed } from "../config";
import { Cube, Id } from "./cube";
import { point, pointAdd, pointLength, pointNormalize } from "../geom/point";
import { isKeyPressed, Key } from "../engine/input";
import { joystickStep } from "../engine/joystick";
import { man0, man1, man10, man11, man12, man13, man14, man15, man16, man17, man18, man19, man2, man20, man21, man3, man4, man5, man6, man7, man8, man9, sound_laser } from "../resources/ids";
import { getCube, getCubes } from "../engine/stage";
import { time } from "../engine/time";
import { mathFloor } from "../utils/math";
import { boxesIntersects } from "../geom/box";
import { laserBox } from "./laser";
import { playSound } from "../resources/sounds";

const animationDown = [man0, man1, man2, man3];
const animationRight = [man4, man5, man6, man7];
const animationUp = [man8, man9, man10, man11];
const animationLeft = [man12, man13, man14, man15];
const animationLaserDie = [man16, man17];
const animationFallDown = [man18, man19];
const animationFallUp = [man20, man21];

export interface Player {
    frame: number,
    deadTime: number,
}

export const player: Player = {
    frame: 0,
    deadTime: 0,
}

export const resetPlayer = () => {
    player.frame = 0;
    player.deadTime = 0;
}

export const updatePlayer = () => {
    const delta = time.deltaS;

    const cube = getCube(Id.Player);

    if (cube) {
        if (player.deadTime > 0) {
            updatePlayerAnimation(cube, animationLaserDie);
        } else if (cube.z < cellSize) {
            const isUp = animationUp.includes(cube.info.front!.id) || animationFallUp.includes(cube.info.front!.id);
            const animation = isUp ? animationFallUp : animationFallDown;
            updatePlayerAnimation(cube, animation);
        } else {
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

            if (joystickStep != -1) {
                if (joystickStep == 0) {
                    direction = point(1, 0);
                } else if (joystickStep == 1) {
                    direction = point(1, 1);
                } else if (joystickStep == 2) {
                    direction = point(0, 1);
                } else if (joystickStep == 3) {
                    direction = point(-1, 1);
                } else if (joystickStep == 4) {
                    direction = point(-1, 0);
                } else if (joystickStep == 5) {
                    direction = point(-1, -1);
                } else if (joystickStep == 6) {
                    direction = point(0, -1);
                } else if (joystickStep == 7) {
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

                updatePlayerAnimation(cube, animation);
                pointNormalize(direction, delta * playerSpeed);
                pointAdd(cube, direction);
            }
        }
    }
}

export const updatePlayerDeadTime = () => {
    const cube = getCube(Id.Player);

    if (player.deadTime == 0) {
        if (cube) {
            if (cube.info.body) {
                const laserLines = getCubes(Id.LaserLine);
                for (const laserLine of laserLines) {
                    if (boxesIntersects(laserBox, laserLine, cube.info.body.box, cube)) {
                        if (player.deadTime == 0) {
                            playSound(sound_laser);
                        }
                        player.deadTime += 0.001;
                    }
                }
            }
        } else {
            player.deadTime = playerDeadTime;
        }
    } else {
        player.deadTime += time.deltaS;
    }
}
function updatePlayerAnimation(cube: Cube, animation: number[]) {
    player.frame += time.deltaS * playerAnimationSpeed;
    let frame = mathFloor((player.frame) % animation.length);
    cube.info.front!.id = animation[frame];
}

