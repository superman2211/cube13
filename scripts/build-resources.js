const fs = require("fs");
const path = require("path");
const parseAPNG = require('apng-js').default;
const PNG = require("pngjs").PNG;

function init(data) {
    data.pallette = [0];
    data.images = [];
}

async function readAnimations(data) {
    let pixel = new Uint32Array(1);

    const files = fs.readdirSync(path.resolve('resources/animations'));
    for (var file of files) {
        let file_path = path.join('resources/animations', file);

        if (path.extname(file_path) === '.png') {
            console.log(file_path);
            let buffer = fs.readFileSync(file_path);

            console.log(parseAPNG);

            const result = parseAPNG(buffer);
            if (result instanceof Error) {
                console.error(result);
            } else {
                for (frame of result.frames) {
                    const arrayBuffer = await frame.imageData.arrayBuffer();
                    const pixels = await readPngData(arrayBuffer);

                    console.log(pixels.width, pixels.height, pixels.data.length);

                    let i = 0;
                    let p = 0;

                    let image = {
                        data: [],
                        width: pixels.width,
                        height: pixels.height,
                    }

                    while (i < pixels.data.length) {
                        const r = pixels.data[i++];
                        const g = pixels.data[i++];
                        const b = pixels.data[i++];
                        const a = pixels.data[i++];
                        pixel[0] = r | (g << 8) | (b << 16) | (a << 24);
                        let color = pixel[0];
                        // console.log(color);

                        let index = data.pallette.indexOf(color);
                        if (index === -1) {
                            index = data.pallette.length
                            data.pallette.push(color);
                            console.log("pallette", data.pallette);
                        }
                        image.data[p++] = index;
                    }

                    console.log(image);
                    data.images.push(image);
                }
            }
        }
    }
}

function readPngData(arrayBuffer) {
    return new Promise((resolve, reject) => {
        new PNG({ filterType: 4 }).parse(arrayBuffer, function (error, data) {
            if (data) {
                resolve(data);
            } else {
                reject(error);
            }
        });
    });
}

function writeResources(data) {
    let stream = [];

    stream.push(data.pallette.length);

    for (let color of data.pallette) {
        const r = color & 0xff;
        const g = (color >> 8) & 0xff;
        const b = (color >> 16) & 0xff;
        const a = (color >> 24) & 0xff;
        console.log(color.toString(16), r, g, b, a);
        stream.push(r, g, b, a);
    }

    stream.push(data.images.length);

    for (let image of data.images) {
        stream.push(image.width, image.height);
        stream.push(...image.data);
    }

    console.log('stream.length', stream.length);

    let buffer = Buffer.from(new Uint8Array(stream));

    console.log(buffer);

    fs.writeFileSync(path.resolve("dist/build/r"), buffer);
}

async function main() {
    let data = {};
    init(data);
    await readAnimations(data);
    writeResources(data);
}

main();