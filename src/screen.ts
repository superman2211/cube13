import { cells, cellSize } from "./config";
import { domDocument, dpr, getContext } from "./utils/browser";
import { mathMin } from "./utils/math";

export const screen: CanvasRenderingContext2D = getContext(domDocument.getElementById('c') as HTMLCanvasElement);

export const stageWidth = cellSize * (cells + 2);
export const stageHeight = cellSize * (cells + 6);

export let windowWidth = 0;
export let windowHeight = 0;

export let gameScale = 1;

export const updateScreen = () => {
    windowWidth = innerWidth * dpr;
    windowHeight = innerHeight * dpr;

    gameScale = mathMin(windowWidth / stageWidth, windowHeight / stageHeight);
}