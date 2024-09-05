import { point, Point } from "./point";

export interface Box {
    minX: number,
    minY: number,

    maxX: number,
    maxY: number,
}

export const box = (x: number, y: number, w: number, h: number): Box => ({ minX: x, minY: y, maxX: x + w, maxY: y + h });

export const boxesIntersects = (box0: Box, p0: Point, box1: Box, p1: Point): boolean =>
    box0.minX + p0.x <= box1.maxX + p1.x &&
    box0.minY + p0.y <= box1.maxY + p1.y &&
    box1.minX + p1.x <= box0.maxX + p0.x &&
    box1.minY + p1.y <= box0.maxY + p0.y;
