import { domDocument } from "./utils/browser";

const keys: { [key: string]: boolean | undefined } = {};

export const KEY_UP = 'ArrowUp';
export const KEY_DOWN = 'ArrowDown';
export const KEY_LEFT = 'ArrowLeft';
export const KEY_RIGHT = 'ArrowRight';

export function isKeyPressed(code: string): boolean {
    return !!keys[code];
}

export function initInput() {
    domDocument.onkeydown = (e) => {
        keys[e.code] = true;
    }

    domDocument.onkeyup = (e) => {
        keys[e.code] = undefined;
    }
}