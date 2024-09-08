const math = Math;

export const mathFloor = math.floor;
export const mathRound = math.round;
export const mathMin = math.min;
export const mathMax = math.max;
export const mathHypot = math.hypot;
export const mathAbs = math.abs;
export const mathRandom = math.random;

export const limit = (min: number, max: number, value: number) => mathMin(max, mathMax(min, value));
export const lerp = (min: number, max: number, value: number) => min + value * (max - min);
export const randomRange = (min: number, max: number): number => lerp(min, max, mathRandom());