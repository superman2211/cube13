import { time } from "./time";

interface Animation {
    targetObject: any,
    property: string,
    srcValue: number,
    dstValue: number,
    timeS: number,
    offsetS: number,
    duration: number,
    easing: (value: number) => number,
    callback?: () => void,
}

let animations: Animation[] = [];

export const linear = (value: number): number => value;
export const quadraticIn = (value: number): number => (value * value);
export const quadraticOut = (value: number): number => (value * (2 - value));
export const bounceIn = (value: number): number => (1 - bounceOut(1 - value));
export const bounceOut = (value: number): number => {
    if (value < 1 / 2.75) {
        return 7.5625 * value * value;
    }
    if (value < 2 / 2.75) {
        return 7.5625 * (value -= 1.5 / 2.75) * value + 0.75;
    }
    if (value < 2.5 / 2.75) {
        return 7.5625 * (value -= 2.25 / 2.75) * value + 0.9375;
    }
    return 7.5625 * (value -= 2.625 / 2.75) * value + 0.984375;
};

export const animate = (
    targetObject: any,
    property: string,
    dstValue: number,
    offsetS: number,
    duration: number,
    easing: (value: number) => number,
    callback?: () => void
) => {
    const srcValue = targetObject[property];

    animations.push({
        targetObject,
        property,
        srcValue,
        dstValue,
        timeS: 0,
        offsetS,
        duration,
        easing,
        callback,
    });
}

export const updateAnimations = () => {
    const delta = time.deltaS;

    animations = animations.filter((animation) => {
        if (animation.offsetS > 0) {
            animation.offsetS -= delta;
            return true;
        } else {
            animation.timeS += delta;
            const { targetObject, property, srcValue, dstValue, duration, easing, callback } = animation;
            if (animation.timeS > duration) {
                targetObject[property] = dstValue;
                if (callback) {
                    callback();
                }
                return false;
            } else {
                let value = easing(animation.timeS / duration);
                targetObject[property] = srcValue + (dstValue - srcValue) * value;
                return true;
            }
        }
    });
}