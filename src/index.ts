import { updateAnimations } from "./animation";
import { checkCubePlace } from "./cube-place";
import { updateDoor } from "./door";
import { checkGameTimer, game, GameState, start } from "./game";
import { render } from "./graphics";
import { initInput } from "./input";
import { updatePhysics } from "./physics";
import { updatePlayer } from "./player";
import { loadResources } from "./resources/loader";
import { calculateTime } from "./time";
import { checkNextLevel } from "./next-level";
import { runNextTask } from "./tasks";

function update() {
	calculateTime();

	if (game.state == GameState.Game) {	
		updatePlayer();
		updatePhysics();
		checkCubePlace();
		updateDoor();
		checkNextLevel();
		checkGameTimer();
	}

	runNextTask();

	updateAnimations();

	render();

	requestAnimationFrame(update);
}

async function main() {
	await loadResources();
	initInput();
	start();
	update();
}

main();