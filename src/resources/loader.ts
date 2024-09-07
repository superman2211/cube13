import { createContext, getCanvas, setHeight, setWidth } from "../utils/browser";
import { images } from "./images";
import { soundsBuffers } from "./sounds";

export async function loadResources() {
    const response = await fetch('r');
    const buffer = await response.arrayBuffer();

    const stream = new Uint8Array(buffer);

    let p = 0;

    const palletteSize = stream[p++] * 4;
    const pallette = stream.slice(p, p + palletteSize);
    p += palletteSize;

    let imagesLength = stream[p++];

    while (imagesLength--) {
        const width = stream[p++];
        const height = stream[p++];

        const imageSize = width * height;

        const pixels = stream.slice(p, p + imageSize);
        p += imageSize;

        let context = createContext();
        setWidth(context, width);
        setHeight(context, height);

        let imageData = context.getImageData(0, 0, width, height);

        for (let p = 0; p < pixels.length; p++) {
            let c = pixels[p] << 2;

            imageData.data.set(pallette.slice(c, c + 4), p << 2);
        }

        context.putImageData(imageData, 0, 0);

        images.push(getCanvas(context));
    }

    let soundsLength = stream[p++];

    while (soundsLength--) {
        const soundSize = stream[p++];
        soundsBuffers.push(buffer.slice(p, p + soundSize));
        p += soundSize;
    }
}