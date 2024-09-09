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
export const resetTransform = (context: CanvasRenderingContext2D) => context.resetTransform();
export const drawImage = (context: CanvasRenderingContext2D, image: HTMLCanvasElement, x: number, y: number) => context.drawImage(image, x, y);
export const clear = (context: CanvasRenderingContext2D) => { resetTransform(context); context.clearRect(0, 0, getWidth(context), getHeight(context)); }

export const now = () => performance.now();

export const cloneObject = (source: any): any => JSON.parse(JSON.stringify(source));

export async function timeout(time: number) {
    return new Promise((resolve) => {
        setTimeout(resolve, time);
    })
}
