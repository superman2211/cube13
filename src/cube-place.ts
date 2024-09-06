import { animate } from "./animation";
import { cellSize, cellSizeHalf } from "./config";
import { Cube, Id } from "./cube";
import { door } from "./door";
import { pointCopy, pointDistance } from "./geom/point";
import { getBodies } from "./physics";
import { floor3, floor4 } from "./resources/ids";
import { cubes, getCubeById, removeCube } from "./stage";

export const checkCubePlace = () => {
    const cube = getCubeById(Id.SunCube);
    const floor = getCubeById(Id.SunFloor);

    if (cube && cube.info.body && floor) {
        if (pointDistance(cube, floor) < 2.0) {
            pointCopy(floor, cube);

            cube.info.body = undefined;
            getBodies();

            animate(cube, 'z', cellSizeHalf, 0.5, () => {
                floor.info.top!.id = floor4;
                removeCube(cube);
                door.open = true;
            });
        }
    }
}