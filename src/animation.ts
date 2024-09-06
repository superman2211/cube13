import { time } from "./time";

interface Animation {
    targetObject: any,
    property: string,
    srcValue: number,
    dstValue: number,
    timeS: number,
    duration: number,
    callback?: () => void,
}

let animations: Animation[] = [];

export const animate = (targetObject: any, property: string, dstValue: number, duration: number, callback?: () => void) => {
    const srcValue = targetObject[property];

    animations.push({
        targetObject,
        property,
        srcValue,
        dstValue,
        timeS: 0,
        duration,
        callback
    });
}

export const updateAnimations = () => {
    const delta = time.deltaS;

    animations = animations.filter((animation) => {
        animation.timeS += delta;
        const { targetObject, property, srcValue, dstValue, duration, callback } = animation;
        if (animation.timeS > duration) {
            targetObject[property] = dstValue;
            if (callback) {
                callback();
            }
            return false;
        } else {
            let value = (animation.timeS / duration);
            targetObject[property] = srcValue + (dstValue - srcValue) * value;
            return true;
        }
    });
}