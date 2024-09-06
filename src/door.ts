import { doorAnimationSpeed } from "./config";
import { Id } from "./cube";
import { updateBodies } from "./physics";
import { door0, door1, door2, door3, wall10 } from "./resources/ids";
import { getCube } from "./stage";
import { time } from "./time";
import { mathFloor, mathMax, mathMin } from "./utils/math";

export interface Door {
    open: boolean,
    frame: number,
}

export const door: Door = { open: false, frame: 0 };

const doorOpenAnimation = [door0, door1, door2, door3];

export const updateDoor = () => {
    if (door.open && door.frame < doorOpenAnimation.length) {
        door.frame += time.deltaS * doorAnimationSpeed;

        const frame = mathFloor(door.frame);

        const cube = getCube(Id.Door);
        if (cube) {
            if (frame < doorOpenAnimation.length) {
                cube.info.front!.id = doorOpenAnimation[frame];
            } else {
                cube.info.front = undefined;

                cube.info.body = undefined;
                updateBodies();

                const exit = getCube(Id.DoorExit);
                if (exit) {
                    exit.info.front!.id = wall10;
                }
            }
        }
    }
}

export const resetDoor = () => {
    door.open = false;
    door.frame = 0;
}