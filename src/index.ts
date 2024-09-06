import { updateAnimations } from "./animation";
import { checkCubePlace } from "./cube-place";
import { updateDoor } from "./door";
import { render } from "./graphics";
import { initInput } from "./input";
import { level0 } from "./levels/level0";
import { getBodies, updatePhysics } from "./physics";
import { initPlayer, updatePlayer } from "./player";
import { generateImages } from "./resources/images";
import { loadResources } from "./resources/loader";
import { cubes } from "./stage";
import { calculateTime } from "./time";

function update() {
	calculateTime();
	updatePlayer();
	updatePhysics();
	checkCubePlace();
	updateDoor();
	updateAnimations();
	render();
	requestAnimationFrame(update);
}

function initStage() {
	level0(cubes);
	getBodies();
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