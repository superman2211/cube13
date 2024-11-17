const fs = require("fs");

fs.copyFileSync("assets/pwa/512.png", "dist/build/512.png");
fs.copyFileSync("assets/pwa/index.html", "dist/build/index.html");
fs.copyFileSync("assets/pwa/manifest.json", "dist/build/manifest.json");
fs.copyFileSync("assets/pwa/sw.js", "dist/build/sw.js");