import { DEBUG } from "./debug";
import { domDocument, dpr, getCanvas, hasTouch } from "./utils/browser";
import { screen } from "./screen";
import { point, Point } from "./geom/point";
import { initSound } from "./resources/sounds";

const keys: { [key: string]: boolean } = {};

export const touches: { [key: string]: Point } = {};

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
        delete keys[e.keyCode];
    }

    const screenCanvas = getCanvas(screen);

    if (hasTouch) {
        const forTouch = (e: TouchEvent, handler: (id: number, t: Point) => void) => {
            const changedTouches = e.changedTouches;
            for (let i = 0; i < changedTouches.length; i++) {
                const { clientX, clientY, identifier } = changedTouches[i];
                handler(identifier, point(clientX * dpr, clientY * dpr));
            }
        };

        const addTouch = (e: TouchEvent) => forTouch(e, (id, t) => { touches[id] = t; });
        const removeTouch = (e: TouchEvent) => forTouch(e, (id, t) => { delete touches[id]; });

        screenCanvas.ontouchstart = addTouch;
        screenCanvas.ontouchmove = addTouch;
        screenCanvas.ontouchend = removeTouch;
        screenCanvas.ontouchcancel = removeTouch;
    }

    screenCanvas.onclick = () => initSound();
}