const math = Math;

export const mathFloor = math.floor;
export const mathRound = math.round;
export const mathMin = math.min;
export const mathMax = math.max;
export const mathHypot = math.hypot;
export const mathAbs = math.abs;
export const mathRandom = math.random;
export const mathAtan2 = math.atan2;
export const mathPI = math.PI;
export const mathPI2 = mathPI * 2;

export const limit = (min: number, max: number, value: number) => mathMin(max, mathMax(min, value));
export const lerp = (min: number, max: number, value: number) => min + value * (max - min);
export const randomRange = (min: number, max: number): number => lerp(min, max, mathRandom());

export function randomSelect<T>(values: T[]): T {
    return values[mathRound(randomRange(0, values.length - 1))];
}