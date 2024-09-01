import { createCanvas, createContext2d, getContext2d } from "../utils/browser";
import { ColorTransform, colorTransformString, tint } from "./color";
import { floor0, floor1, roof0, roof1, roof2, wall0, wall1 } from "./ids";

export const images: HTMLCanvasElement[] = [];

export let roof0_90 = 0;
export let roof0_270 = 0;
export let roof2_h = 0;

export function generateImages() {
    roof0_90 = addImage(copyImage(images[roof0], [rotate90], ));
    roof0_270 = addImage(copyImage(images[roof0], [rotate270]));
    roof2_h = addImage(copyImage(images[roof2], [flipHorizontal]));
}

function changeColors(image: HTMLCanvasElement): number {
    let index = images.length;
    images.push(image);
    return index;
}

function addImage(image: HTMLCanvasElement): number {
    let index = images.length;
    images.push(image);
    return index;
}

function flipVertical(source: ImageData, target: ImageData) {
    const { width, height } = source;
    const sourcePixels = source.data;
    const targetPixels = target.data;

    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            let si = (y * width + x) * 4;

            let ti = ((height - 1 - y) * width + x) * 4;

            targetPixels[ti++] = sourcePixels[si++];
            targetPixels[ti++] = sourcePixels[si++];
            targetPixels[ti++] = sourcePixels[si++];
            targetPixels[ti++] = sourcePixels[si++];
        }
    }
}

function flipHorizontal(source: ImageData, target: ImageData) {
    const { width, height } = source;
    const sourcePixels = source.data;
    const targetPixels = target.data;

    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            let si = (y * width + x) * 4;

            let ti = (y * width + (width - 1 - x)) * 4;

            targetPixels[ti++] = sourcePixels[si++];
            targetPixels[ti++] = sourcePixels[si++];
            targetPixels[ti++] = sourcePixels[si++];
            targetPixels[ti++] = sourcePixels[si++];
        }
    }
}

function rotate90(source: ImageData, target: ImageData) {
    rotate180(source, target);
    source.data.set(target.data, 0);
    rotate270(source, target);
}

function rotate180(source: ImageData, target: ImageData) {
    rotate270(source, target);
    source.data.set(target.data, 0);
    rotate270(source, target);
}

function rotate270(source: ImageData, target: ImageData) {
    rotate(source, target);
    source.data.set(target.data, 0);
    flipVertical(source, target);
}

function rotate(source: ImageData, target: ImageData) {
    const { width, height } = source;
    const sourcePixels = source.data;
    const targetPixels = target.data;

    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            let si = (y * width + x) * 4;

            let ti = (x * width + y) * 4;

            targetPixels[ti++] = sourcePixels[si++];
            targetPixels[ti++] = sourcePixels[si++];
            targetPixels[ti++] = sourcePixels[si++];
            targetPixels[ti++] = sourcePixels[si++];
        }
    }
}

function copyImage(source: HTMLCanvasElement, filters: Array<(sourceData: ImageData, targetData: ImageData) => void>): HTMLCanvasElement {
    const { width, height } = source;

    const sourceContext = getContext2d(source);
    const sourceImageData = sourceContext.getImageData(0, 0, width, height);

    const target = createCanvas();
    target.width = width;
    target.height = height;

    const targetContext = getContext2d(target);
    const targetImageData = targetContext.getImageData(0, 0, width, height);

    for (const filter of filters) {
        filter(sourceImageData, targetImageData);
        sourceImageData.data.set(targetImageData.data, 0);
    }

    targetContext.putImageData(targetImageData, 0, 0);

    return target;
}

