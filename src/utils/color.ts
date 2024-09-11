export const colorToString = (color: number): string => {
    const a = ((color >> 24) & 0xff) / 0xff;
    const r = (color >> 16) & 0xff;
    const g = (color >> 8) & 0xff;
    const b = color & 0xff;

    return `rgba(${r},${g},${b},${a})`;
}