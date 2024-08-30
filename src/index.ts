import { cells, cellSize } from "./config";
import { Data } from "./data";
import { brightness, colorTransformConcat, tint } from "./resources/color";
import { floor0, floor1, floor2, man0 } from "./resources/ids";
import { getImage } from "./resources/images";
import { loadResources } from "./resources/loader";
import { createContext2d, dpr, getContext2d } from "./utils/browser";

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


	const floorColorTransform = tint(0xff508CCC, 0.5);

	const floors = [floor0, floor1, floor2, floor0];
	let f = 0;

	for (let y = 0; y < cells; y++) {
		for (let x = 0; x < cells; x++) {
			const colorTransform = colorTransformConcat(
				brightness(1.0 - x / cells), floorColorTransform
			);
			let image = getImage(floors[f++ % floors.length], colorTransform);
			world.drawImage(image, x * cellSize, y * cellSize);
		}
	}

	for (let y = 3; y < 5; y++) {
		for (let x = 0; x < cells; x++) {
			let image = getImage(man0, brightness(1.0 - x / cells));
			world.drawImage(image, x * cellSize, y * cellSize);
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
	world.canvas.width = cellSize * cells;
	world.canvas.height = cellSize * cells;

	const screen = getContext2d(document.getElementById('c') as HTMLCanvasElement);

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