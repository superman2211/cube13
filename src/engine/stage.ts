import { Cube, Id } from "../game/cube";

export const cubes: Cube[] = [];

export const getCube = (id: Id): Cube | undefined => cubes.find((c) => c.info.id === id);

export const removeCube = (cube: Cube) => cubes.splice(cubes.indexOf(cube), 1);
