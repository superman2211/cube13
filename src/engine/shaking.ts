import { shackingTime } from "../config";
import { point } from "../geom/point";
import { randomRange } from "../utils/math";
import { time } from "./time";

let currentTime = 0;

export const shackingOffset = point();

export const startShacking = () => {
    currentTime = shackingTime;
}

export const updateShacking = () => {
    if (currentTime > 0) {
        currentTime -= time.deltaS;

        shackingOffset.x = randomRange(-4, 4);
        shackingOffset.y = randomRange(-4, 4);

        if (currentTime <= 0) {
            shackingOffset.x = 0;
            shackingOffset.y = 0;
        }
    }
}