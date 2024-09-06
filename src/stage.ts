import { Cube, Id } from "./cube";

export const cubes: Cube[] = [];

export const getCubeById = (id: Id): Cube | undefined => cubes.find((c) => c.info.id === id);

export const removeCube = (cube: Cube) => cubes.splice(cubes.indexOf(cube), 1);
