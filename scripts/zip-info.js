const fs = require("fs");

const targetSize = 13312;

const stats = fs.statSync("dist/cube13.zip");

if (stats.size <= targetSize) {
    console.log(`GOOD ZIP SIZE: ${stats.size} of ${targetSize}`);
} else {
    console.log(`WARNING! BAD ZIP SIZE: ${stats.size} of ${targetSize}`);
}
