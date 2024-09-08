import { DEBUG } from "./debug";
import { domDocument } from "./utils/browser";

const keys: { [key: string]: boolean | undefined } = {};

export const enum Key {
    Up = 38,
    Down = 40,
    Left = 37,
    Right = 39,
    A = 65,
    D = 68,
    W = 87,
    S = 83,
}

export const isKeyPressed = (code: Key): boolean | undefined => keys[code];

export const initInput = () => {
    domDocument.onkeydown = (e) => {
        // if (DEBUG) {
        //     console.log('keyCode', e.keyCode);
        // }

        keys[e.keyCode] = true;
    }

    domDocument.onkeyup = (e) => {
        keys[e.keyCode] = undefined;
    }
}