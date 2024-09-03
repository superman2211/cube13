import { border, cells, cellSize } from "./config";
import { world, screen } from "./graphics";
import { initInput, isKeyPressed, KEY_DOWN, KEY_LEFT, KEY_RIGHT, KEY_UP } from "./input";
import { level0 } from "./levels/level0";
import { initPlayer, updatePlayer } from "./player";
import { generateImages, images } from "./resources/images";
import { loadResources } from "./resources/loader";
import { Cube, cubes, identity, Image } from "./stage";
import { createContext, domDocument, dpr, getCanvas, getContext, getHeight, getWidth, now, setHeight, setWidth } from "./utils/browser";
import { mathMin } from "./utils/math";

let oldTime = now();

function calculateTime(): number {
	const currentTime = now();
	const time = currentTime - oldTime;
	oldTime = currentTime;
	return time / 1000;
}

function sortCubes(c0: Cube, c1: Cube): number {
	return (c0.y + c0.z) - (c1.y + c1.z);
}

function update() {
	const time = calculateTime();

	const startTime = now();

	updatePlayer(time);

	const worldWidth = getWidth(world);
	const worldHeight = getHeight(world);
	const worldCanvas = getCanvas(world);

	world.clearRect(0, 0, worldWidth, worldHeight);

	const offsetX = 0;
	const offsetY = cellSize * 2;

	cubes.sort(sortCubes);

	for (let cube of cubes) {
		const x = cube.x + offsetX;
		const y = cube.y + offsetY - cube.z;
		const type = cube.info;
		drawImage(world, x, y, type.front);
		drawImage(world, x, y - cellSize, type.top);
	}

	const windowWidth = innerWidth * dpr;
	const windowHeight = innerHeight * dpr;

	if (getWidth(screen) != windowWidth) {
		setWidth(screen, windowWidth);
	}

	if (getHeight(screen) != windowHeight) {
		setHeight(screen, windowHeight);
	}

	const screenWidth = getWidth(screen);
	const screenHeight = getHeight(screen);

	const scale = mathMin(screenWidth / worldWidth, screenHeight / worldHeight);

	screen.clearRect(0, 0, screenWidth, screenHeight);
	screen.setTransform(scale, 0, 0, scale, 0, 0);
	screen.shadowBlur = 0;
	screen.imageSmoothingEnabled = false;
	screen.drawImage(worldCanvas, 0, 0);

	const frameTime = (now() - startTime).toFixed();
	const fps = (1 / time).toFixed();

	screen.shadowBlur = 10;
	screen.shadowColor = 'black';
	screen.fillStyle = 'white';
	screen.font = 'arial 20px';
	screen.fillText('FPS ' + fps + ' TIME ' + frameTime + ' ms', 0, 20);

	requestAnimationFrame(update);
}

function initStage() {
	level0(cubes);
}

async function main() {
	await loadResources();
	generateImages();
	initInput();
	initStage();
	initPlayer();
	update();
}

main();

function drawImage(context: CanvasRenderingContext2D, x: number, y: number, image?: Image) {
	if (image) {
		const canvas = images[image.id];
		const transform = image.transformation || identity;
		context.setTransform(
			transform.a, transform.b, transform.c, transform.d,
			transform.e + x, transform.f + y
		);
		context.drawImage(canvas, 0, 0);
	}
}

