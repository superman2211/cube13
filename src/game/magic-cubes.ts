import { animate, bounceIn, bounceOut, linear } from "../engine/animation";
import { cellSizeHalf } from "../config";
import { Cube, Id } from "./cube";
import { door } from "./door";
import { pointCopy, pointDistance } from "../geom/point";
import { updateBodies } from "../engine/physics";
import { floor4, floor7, floor9, sound_cube_place } from "../resources/ids";
import { playSound } from "../resources/sounds";
import { getCube, removeCube } from "../engine/stage";
import { DEBUG } from "../debug";

export const checkMagicCubePlace = () => {
    if (door.open) {
        return;
    }

    const magicCubes: Cube[] = [];

    checkMagicCube(magicCubes, Id.SunCube, Id.SunFloor, floor4);
    checkMagicCube(magicCubes, Id.WaterCube, Id.WaterFloor, floor7);
    checkMagicCube(magicCubes, Id.FireCube, Id.FireFloor, floor9);

    let completedCubes = 0;

    for (const cube of magicCubes) {
        if (cube.z == 0) {
            completedCubes++;
        }
    }

    if (completedCubes == magicCubes.length) {
        for (const cube of magicCubes) {
            delete cube.info.id;
        }
        door.open = true;
        if (DEBUG) {
            console.log("door open");
        }
    }
}

const checkMagicCube = (magicCubes: Cube[], cubeId: Id, floorId: Id, floorImageId: number) => {
    const cube = getCube(cubeId);

    if (cube) {
        magicCubes.push(cube);
        if (cube.info.body) {
            const floor = getCube(floorId);

            if (floor) {
                if (pointDistance(cube, floor) < 3.0) {
                    pointCopy(floor, cube);

                    delete cube.info.body;
                    updateBodies();

                    animate(cube, 'z', cellSizeHalf, 0, 0.4, bounceOut, () => {
                        floor.info.top!.id = floorImageId;
                        removeCube(cube);

                        playSound(sound_cube_place);
                    });
                }
            }
        }
    }
}