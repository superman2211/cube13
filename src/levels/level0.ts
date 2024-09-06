import { border, cells, cellSize, cellSizeHalf } from "../config";
import { box, Box } from "../geom/box";
import { box0, box1, box2, box3, door0, floor0, floor1, floor2, floor3, floor4, floor5, man0, man5, man8, roof0, roof1, roof2, wall0, wall1, wall2, wall3, wall5, wall7, wall8, wall9 } from "../resources/ids";
import { Body } from "../physics";
import { Cube, CubeInfo, Id } from "../cube";
import { halfDown, rotate180, rotate270, rotate90 } from "../geom/transform";

const staticBody: Body = { isStatic: true, box: box(0, 0, cellSize, cellSize) };
const dynamicBody: Body = { box: box(0, 0, cellSize, cellSize) };
const playerBody: Body = { box: box(3, 10, cellSize - 7, cellSize - 9) };

export function level0(cubes: Cube[]) {
    cubes.splice(0, cubes.length);

    let types: { [key: string]: CubeInfo } = {
        A: { front: { id: wall8 }, top: { id: roof0 } }, // top
        T: { front: { id: wall9 }, top: { id: roof0 }, id: Id.DoorExit }, // top exit
        Y: { front: { id: wall0 }, body: staticBody }, // top

        C: { top: { id: roof1 } }, // left top
        K: { top: { id: roof1, transformation: rotate90 } }, // right top

        D: { top: { id: roof0, transformation: rotate270 } }, // left
        E: { top: { id: roof0, transformation: rotate90 } }, // right

        F: { top: { id: floor0 } }, // floor
        G: { top: { id: floor1 } }, // floor
        P: { top: { id: floor2 } }, // floor
        R: { top: { id: floor3 }, id: Id.SunFloor }, // floor
        S: { top: { id: floor5 } }, // floor

        U: { front: { id: wall8 }, body: staticBody }, // left-right bottom
        H: { front: { id: wall8 }, top: { id: roof0, transformation: rotate270 } }, // left bottom 2
        I: { front: { id: wall8 }, top: { id: roof0, transformation: rotate90 } }, // right bottom 2

        J: { front: { id: door0 }, top: { id: roof0 }, body: staticBody, id: Id.Door }, // door

        L: { front: { id: wall0 }, top: { id: roof2 }, body: staticBody }, // wall
        M: { front: { id: wall1 }, top: { id: roof2, transformation: rotate90 }, body: staticBody }, // wall
        N: { front: { id: wall2 }, top: { id: roof2, transformation: rotate180 }, body: staticBody }, // wall
        O: { front: { id: wall3 }, top: { id: roof2, transformation: rotate270 }, body: staticBody }, // wall

        X: { body: staticBody }, // empty physics block

        a: { body: dynamicBody, front: { id: box0 }, top: { id: box1 }, cubeHeight: cellSizeHalf }, // box
        b: { body: dynamicBody, front: { id: box2 }, top: { id: box3 }, cubeHeight: cellSizeHalf, id: Id.SunCube }, // sun box
        u: { body: playerBody, front: { id: man8 }, id: Id.Player },
    };

    let layers = [
        [
            '       S       ',
            ' FFFFFFFFFFFFF ',
            ' FFPFFFFFFFRFF ',
            ' FFFFFFGGGFFFF ',
            ' FFFFFFFFFFFFF ',
            ' FFFGFFFFFFFFF ',
            ' FFFFFFFFFFFFF ',
            ' FFFFFFFFFFFFF ',
            ' FFFFFFGGGFFFF ',
            ' FFFFFFFFFFFFF ',
            ' FFFGFFFFFFFFF ',
            ' FFFGFFFPFFFFF ',
            ' FFFGFFFFFFFFF ',
            ' FFFGFFFFFFPFF ',
        ],
        [
            ' YYYYYYJYYYYYY ',
            'X             X',
            'X             X',
            'X             X',
            'X    LMNOL    X',
            'X        L    X',
            'X        O    X',
            'X      LMN    X',
            'XLMNOLMN      X',
            'X         b   X',
            'X             X',
            'X    aa       X',
            'X             X',
            'U      u      U',
            ' XXXXXXXXXXXXX ',
        ],
        [
            'CAAAAAATAAAAAAK',
            'D             E',
            'D             E',
            'D             E',
            'D             E',
            'D             E',
            'D             E',
            'D             E',
            'D             E',
            'D             E',
            'D             E',
            'D             E',
            'D             E',
            'H             I',
        ]
    ];

    let z = 0;

    for (const layer of layers) {
        let x = 0;
        let y = 0;

        for (const row of layer) {
            for (const s of row) {
                if (s !== ' ') {
                    let type = types[s];
                    cubes.push({ x, y, z, info: type });
                }

                x += cellSize;
            }

            x = 0;
            y += cellSize;
        }

        z += cellSize;
    }
}