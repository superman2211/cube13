import { cellSize } from "./config";
import { Box } from "./geom/box";
import { Point } from "./geom/point";

export const cubes: Cube[] = [];

export interface Cube {
    x: number,
    y: number,
    z: number,
    id?: number
    info: CubeInfo,
}

export interface CubeInfo {
    body?: Body,
    front?: Image,
    top?: Image,
}

export interface Body {
    static?: boolean,
    box: Box,
}

export interface Transform {
    a: number, b: number, c: number, d: number, e: number, f: number
}

export interface Image {
    id: number,
    transformation?: Transform
}

export const identity: Transform = { a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 };
export const halfDown: Transform = { a: 1, b: 0, c: 0, d: 1, e: 0, f: cellSize / 2 };
export const rotate90: Transform = { a: 0, b: 1, c: -1, d: 0, e: cellSize, f: 0 };
export const rotate180: Transform = { a: -1, b: 0, c: 0, d: -1, e: cellSize, f: cellSize };
export const rotate270: Transform = { a: 0, b: -1, c: 1, d: 0, e: 0, f: cellSize };