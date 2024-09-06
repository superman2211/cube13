const fs = require("fs");

fs.writeFileSync(
    'src/debug.ts',
    `export const DEBUG = true;
export const FPS = true;`
);