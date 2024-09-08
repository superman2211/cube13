import { domDocument } from "./utils/browser";

const keys: { [key: string]: boolean | undefined } = {};

export const enum Key {
    Up = 38,
    Down = 40,
    Left = 37,
    Right = 39,
    W = 87,
    S = 83,
}

export const isKeyPressed = (code: Key): boolean | undefined => keys[code];

export const initInput = () => {
    domDocument.onkeydown = (e) => {
        keys[e.keyCode] = true;
    }

    domDocument.onkeyup = (e) => {
        keys[e.keyCode] = undefined;
    }
}