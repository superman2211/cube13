export const domDocument = document;
export const hasTouch = 'ontouchstart' in window;
export const dpr = devicePixelRatio;

export function getContext(canvas: HTMLCanvasElement): CanvasRenderingContext2D {
	return canvas.getContext('2d')!;
}

export function createCanvas() {
	return domDocument.createElement('canvas');
}

export function createContext() {
	return getContext(createCanvas());
}

// export async function timeout(time: number) {
// 	return new Promise((resolve) => {
// 		setTimeout(resolve, time);
// 	})
// }
