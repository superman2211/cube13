import { sound_timer } from "./resources/ids";
import { playSound } from "./resources/sounds";
import { time } from "./time"
import { mathFloor, mathMax, mathMin } from "./utils/math";

export interface GameTimer {
    time: number,
}

export const timer: GameTimer = { time: 0 };

export const resetGameTimer = () => {
    timer.time = 0;
}

export const checkGameTimer = () => {
    const delta = time.deltaS;

    const oldTime = mathFloor(timer.time);

    timer.time += delta;

    const newTime = mathFloor(timer.time);

    if (oldTime != newTime) {
        console.log("timer ", newTime);

        const start = 5;
        const total = 13;
        if (newTime >= start && newTime <= total) {
            const volume = 0.5 * mathMin((newTime - start) / (total - start), 1);
            console.log('volume', volume);
            playSound(sound_timer, volume);
        }
    }

    if (timer.time >= 13) {
        console.log("game over");
    }
}