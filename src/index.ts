import { render } from "./graphics";
import { initInput } from "./input";
import { level0 } from "./levels/level0";
import { getPhysicsObjects, updatePhysics } from "./physics";
import { initPlayer, updatePlayer } from "./player";
import { generateImages, images } from "./resources/images";
import { loadResources } from "./resources/loader";
import { cubes } from "./stage";
import { calculateTime } from "./time";

function update() {
	calculateTime();
	updatePlayer();
	updatePhysics();
	render();
	requestAnimationFrame(update);
}

function initStage() {
	level0(cubes);
	getPhysicsObjects();
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