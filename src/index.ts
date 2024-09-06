import { updateAnimations } from "./animation";
import { checkCubePlace } from "./cube-place";
import { updateDoor } from "./door";
import { render } from "./graphics";
import { initInput } from "./input";
import { buildLevel } from "./levels/builder";
import { level1 } from "./levels/level1";
import { updateBodies, updatePhysics } from "./physics";
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
	buildLevel(level1);
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