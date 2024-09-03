import { border, cells, cellSize } from "./config";
import { createContext, domDocument, getContext, setHeight, setWidth } from "./utils/browser";

export const world: CanvasRenderingContext2D = createWorld();
export const screen: CanvasRenderingContext2D = getContext(domDocument.getElementById('c') as HTMLCanvasElement);

function createWorld(): CanvasRenderingContext2D {
    const world = createContext();
    setWidth(world, cellSize * (cells + border * 2));
    setHeight(world, cellSize * (cells + border * 2));
    return world;
}
