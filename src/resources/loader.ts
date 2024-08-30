export const images: HTMLCanvasElement[] = [];

export async function loadResources() {
    const response = await fetch('r');
    const buffer = await response.arrayBuffer();

    const stream = new Uint8Array(buffer);

    let p = 0;

    const palletteSize = stream[p++] * 4;
    const pallette = stream.slice(p, p + palletteSize);
    p += palletteSize;

    let imagesLength = stream[p++];

    while (imagesLength-- > 0) {
        const width = stream[p++];
        const height = stream[p++];

        const imageSize = width * height;

        const pixels = stream.slice(p, p + imageSize);
        p += imageSize;

        let image = document.createElement("canvas");
        image.width = width;
        image.height = height;

        let context = image.getContext('2d')!;

        let imageData = context.getImageData(0, 0, width, height);

        let j = 0;

        for (let i in pixels) {
            let color = pixels[i] * 4;

            imageData.data[j++] = pallette[color++];
            imageData.data[j++] = pallette[color++];
            imageData.data[j++] = pallette[color++];
            imageData.data[j++] = pallette[color];
        }

        context.putImageData(imageData, 0, 0);

        images.push(image);
    }
}