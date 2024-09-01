import { createCanvas, createContext2d, getContext2d } from "../utils/browser";
import { ColorTransform, colorTransformString, tint } from "./color";
import { floor0, floor1, roof0, roof1, roof2, wall0, wall1 } from "./ids";

export const images: HTMLCanvasElement[] = [];

export let blueFoor0 = 0;
export let blueFoor1 = 0;

export let violetWall0 = 0;
export let violetWall1 = 0;

export let violetRoof0 = 0;
export let violetRoof1 = 0;
export let violetRoof2 = 0;

export function generateImages() {
    blueFoor0 = generateImage(floor0, tint(0xff508CCC, 0.5));
    blueFoor1 = generateImage(floor1, tint(0xff508CCC, 0.5));

    violetWall0 = generateImage(wall0, tint(0xff543F77, 0.5));
    violetWall1 = generateImage(wall1, tint(0xff543F77, 0.5));

    violetRoof0 = generateImage(roof0, tint(0xff2E2751, 0.6));
    violetRoof1 = generateImage(roof1, tint(0xff2E2751, 0.6));
    violetRoof2 = generateImage(roof2, tint(0xff2E2751, 0.6));
}

function generateImage(id: number, ct: ColorTransform): number {
    const source = images[id];

    const { width, height } = source;

    const sourceContext = getContext2d(source);
    const imageData = sourceContext.getImageData(0, 0, width, height);
    const data = imageData.data;
    const { length } = data;

    const { rm, gm, bm, am, ro, go, bo, ao } = ct;

    for (let i = 0; i < length;) {
        data[i] = data[i++] * rm + ro;
        data[i] = data[i++] * gm + go;
        data[i] = data[i++] * bm + bo;
        data[i] = data[i++] * am + ao;
    }

    const target = createCanvas();
    target.width = width;
    target.height = height;

    const targetContext = getContext2d(target);
    targetContext.putImageData(imageData, 0, 0);

    images.push(target);

    return images.length - 1;
}

