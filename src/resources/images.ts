import { createCanvas, createContext, getCanvas, getContext, getHeight, getWidth, setHeight, setWidth } from "../utils/browser";
import { mathFloor, mathRound } from "../utils/math";
import { ColorTransform, colorTransformString, tint } from "./color";
import { floor0, floor1, roof0, roof1, roof2, wall0, wall1 } from "./ids";

export const images: HTMLCanvasElement[] = [];

const cache: { [key: string]: { [key: string]: HTMLCanvasElement } } = {};

export const brightnessQuality = 32;

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
                targetPixels[i] = sourcePixels[i++] * brightness;
                targetPixels[i] = sourcePixels[i++] * brightness;
                targetPixels[i] = sourcePixels[i++] * brightness;
                targetPixels[i] = sourcePixels[i++];
            }

            targetContext.putImageData(targetImageData, 0, 0);

            imageCache[brightnessId] = getCanvas(targetContext);
            target = imageCache[brightnessId];
        }

        return target;
    }
}
