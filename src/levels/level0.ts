import { border, cells, cellSize } from "../config";
import { door0, floor0, floor1, floor2, man0, man5, roof0, roof1, roof2, roof3, roof4, roof5, roof6, wall0, wall1, wall2, wall5, wall7 } from "../resources/ids";
import { Cube, CubeType, Stage } from "../stage";

export function level0(): Stage {
    const cubes: Cube[] = [];

    let types: { [key: string]: CubeType } = {
        A: { f: wall0, t: roof0 }, // top
        B: { f: wall1, t: roof1 }, // top
        
        C: { t: roof4 }, // left top
        K: { t: roof5 }, // right top
        
        D: { t: roof2 }, // left
        E: { t: roof3 }, // right

        F: { t: floor0 },
        G: { t: floor1 },
        
        H: { f: wall1, t: roof2 }, // left bottom 
        I: { f: wall1, t: roof3 }, // right bottom
        
        J: { f: door0, t: roof0 }, // door

        L: { f: wall0, t: roof6 }, // wall
        
        M: { t: floor2 },
    };

    let layers = [
        [
            '               ',
            ' FFFFFFFFFFFFF ',
            ' FFFFFFFFFFFFF ',
            ' FMFFFFGGGFFFF ',
            ' FFFMFFFFFFFFF ',
            ' FFFGFFFFFFFFF ',
            ' FFFFFFFFFFFFF ',
            ' FFFFFFFFFFFFF ',
            ' FMFFFFGGGFFFF ',
            ' FFFFFFFFFMFFF ',
            ' FFFGFFFFFFFFF ',
            ' FFFGFFFFFFFFF ',
            ' FFFGFFFFFFFFF ',
            ' FFFGFFFFFFFFF ',
        ],
        [
            'CAABBABJAABAAAK',
            'D             E',
            'D             E',
            'D             E',
            'D    LLLLL    E',
            'D        L    E',
            'D        L    E',
            'D      LLL    E',
            'DLLLLLLL      E',
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

                    if (type.f || type.t) {
                        cubes.push({ x, y, z, t: type });
                    }
                }

                x += cellSize;
            }

            x = 0;
            y += cellSize;
        }

        z += cellSize;
    }

    cubes.push({ x: Math.ceil(cellSize * 4.6), y: Math.ceil(cellSize * 5.6) , z: cellSize, t: { f: man0 } });

    cubes.push({ x: cellSize * 4, y: Math.ceil(cellSize * 8.6), z: cellSize, id: 0, t: { f: man5 } });

    return { cubes };
}