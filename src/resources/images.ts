import { createContext2d, getContext2d } from "../utils/browser";
import { ColorTransform, colorTransformString } from "./color";

export const images: HTMLCanvasElement[] = [];

const cache: { [key: string]: HTMLCanvasElement } = {};

export function getImage(id: number, ct?: ColorTransform): HTMLCanvasElement {
    if (ct) {
        const cacheId = id + '_' + colorTransformString(ct);

        let image = cache[cacheId];

        if (image) {
            return image;
        }

        const source = images[id];

        const target = createContext2d();

        image = target.canvas;
        image.width = source.width;
        image.height = source.height;

        const imageData = getContext2d(source).getImageData(0, 0, image.width, image.height);
        
        const data = imageData.data;
        const { length } = data;

        const { rm, gm, bm, am, ro, go, bo, ao } = ct;

        for (let i = 0; i < length;) {
            data[i] = data[i++] * rm + ro;
            data[i] = data[i++] * gm + go;
            data[i] = data[i++] * bm + bo;
            data[i] = data[i++] * am + ao;
        }

        target.putImageData(imageData, 0, 0);

        cache[cacheId] = image;

        console.log("apply color transform");

        return image;
    } else {
        return images[id];
    }
}