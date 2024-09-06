import { Cube } from "./cube";
import { time } from "./time";

interface Animation {
    o: any,
    p: string,
    s: number,
    d: number,
    t: number,
    f: number,
    c?: () => void,
}

let animations: Animation[] = [];

export const animate = (o: any, p: string, d: number, f: number, c?: () => void) => {
    const s = o[p];

    animations.push({
        o,
        p,
        d,
        s,
        t: 0,
        f,
        c
    });
}

export const updateAnimations = () => {
    const delta = time.delta;

    animations = animations.filter((animation) => {
        animation.t += delta;
        const { o, p, s, d, f, c } = animation;
        if (animation.t > f) {
            o[p] = d;
            if (c) {
                c();
            }
            return false;
        } else {
            let value = (animation.t / f);
            o[p] = s + (d - s) * value;
            return true;
        }
    });
}