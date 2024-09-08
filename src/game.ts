import { DEBUG } from "./debug";
import { resetDoor } from "./door";
import { fallCubes } from "./fall-cubes";
import { buildLevel, levels } from "./levels/builder"
import { updateBodies } from "./physics";
import { sound_timer } from "./resources/ids";
import { playSound } from "./resources/sounds";
import { prepareImagesTasks } from "./tasks";
import { time } from "./time";
import { limit, mathFloor, mathMin } from "./utils/math";

export interface Game {
    level: number,
    state: GameState,
    time: number,
}

export enum GameState {
    MainMenu,
    Game,
    NextLevel,
    GameOver,
}

export const game: Game = {
    level: 0,
    state: GameState.Game,
    time: 0,
}

export const start = () => {
    buildLevel(game.level);
    updateBodies();
    resetDoor();
    prepareImagesTasks();
    game.time = 0;
}

export const nextLevel = () => {
    game.level++;
    game.level = game.level % levels.length;
    start();
}

export const checkGameTimer = () => {
    const delta = time.deltaS;

    const oldTime = mathFloor(game.time);

    game.time += delta;

    const newTime = mathFloor(game.time);

    if (oldTime != newTime && newTime <= 13) {
        if (DEBUG) {
            console.log("timer ", newTime);
        }

        const start = 5;
        const total = 13;

        const volume = 0.1 + 0.5 * limit(0, 1, (newTime - start) / (total - start));
        playSound(sound_timer, volume);
    }

    if (game.time >= 13) {
        game.state = GameState.GameOver;

        if (DEBUG) {
            console.log("game over");
        }

        fallCubes();
    }
}


