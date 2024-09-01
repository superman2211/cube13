import { border, cells, cellSize } from "./config";
import { Data } from "./data";
import { level0 } from "./levels/level0";
import { generateImages, images } from "./resources/images";
import { loadResources } from "./resources/loader";
import { Cube } from "./stage";
import { createContext2d, dpr, getContext2d } from "./utils/browser";

let data: Data;

let oldTime = performance.now();

function calculateTime(): number {
	const currentTime = performance.now();
	const time = currentTime - oldTime;
	oldTime = currentTime;
	return time / 1000;
}

function sortCubes(c0: Cube, c1: Cube): number {
	return (c0.y + c0.z) - (c1.y + c1.z);
}

function update() {
	const time = calculateTime();

	const startTime = performance.now();;

	const { world, screen } = data;

	world.clearRect(0, 0, world.canvas.width, world.canvas.height);

	const offsetX = 0;
	const offsetY = cellSize * 2;

	data.stage.cubes.sort(sortCubes);

	for (let cube of data.stage.cubes) {
		const x = cube.x + offsetX;
		const y = cube.y + offsetY;
		const z = cube.z;
		const type = cube.t;
		if (type.f !== undefined) {
			let image = images[type.f];
			world.drawImage(image, x, y - z);
		}
		if (type.t !== undefined) {
			let image = images[type.t];
			world.drawImage(image, x, y - z - cellSize);
		}
	}

	const screenWidth = innerWidth * dpr;
	const screenHeight = innerHeight * dpr;

	if (screen.canvas.width != screenWidth) {
		screen.canvas.width = screenWidth;
	}

	if (screen.canvas.height != screenHeight) {
		screen.canvas.height = screenHeight;
	}

	const scale = Math.min(screen.canvas.width / world.canvas.width, screen.canvas.height / world.canvas.height);

	screen.clearRect(0, 0, screen.canvas.width, screen.canvas.height);
	screen.setTransform(scale, 0, 0, scale, 0, 0);
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
	const world = createContext2d();
	world.canvas.width = cellSize * (cells + border * 2);
	world.canvas.height = cellSize * (cells + border * 2);

	const screen = getContext2d(document.getElementById('c') as HTMLCanvasElement);

	const stage = level0();

	data = {
		world,
		screen,
		stage,
	};
}

async function main() {
	await loadResources();
	generateImages();
	init();
	update();
}

main();