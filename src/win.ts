import { cellSizeHalf } from "./config";
import { Id } from "./cube"
import { nextLevel } from "./game";
import { getCube } from "./stage"
import { mathAbs } from "./utils/math";

export const checkWin = () => {
    const player = getCube(Id.Player);
    const door = getCube(Id.Door);

    if (player && door) {
        if (mathAbs(player.x - door.x) < cellSizeHalf && player.y < door.y) {
            console.log('win!');

            nextLevel();
        }
    }
}