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