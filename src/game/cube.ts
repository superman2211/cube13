import { Image } from '../resources/image';
import { Body } from '../engine/physics';
import { cellSize } from '../config';

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
    WaterFloor,
    WaterCube,
    Door,
    DoorExit,
    Hole,
}

export const isRoomCube = (cube: Cube): boolean => cube.x > 0 && cube.x < cellSize * 14 && cube.y > 0 && cube.y < cellSize * 14;
export const isObjectCube = (cube: Cube): boolean => cube.z == cellSize && isRoomCube(cube);
export const isFloorCube = (cube: Cube): boolean => cube.z == 0 && isRoomCube(cube);