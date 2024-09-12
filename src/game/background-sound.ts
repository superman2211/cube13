import { time } from "../engine/time";
import { sound_back } from "../resources/ids";
import { playSound } from "../resources/sounds";
import { randomRange } from "../utils/math"

let timeS = randomRange(5, 10);

export const updateBackgroundSound = () => {
    timeS -= time.deltaS;
    if (timeS < 0) {
        timeS = randomRange(5, 10);
        playSound(sound_back, 0.2);
    }
}