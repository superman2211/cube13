import { DEBUG } from "../debug";
import { font0, font1, font10, font11, font12, font13, font14, font15, font16, font17, font18, font19, font2, font20, font21, font22, font23, font24, font25, font26, font27, font28, font29, font3, font30, font31, font32, font33, font34, font35, font36, font37, font4, font5, font6, font7, font8, font9 } from "./ids";

const getChars = (): number[] => {
    const chars: number[] = [];

    chars[33] = font36;
    chars[46] = font37;
    chars[47] = -1;

    chars.push(
        font0,
        font1,
        font2,
        font3,
        font4,
        font5,
        font6,
        font7,
        font8,
        font9,
    );

    chars[64] = -1;

    chars.push(
        font10,
        font11,
        font12,
        font13,
        font14,
        font15,
        font16,
        font17,
        font18,
        font19,
        font20,
        font21,
        font22,
        font23,
        font24,
        font25,
        font26,
        font27,
        font28,
        font29,
        font30,
        font31,
        font32,
        font33,
        font34,
        font35,
    );

    return chars;
}

const font = getChars();

export const getIdByCharCode = (code: number): number | undefined => {
    if (DEBUG) {
        if (code != 32 && font[code] === undefined) {
            throw `symbol not found ${code}`;
        }
    }

    return font[code];
}