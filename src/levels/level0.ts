import { border, cells, cellSize } from "../config";
import { door0, floor0, floor1, man0, man5, roof0, roof1, roof2, wall0, wall5 } from "../resources/ids";
import { blueFoor0, blueFoor1, violetRoof0, violetRoof1, violetRoof2, violetWall0, violetWall1 } from "../resources/images";
import { Cube, CubeType, Stage } from "../stage";

export function level0(): Stage {
    const cubes: Cube[] = [];

    let types: { [key: string]: CubeType } = {
        A: { f: violetWall0, t: violetRoof0 },
        B: { f: violetWall1, t: violetRoof1 },
        C: { t: violetRoof2 },
        D: { t: violetRoof0 },
        E: { t: violetRoof1 },
        F: { t: blueFoor0 },
        G: { t: blueFoor1 },
        J: { f: door0, t: violetRoof0 },
    };

    let layers = [`
               
 FFFFFFFFFFFFF 
 FFFFFFFFFFFFF 
 FFFFFFGGGFFFF 
 FFFFFFFFFFFFF 
 FFFGFFFFFFFFF 
 FFFFFFFFFFFFF 
 FFFFFFFFFFFFF 
 FFFFFFGGGFFFF 
 FFFFFFFFFFFFF 
 FFFGFFFFFFFFF 
 FFFGFFFFFFFFF 
 FFFGFFFFFFFFF 
 FFFGFFFFFFFFF 
`, `
CAABBABJAABAAAC
D             E
E             E
E             E
D             E
E      ABB    D
E    AAA      D
E             D
E             D
E             D
E             D
E             D
A             B
A             B
`];

    let z = 0;

    for (const layer of layers) {
        let x = 0;
        let y = 0;

        const rows = layer.split('\n');
        rows.splice(0, 1);

        for (const row of rows) {
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

    cubes.push({ x: cellSize * 5, y: cellSize * 4.5, z: cellSize, t: { f: man0 } });
    
    cubes.push({ x: cellSize * 4, y: cellSize * 7, z: cellSize, t: { f: man5 } });

    return { cubes };
}