import { createContext, getCanvas, getContext, getHeight, getWidth, setHeight, setWidth } from "../utils/browser";
import { mathFloor } from "../utils/math";

export const images: HTMLCanvasElement[] = [];

const cache: { [key: string]: { [key: string]: HTMLCanvasElement } } = {};

export const brightnessQuality = 16;

export const getImage = (id: number, brightness?: number): HTMLCanvasElement => {
    if (brightness === undefined || brightness === 1) {
        return images[id];
    } else {
        let imageCache = cache[id];

        if (!imageCache) {
            cache[id] = {};
            imageCache = cache[id];
        }

        const brightnessId = mathFloor(brightness * brightnessQuality);

        let target = imageCache[brightnessId];

        if (!target) {
            imageCache[brightnessId] = generateImage(id, (color) => {
                color[0] = color[0] * brightness;
                color[1] = color[1] * brightness;
                color[2] = color[2] * brightness;
            });

            target = imageCache[brightnessId];
        }

        return target;
    }
}

export const getColoredImage = (id: number, color: number) => {
    if (color == 0) {
        return images[id];
    } else {
        let imageCache = cache[id];

        if (!imageCache) {
            cache[id] = {};
            imageCache = cache[id];
        }

        let target = imageCache[color];

        if (!target) {
            const r = (color >> 16) & 0xff;
            const g = (color >> 8) & 0xff;
            const b = color & 0xff;

            imageCache[color] = generateImage(id, (color) => {
                color[0] = r;
                color[1] = g;
                color[2] = b;
            });

            target = imageCache[color];
        }

        return target;
    }
}

const generateImage = (id: number, filter: (color: Uint8ClampedArray) => void): HTMLCanvasElement => {
    const sourceContext = getContext(images[id]);
    const width = getWidth(sourceContext);
    const height = getHeight(sourceContext);

    const targetContext = createContext();
    setWidth(targetContext, width);
    setHeight(targetContext, height);

    const sourceImageData = sourceContext.getImageData(0, 0, width, height);
    const targetImageData = targetContext.getImageData(0, 0, width, height);

    const sourcePixels = sourceImageData.data;
    const targetPixels = targetImageData.data;

    let i = 0;

    while (i < sourcePixels.length) {
        const color = sourcePixels.slice(i, i + 4);

        filter(color);

        targetPixels.set(color, i);

        i += 4;
    }

    targetContext.putImageData(targetImageData, 0, 0);

    return getCanvas(targetContext);
}