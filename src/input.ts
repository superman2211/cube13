import { domDocument } from "./utils/browser";

const keys: string [] = [];

export const KEY_UP = 'ArrowUp';
export const KEY_DOWN = 'ArrowDown';
export const KEY_LEFT = 'ArrowLeft';
export const KEY_RIGHT = 'ArrowRight';

export function isKeyPressed(code: string): boolean {
    return keys.includes(code);
}

export function initInput() {
    function keyHandler(e: KeyboardEvent, type: number) {
        e.preventDefault();
    }

    domDocument.onkeydown = (e) => {
        if (!keys.includes(e.code)) {
            keys.push(e.code);
        }
    }

    domDocument.onkeyup = (e) => {
        if (keys.includes(e.code)) {
            keys.splice(keys.indexOf(e.code), 1);
        }
    }
}