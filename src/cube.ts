import { Image } from './image';
import { Body } from './physics';

export interface Cube {
    x: number,
    y: number,
    z: number,
    info: CubeInfo,
}

export interface CubeInfo {
    body?: Body,
    front?: Image,
    top?: Image,
    id?: Id,
}

export enum Id {
    Player,
    SunFloor,
    SunCube,
    Door,
}