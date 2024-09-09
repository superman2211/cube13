import { now } from "../utils/browser";

export interface Time {
    nowMS: number,
    deltaS: number,
}

export const time: Time = { nowMS: now(), deltaS: 0 };

export const calculateTime = () => {
    const oldMS = time.nowMS;
    time.nowMS = now();
    time.deltaS = (time.nowMS - oldMS) / 1000;
}