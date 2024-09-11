import { touch, isKeyPressed, Key, touches, unpressKey } from "../engine/input"
import { hasTouch } from "../utils/browser"
import { game, GameState, nextLevel, startGame, startLevel } from "./game"

export const checkContinue = () => {
    console.log("wasTouch", touch.start);
    if (touch.start || isKeyPressed(Key.Space)) {
        touch.start = false;
        unpressKey(Key.Space);

        switch (game.state) {
            case GameState.MainMenu:
                startGame();
                startLevel();
                game.state = GameState.Game;
                break;

            case GameState.LevelFail:
                startLevel();
                game.state = GameState.Game;
                break;

            case GameState.LevelWin:
                nextLevel();
                startLevel();
                game.state = GameState.Game;
                break;

            case GameState.GameOver:
                game.state = GameState.MainMenu;
                break;

            case GameState.GameWin:
                game.state = GameState.MainMenu;
                break;
        }
    }
}