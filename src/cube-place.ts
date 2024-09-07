import { animate } from "./animation";
import { cellSizeHalf } from "./config";
import { Id } from "./cube";
import { door } from "./door";
import { pointCopy, pointDistance } from "./geom/point";
import { updateBodies } from "./physics";
import { floor4, sound_cube_place } from "./resources/ids";
import { playSound } from "./resources/sounds";
import { getCube, removeCube } from "./stage";

export const checkCubePlace = () => {
    const cube = getCube(Id.SunCube);
    const floor = getCube(Id.SunFloor);

    if (cube && cube.info.body && floor) {
        if (pointDistance(cube, floor) < 2.0) {
            pointCopy(floor, cube);

            cube.info.body = undefined;
            updateBodies();

            animate(cube, 'z', cellSizeHalf, 0.5, () => {
                floor.info.top!.id = floor4;
                removeCube(cube);
                door.open = true;

                playSound(sound_cube_place, 1.0);
            });
        }
    }
}