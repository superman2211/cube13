import { now } from "./utils/browser";

export interface Time {
    now: number,
    delta: number,
}

export const time: Time = { now: now(), delta: 0 };

export const calculateTime = () => {
    const old = time.now;
    time.now = now(); // in ms
    time.delta = (time.now - old) / 1000; // in secs
}