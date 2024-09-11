import { DEBUG } from "../debug";
import { resetDoor } from "./door";
import { fallCubes } from "./fall-cubes";
import { buildLevel, levels } from "../levels/builder"
import { updateBodies } from "../engine/physics";
import { sound_explosion, sound_timer } from "../resources/ids";
import { playSound } from "../resources/sounds";
import { prepareImagesTasks } from "../engine/tasks";
import { time } from "../engine/time";
import { limit, mathFloor, mathMin } from "../utils/math";
import { timeout } from "../utils/browser";
import { startShacking } from "../engine/shaking";

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
    game.timeS = 0;

    buildLevel(game.level);
    updateBodies();
    resetDoor();
    prepareImagesTasks();
}

export const nextLevel = () => {
    game.level++;
}

export const checkGameTimer = () => {
    if (game.timeS >= 13) {
        return;
    }

    const delta = time.deltaS;

    const oldTime = mathFloor(game.timeS);

    game.timeS += delta;

    const newTime = mathFloor(game.timeS);

    if (oldTime != newTime && newTime <= 13) {
        const start = 5;
        const total = 13;

        const volume = 0.1 + 0.5 * limit(0, 1, (newTime - start) / (total - start));
        playSound(sound_timer, volume);
    }

    if (game.timeS >= 13) {
        fallCubes();
        playSound(sound_explosion);
        startShacking();
    }
}

export async function checkGameOver() {
    game.state = game.lives > 0 ? GameState.LevelFail : GameState.GameOver;
}


