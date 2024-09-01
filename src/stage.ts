export interface Stage {
    cubes: Cube[]
}

export interface Cube {
    x: number,
    y: number,
    z: number,
    t: CubeType
}

export interface CubeType {
    f?: number,
    t?: number,
}