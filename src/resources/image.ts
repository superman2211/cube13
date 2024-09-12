import { Transform } from "../geom/transform";

export interface Image {
    id: number,
    transformation?: Transform,
    brigthness?: number,
    alpha?: number,
}
