const fs = require("fs");

const targetSize = 13312;

const stats = fs.statSync("dist/cube13.zip");

const percent = (stats.size / targetSize * 100.0).toFixed(2);

if (stats.size <= targetSize) {
    console.log(`GOOD ZIP SIZE: ${stats.size} / ${targetSize} (${percent}%)`);
} else {
    console.log(`ALERT!!! BAD ZIP SIZE: ${stats.size} / ${targetSize} (${percent}%)`);
}
