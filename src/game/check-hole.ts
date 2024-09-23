import { cellSize } from "../config";
import { fallCube } from "../engine/physics";
import { getCube, getCubes } from "../engine/stage"
import { boxesIntersects } from "../geom/box";
import { defaultBox } from "../levels/infos";
import { sound_cube_fall } from "../resources/ids";
import { playSound } from "../resources/sounds";
import { Id } from "./cube"

export const checkHole = () => {
    const player = getCube(Id.Player);
    const holes = getCubes(Id.Hole);

    if (player &&
        player.z == cellSize &&
        player.info.body &&
        holes.length
    ) {
        const playerBox = player.info.body.box;

        for (const hole of holes) {
            if (hole.z == 0) {
                if (boxesIntersects(playerBox, player, defaultBox, hole)) {
                    fallCube(hole);

                    playSound(sound_cube_fall);
                }
            }
        }
    }
}