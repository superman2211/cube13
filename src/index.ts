import { cells, cellSize } from "./config";
import { Data } from "./data";
import { images, loadResources } from "./resources";

let data: Data;

let oldTime = performance.now();

function calculateTime(): number {
	const currentTime = performance.now();
	const time = currentTime - oldTime;
	oldTime = currentTime;
	return time / 1000;
}

function update() {
	const time = calculateTime();

	const startTime = performance.now();;

	const { world, screen } = data;

	world.clearRect(0, 0, world.canvas.width, world.canvas.height);

	let x = 0;
	let y = 0;
	let z = 0;

	for (let z = 0; z < 3; z++) {
		for (let x = 0; x < cells; x++) {
			for (let y = 0; y < cells; y++) {
				const i = (y * cells + x) % images.length;
				let image = images[i];
				world.drawImage(image, x * cellSize, y * cellSize);
			}
		}
	}

	const screenWidth = innerWidth * devicePixelRatio;
	const screenHeight = innerHeight * devicePixelRatio;

	if (screen.canvas.width != screenWidth) {
		screen.canvas.width = screenWidth;
	}

	if (screen.canvas.height != screenHeight) {
		screen.canvas.height = screenHeight;
	}

	const scale = Math.min(screen.canvas.width / world.canvas.width, screen.canvas.height / world.canvas.height);

	screen.clearRect(0, 0, screen.canvas.width, screen.canvas.height);
	screen.transform(scale, 0, 0, scale, 0, 0);
	screen.shadowBlur = 0;
	screen.imageSmoothingEnabled = false;
	screen.drawImage(world.canvas, 0, 0);

	const frameTime = (performance.now() - startTime).toFixed();
	const fps = (1 / time).toFixed();

	screen.shadowBlur = 10;
	screen.shadowColor = 'black';
	screen.fillStyle = 'white';
	screen.font = 'arial 20px';
	screen.fillText('FPS ' + fps + ' TIME ' + frameTime + ' ms', 0, 20);

	requestAnimationFrame(update);
}

function init() {
	const worldCanvas = document.createElement('canvas');
	worldCanvas.width = cellSize * cells;
	worldCanvas.height = cellSize * cells;

	const world = worldCanvas.getContext('2d')!;

	const screen = (document.getElementById('c') as HTMLCanvasElement).getContext('2d')!;

	data = {
		world,
		screen
	};
}

async function main() {
	await loadResources();
	init();
	update();
}

main();