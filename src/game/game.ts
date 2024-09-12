import { resetDoor } from "./door";
import { buildLevel, levels } from "../levels/builder"
import { fallCubes, updateBodies } from "../engine/physics";
import { sound_explosion, sound_fail, sound_timer } from "../resources/ids";
import { playSound } from "../resources/sounds";
import { prepareImagesTasks } from "../engine/tasks";
import { time } from "../engine/time";
import { limit, mathFloor } from "../utils/math";
import { startShacking } from "../engine/shaking";
import { player, resetPlayer } from "./player";
import { playerDeadTime } from "../config";
import { DEBUG } from "../debug";
import { isKeyPressed, Key } from "../engine/input";

export interface Game {
    level: number,
    state: GameState,
    timeS: number,
    lives: number,
}

export const enum GameState {
    MainMenu,
    Game,
    LevelWin,
    LevelFail,
    GameOver,
    GameWin,
}

export const game: Game = {
    level: 0,
    state: GameState.MainMenu,
    timeS: 0,
    lives: 0,
}

export const startGame = () => {
    game.level = 0;
    game.lives = levels.length;
}

export const startLevel = () => {
    game.timeS = 130;

    buildLevel(game.level);
    updateBodies();
    resetDoor();
    resetPlayer();
    prepareImagesTasks();
}

export const nextLevel = () => {
    game.level++;
}

export const checkPlayerDie = () => {
    if (player.deadTime >= playerDeadTime) {
        game.lives--;
        checkGameOver();
    }
}
export const checkGameTimer = () => {
    if (game.timeS <= 0) {
        return;
    }

    const oldTime = mathFloor(game.timeS);

    game.timeS -= time.deltaS;

    const newTime = mathFloor(game.timeS);

    if (oldTime != newTime && newTime <= 13) {
        const start = 5;
        const end = 0;

        const volume = 0.1 + 0.5 * limit(0, 1, (newTime - start) / (end - start));
        playSound(sound_timer, volume);
    }

    if (game.timeS <= 0) {
        fallCubes();
        playSound(sound_explosion);
        startShacking();
    }

    if (DEBUG) {
        if (isKeyPressed(Key.Space)) {
            game.timeS = 13;
        }
    }
}

export async function checkGameOver() {
    game.state = game.lives > 0 ? GameState.LevelFail : GameState.GameOver;

    playSound(sound_fail);
}


