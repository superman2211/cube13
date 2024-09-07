const fs = require("fs");
const path = require("path");
const parseAPNG = require('apng-js').default;
const PNG = require("pngjs").PNG;
const { convertSound } = require('./base64sfxr');

function init(data) {
    data.pallette = [0];
    data.images = [];
    data.sounds = [];
}

async function readAnimations(data) {
    let pixel = new Uint32Array(1);

    const files = fs.readdirSync(path.resolve('resources/animations'));

    for (var file of files) {
        let filePath = path.join('resources/animations', file);

        if (path.extname(filePath) === '.png') {
            console.log('image', filePath);
            let buffer = fs.readFileSync(filePath);

            const result = parseAPNG(buffer);
            if (result instanceof Error) {
                console.error(result);
            } else {
                for (let f in result.frames) {
                    const frame = result.frames[f];
                    const arrayBuffer = await frame.imageData.arrayBuffer();
                    const pixels = await readPngData(arrayBuffer);

                    console.log(pixels.width, pixels.height, pixels.data.length);

                    let i = 0;
                    let p = 0;

                    let image = {
                        data: [],
                        width: pixels.width,
                        height: pixels.height,
                        name: path.basename(file).replace('.png', f),
                    }

                    while (i < pixels.data.length) {
                        const r = pixels.data[i++];
                        const g = pixels.data[i++];
                        const b = pixels.data[i++];
                        const a = pixels.data[i++];

                        pixel[0] = r | (g << 8) | (b << 16) | (a << 24);
                        let color = pixel[0];

                        let index = data.pallette.indexOf(color);
                        if (index === -1) {
                            index = data.pallette.length
                            data.pallette.push(color);
                        }
                        image.data[p++] = index;
                    }

                    data.images.push(image);
                }
            }
        }
    }

    console.log('pallette ' + data.pallette.length);
    console.log('images ' + data.images.length);
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

function readSoundsFiles(data) {
    const soundFiles = fs.readdirSync(path.resolve('resources/sounds'));
    for (const fileName of soundFiles) {
        if (path.extname(fileName) === '.sfxr') {
            const filePath = path.resolve('resources/sounds', fileName);
            const text = fs.readFileSync(filePath).toString();
            const soundData = convertSound(text);
            const view = new Uint8Array(soundData.buffer);
            const name = fileName.replace('.sfxr', '');
            data.sounds.push({ name, view });
            console.log(`sound ${filePath}`);
        }
    }
}

function writeResources(data) {
    let ids = '';

    const stream = [];

    stream.push(data.pallette.length);

    for (let color of data.pallette) {
        const r = color & 0xff;
        const g = (color >> 8) & 0xff;
        const b = (color >> 16) & 0xff;
        const a = (color >> 24) & 0xff;
        stream.push(r, g, b, a);
    }

    stream.push(data.images.length);

    for (let i in data.images) {
        let image = data.images[i];

        stream.push(image.width, image.height);
        stream.push(...image.data);

        ids += `export const ${image.name} = ${i};\n`;
    }

    stream.push(data.sounds.length);

    for (let i in data.sounds) {
        const sound = data.sounds[i];
        stream.push(sound.view.length);
        stream.push(...sound.view);

        ids += `export const sound_${sound.name} = ${i};\n`;
    }

    console.log('resources size ' + stream.length + ' bytes');

    let buffer = Buffer.from(new Uint8Array(stream));

    fs.writeFileSync(path.resolve("dist/build/r"), buffer);
    fs.writeFileSync(path.resolve("src/resources/ids.ts"), ids);
}

function createDirectories() {
    if (!fs.existsSync(path.resolve('dist'))) {
        fs.mkdirSync(path.resolve('dist'));
    }

    if (!fs.existsSync(path.resolve('dist/build'))) {
        fs.mkdirSync(path.resolve('dist/build'));
    }
}

async function main() {
    let data = {};
    init(data);
    createDirectories();
    await readAnimations(data);
    readSoundsFiles(data);
    writeResources(data);
}

main();