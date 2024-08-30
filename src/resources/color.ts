export interface ColorTransform {
    rm: number,
    gm: number,
    bm: number,
    am: number,

    ro: number,
    go: number,
    bo: number,
    ao: number,
}

export function tint(color: number, power: number): ColorTransform {
    const invertedPower = 1 - power;

    const a = (color >> 24) & 0xff;
    const r = (color >> 16) & 0xff;
    const g = (color >> 8) & 0xff;
    const b = color & 0xff;

    return {
        rm: invertedPower,
        gm: invertedPower,
        bm: invertedPower,
        am: invertedPower,

        ro: power * r,
        go: power * g,
        bo: power * b,
        ao: power * a,
    }
}

export function brightness(power: number): ColorTransform {
    return {
        rm: power,
        gm: power,
        bm: power,
        am: 1,

        ro: 0,
        go: 0,
        bo: 0,
        ao: 0,
    }
}

export function colorTransformString(ct: ColorTransform): String {
    return ct.am + '_' + ct.rm + '_' + ct.gm + '_' + ct.bm + '_' +
        ct.ao + '_' + ct.ro + '_' + ct.go + '_' + ct.bo;
}

export function colorTransformConcat(ct1: ColorTransform, ct0: ColorTransform): ColorTransform {
    return {
        am: ct1.am * ct0.am,
        rm: ct1.rm * ct0.rm,
        gm: ct1.gm * ct0.gm,
        bm: ct1.bm * ct0.bm,

        ao: ct1.am * ct0.ao + ct1.ao,
        ro: ct1.rm * ct0.ro + ct1.ro,
        go: ct1.gm * ct0.go + ct1.go,
        bo: ct1.bm * ct0.bo + ct1.bo,
    }
}