import { border, cells, cellSize } from "../config";
import { door0, floor0, floor1, floor2, man0, man5, roof0, roof1, roof2, wall0, wall1, wall2, wall3, wall5, wall7 } from "../resources/ids";
import { Cube, CubeInfo, rotate180, rotate270, rotate90 } from "../stage";

export function level0(cubes: Cube[]) {
    cubes.splice(0, cubes.length);

    let types: { [key: string]: CubeInfo } = {
        A: { front: { id: wall0 }, top: { id: roof0 } }, // top

        C: { top: { id: roof1 } }, // left top
        K: { top: { id: roof1, transformation: rotate90 } }, // right top

        D: { top: { id: roof0, transformation: rotate270 } }, // left
        E: { top: { id: roof0, transformation: rotate90 } }, // right

        F: { top: { id: floor0 } },
        G: { top: { id: floor1 } },

        H: { front: { id: wall1 }, top: { id: roof0, transformation: rotate270 } }, // left bottom 
        I: { front: { id: wall1 }, top: { id: roof0, transformation: rotate90 } }, // right bottom

        J: { front: { id: door0 }, top: { id: roof0 } }, // door

        L: { front: { id: wall0 }, top: { id: roof2 } }, // wall
        M: { front: { id: wall1 }, top: { id: roof2, transformation: rotate90 } }, // wall
        N: { front: { id: wall2 }, top: { id: roof2, transformation: rotate180 } }, // wall
        O: { front: { id: wall3 }, top: { id: roof2, transformation: rotate270 } }, // wall
    };

    let layers = [
        [
            '               ',
            ' FFFFFFFFFFFFF ',
            ' FFFFFFFFFFFFF ',
            ' FFFFFFGGGFFFF ',
            ' FFFFFFFFFFFFF ',
            ' FFFGFFFFFFFFF ',
            ' FFFFFFFFFFFFF ',
            ' FFFFFFFFFFFFF ',
            ' FFFFFFGGGFFFF ',
            ' FFFFFFFFFFFFF ',
            ' FFFGFFFFFFFFF ',
            ' FFFGFFFFFFFFF ',
            ' FFFGFFFFFFFFF ',
            ' FFFGFFFFFFFFF ',
        ],
        [
            'CAAAAAAJAAAAAAK',
            'D             E',
            'D             E',
            'D             E',
            'D    MLONM    E',
            'D        L    E',
            'D        O    E',
            'D      LMN    E',
            'DLMNOLMN      E',
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

                    if (type.front || type.top) {
                        cubes.push({ x, y, z, info: type });
                    }
                }

                x += cellSize;
            }

            x = 0;
            y += cellSize;
        }

        z += cellSize;
    }

    cubes.push({ x: Math.ceil(cellSize * 4.6), y: Math.ceil(cellSize * 5.6), z: cellSize, info: { front: { id: man0 } } });

    cubes.push({ x: cellSize * 4, y: Math.ceil(cellSize * 8.6), z: cellSize, id: 0, info: { front: { id: man5 } } });
}