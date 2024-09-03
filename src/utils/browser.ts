export const domDocument = document;
export const hasTouch = 'ontouchstart' in window;
export const dpr = devicePixelRatio;

const canvasName = 'canvas';

export const getContext = (canvas: HTMLCanvasElement) => canvas.getContext('2d')!;
export const createCanvas = () => domDocument.createElement(canvasName);
export const createContext = () => getContext(createCanvas());
export const getCanvas = (context: CanvasRenderingContext2D) => context.canvas;
export const getWidth = (context: CanvasRenderingContext2D) => getCanvas(context).width;
export const getHeight = (context: CanvasRenderingContext2D) => getCanvas(context).height;
export const setWidth = (context: CanvasRenderingContext2D, width: number) => getCanvas(context).width = width;
export const setHeight = (context: CanvasRenderingContext2D, height: number) => getCanvas(context).height = height;

export const now = () => performance.now();

// export async function timeout(time: number) {
// 	return new Promise((resolve) => {
// 		setTimeout(resolve, time);
// 	})
// }
