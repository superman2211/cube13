import { mathHypot } from "../utils/math";

export interface Point {
	x: number,
	y: number,
}

export const point = (x: number = 0, y: number = 0): Point => ({ x, y });

export const vector = (start: Point, end: Point): Point => ({ x: end.x - start.x, y: end.y - start.y });

export const pointDistanceSquared = (p0: Point, p1: Point): number => {
	const dx = p0.x - p1.x;
	const dy = p0.y - p1.y;
	return dx * dx + dy * dy;
}

export const pointDistance = (p0: Point, p1: Point): number => mathHypot(p0.x - p1.x, p0.y - p1.y);

export const pointLength = (point: Point): number => mathHypot(point.x, point.y);

export const pointLengthSquared = (p: Point): number => p.x * p.x + p.y * p.y;

export const pointNormalize = (point: Point, thickness: number) => {
	let value = pointLength(point);
	if (value > 0) {
		value = thickness / value;
		point.x *= value;
		point.y *= value;
	}
}

export const pointCopy = (source: Point, target: Point) => {
	target.x = source.x;
	target.y = source.y;
}

export const pointAdd = (p0: Point, p1: Point) => {
	p0.x += p1.x;
	p0.y += p1.y;
}