import { cellSizeHalf } from "./config";
import { Id } from "./cube"
import { DEBUG } from "./debug";
import { nextLevel } from "./game";
import { sound_next_level } from "./resources/ids";
import { playSound } from "./resources/sounds";
import { getCube } from "./stage"
import { mathAbs } from "./utils/math";

export const checkNextLevel = () => {
    const player = getCube(Id.Player);
    const door = getCube(Id.Door);

    if (player && door) {
        if (mathAbs(player.x - door.x) < cellSizeHalf && player.y < door.y) {
            if (DEBUG) {
                console.log('win!');
            }

            nextLevel();

            playSound(sound_next_level);
        }
    }
}