import { Image } from '../resources/image';
import { Body } from '../engine/physics';

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
    cubeHeight?: number,
}

export const enum Id {
    Player,
    SunFloor,
    SunCube,
    Door,
    DoorExit,
}