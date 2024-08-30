export const domDocument = document;
export const hasTouch = 'ontouchstart' in window;
export const dpr = devicePixelRatio;

export function getContext2d(canvas: HTMLCanvasElement): CanvasRenderingContext2D {
	return canvas.getContext('2d')!;
}

export function createContext2d() {
	return getContext2d(domDocument.createElement('canvas'));
}

// export async function timeout(time: number) {
// 	return new Promise((resolve) => {
// 		setTimeout(resolve, time);
// 	})
// }
