import { isClicked, resetClick, isKeyPressed, Key, unpressKey, anyKey } from "../engine/input"
import { game, GameState, nextLevel, startGame, startLevel } from "./game"

let anyKeyOld = false;

export const checkContinue = () => {
    if (isClicked() || (anyKey && !anyKeyOld)) {
        resetClick();
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

    anyKeyOld = anyKey;
}