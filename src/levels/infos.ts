import { cellSize, cellSizeHalf } from "../config";
import { box, } from "../geom/box";
import { box0, box1, box2, box3, door0, floor0, floor1, floor2, floor3, floor5, man8, roof0, roof1, roof2, wall0, wall1, wall11, wall12, wall2, wall3, wall8, wall9 } from "../resources/ids";
import { Body } from "../physics";
import { CubeInfo, Id } from "../cube";
import { rotate180, rotate270, rotate90 } from "../geom/transform";

const staticBody: Body = { isStatic: true, box: box(0, 0, cellSize, cellSize) };
const dynamicBody: Body = { box: box(0, 0, cellSize, cellSize) };
const playerBody: Body = { box: box(3, 10, cellSize - 7, cellSize - 9) };

export const infos: { [key: string]: CubeInfo } = {
    A: { front: { id: wall8 }, top: { id: roof0 } }, // top
    Y: { front: { id: wall0 }, body: staticBody }, // top

    C: { top: { id: roof1 } }, // left top
    K: { top: { id: roof1, transformation: rotate90 } }, // right top

    D: { top: { id: roof0, transformation: rotate270 } }, // left
    E: { top: { id: roof0, transformation: rotate90 } }, // right

    F: { top: { id: floor0 }, front: { id: wall12 } }, // floor
    G: { top: { id: floor1 }, front: { id: wall12 } }, // floor
    P: { top: { id: floor2 }, front: { id: wall12 } }, // floor
    S: { top: { id: floor5 }, front: { id: wall12 } }, // floor
    W: { front: { id: wall12 } }, // floor

    U: { front: { id: wall11 }, body: staticBody }, // left-right bottom
    H: { front: { id: wall11 }, top: { id: roof0, transformation: rotate270 } }, // left bottom 2
    I: { front: { id: wall11 }, top: { id: roof0, transformation: rotate90 } }, // right bottom 2

    L: { front: { id: wall0 }, top: { id: roof2 }, body: staticBody }, // wall
    M: { front: { id: wall1 }, top: { id: roof2, transformation: rotate90 }, body: staticBody }, // wall
    N: { front: { id: wall2 }, top: { id: roof2, transformation: rotate180 }, body: staticBody }, // wall
    O: { front: { id: wall3 }, top: { id: roof2, transformation: rotate270 }, body: staticBody }, // wall

    X: { body: staticBody }, // empty physics block

    // dynamic

    a: { body: dynamicBody, front: { id: box0 }, top: { id: box1 }, cubeHeight: cellSizeHalf }, // box
    b: { body: dynamicBody, front: { id: box2 }, top: { id: box3 }, cubeHeight: cellSizeHalf, id: Id.SunCube }, // sun box

    u: { body: playerBody, front: { id: man8 }, id: Id.Player }, // user player

    s: { top: { id: floor3 }, id: Id.SunFloor }, // floor

    t: { front: { id: wall9 }, top: { id: roof0 }, id: Id.DoorExit }, // top exit
    d: { front: { id: door0 }, top: { id: roof0 }, body: staticBody, id: Id.Door }, // door
};
