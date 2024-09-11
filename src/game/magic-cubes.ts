import { animate, bounceIn, bounceOut, linear } from "../engine/animation";
import { cellSizeHalf } from "../config";
import { Id } from "./cube";
import { door } from "./door";
import { pointCopy, pointDistance } from "../geom/point";
import { updateBodies } from "../engine/physics";
import { floor4, floor7, sound_cube_place } from "../resources/ids";
import { playSound } from "../resources/sounds";
import { getCube, removeCube } from "../engine/stage";

export const checkMagicCubePlace = () => {
    const magicCubes = [];

    const sunCube = getCube(Id.SunCube);

    if (sunCube) {
        magicCubes.push(sunCube);
        if (sunCube.info.body) {
            const sunFloor = getCube(Id.SunFloor);

            if (sunFloor) {
                if (pointDistance(sunCube, sunFloor) < 2.0) {
                    pointCopy(sunFloor, sunCube);

                    delete sunCube.info.body;
                    updateBodies();

                    animate(sunCube, 'z', cellSizeHalf, 0, 0.4, bounceOut, () => {
                        sunFloor.info.top!.id = floor4;
                        removeCube(sunCube);
                        // door.open = true;

                        playSound(sound_cube_place);
                    });
                }
            }
        }
    }

    const waterCube = getCube(Id.WaterCube);

    if (waterCube) {
        magicCubes.push(waterCube);
        if (waterCube.info.body) {
            const waterFloor = getCube(Id.WaterFloor);

            if (waterFloor) {
                if (pointDistance(waterCube, waterFloor) < 2.0) {
                    pointCopy(waterFloor, waterCube);

                    delete waterCube.info.body;
                    updateBodies();

                    animate(waterCube, 'z', cellSizeHalf, 0, 0.4, bounceOut, () => {
                        waterFloor.info.top!.id = floor7;
                        removeCube(waterCube);
                        
                        playSound(sound_cube_place);
                    });
                }
            }
        }
    }

    let completedCubes = 0;

    for (const cube of magicCubes) {
        if (!cube.info.body) {
            completedCubes++;
        }
    }

    if (completedCubes == magicCubes.length) {
        for (const cube of magicCubes) {
            delete cube.info.id;
        }
        door.open = true;
        console.log("door open");
    }
}