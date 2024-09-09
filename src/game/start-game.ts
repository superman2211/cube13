import { getFirstTouch, isKeyPressed, Key, touches } from "../engine/input"
import { hasTouch } from "../utils/browser"
import { game, GameState, startLevel } from "./game"

export const checkContinue = () => {
    if ((hasTouch && getFirstTouch()) || isKeyPressed(Key.Space)) {
        if (game.state == GameState.LevelFail || game.state == GameState.LevelWin) {
            startLevel();
            game.state = GameState.Game;
        }
    }
}