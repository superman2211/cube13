import { updateAnimations } from "./animation";
import { checkCubePlace } from "./cube-place";
import { updateDoor } from "./door";
import { start } from "./game";
import { render } from "./graphics";
import { initInput } from "./input";
import { updatePhysics } from "./physics";
import { updatePlayer } from "./player";
import { generateImages } from "./resources/images";
import { loadResources } from "./resources/loader";
import { calculateTime } from "./time";
import { checkNextLevel } from "./next-level";
import { checkGameTimer } from "./timer";

function update() {
	calculateTime();
	updatePlayer();
	updatePhysics();
	checkCubePlace();
	updateDoor();
	updateAnimations();
	checkNextLevel();
	checkGameTimer();
	render();
	requestAnimationFrame(update);
}

async function main() {
	await loadResources();
	generateImages();
	initInput();
	start();
	update();
}

main();