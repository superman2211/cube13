import { isClicked, resetClick, isKeyPressed, Key, unpressKey, anyKey } from "../engine/input"
import { game, GameState, nextLevel, startGame, startLevel } from "./game"

let anyKeyOld = false;
let intro = false;

export const checkContinue = () => {
    if (isClicked() || (anyKey && !anyKeyOld)) {
        resetClick();

        switch (game.state) {
            case GameState.MainMenu:
                if (!intro) {
                    intro = true;
                    game.state = GameState.Intro;
                } else {
                    setToGame();
                }
                break;

            case GameState.Intro:
                setToGame();
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

function setToGame() {
    startGame();
    startLevel();
    game.state = GameState.Game;
}