import { updateAnimations } from "./animation";
import { checkCubePlace } from "./cube-place";
import { updateDoor } from "./door";
import { checkGameTimer, game, GameState, startGame } from "./game";
import { render } from "./graphics";
import { initInput } from "./input";
import { updatePhysics } from "./physics";
import { updatePlayer } from "./player";
import { loadResources } from "./resources/loader";
import { calculateTime } from "./time";
import { checkNextLevel } from "./next-level";
import { runNextTask } from "./tasks";
import { updateJoystick } from "./joystick";
import { updateScreen } from "./screen";

function update() {
	calculateTime();
	updateScreen();
	updateJoystick();

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
	startGame();
	update();
}

main();