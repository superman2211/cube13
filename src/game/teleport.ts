import { cellSize, cellSizeHalf } from "../config";
import { getCube, getCubes } from "../engine/stage"
import { time } from "../engine/time";
import { pointDistance } from "../geom/point";
import { sound_teleport } from "../resources/ids";
import { playSound } from "../resources/sounds";
import { Cube, Id } from "./cube";

let last: Cube | undefined;

export const updateTeleport = () => {
    const player = getCube(Id.Player);

    if (player) {
        if (player.info.front && player.info.front.alpha !== undefined) {
            player.info.front.alpha += time.deltaS;
            if (player.info.front.alpha > 1) {
                player.info.front.alpha = undefined;
            }
        }

        if (last) {
            if (pointDistance(last, player) > cellSize) {
                last = undefined;
            }
        } else {
            checkGroup(player, Id.Teleport1);
            checkGroup(player, Id.Teleport2);

        }
    }
}

const checkGroup = (player: Cube, id: Id) => {
    const teleports = getCubes(id);
    if (teleports.length == 2) {
        checkTransition(player, teleports[0], teleports[1]);
        checkTransition(player, teleports[1], teleports[0]);
    }
}

const checkTransition = (player: Cube, source: Cube, target: Cube) => {
    if (last) {
        return;
    }

    if (pointDistance(player, source) < cellSizeHalf) {
        last = target;

        player.x = player.x - source.x + target.x;
        player.y = player.y - source.y + target.y;

        player.info.front!.alpha = 0;

        playSound(sound_teleport);
    }
}