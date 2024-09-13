import { cellSizeHalf } from "../config";
import { Id } from "./cube"
import { DEBUG } from "../debug";
import { game, GameState, nextLevel } from "./game";
import { sound_win } from "../resources/ids";
import { playSound } from "../resources/sounds";
import { getCube } from "../engine/stage"
import { mathAbs } from "../utils/math";
import { levels } from "../levels/builder";

export const checkNextLevel = () => {
    const player = getCube(Id.Player);
    const door = getCube(Id.Door);

    if (player && door) {
        if (mathAbs(player.x - door.x) < cellSizeHalf && player.y < door.y) {
            if (DEBUG) {
                console.log('win!');
            }

            playSound(sound_win);

            if (game.level == levels.length - 1) {
                game.state = GameState.GameWin;
                game.scoreTime = game.totalTime;
            } else {
                game.state = GameState.LevelWin;
            }
        }
    }
}