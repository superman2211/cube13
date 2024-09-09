import { updateAnimations } from "./engine/animation";
import { checkCubePlace } from "./game/cube-place";
import { updateDoor } from "./game/door";
import { checkGameTimer, game, GameState, startGame } from "./game/game";
import { render } from "./engine/graphics";
import { initInput } from "./engine/input";
import { updatePhysics } from "./engine/physics";
import { updatePlayer } from "./game/player";
import { loadResources } from "./resources/loader";
import { calculateTime } from "./engine/time";
import { checkNextLevel } from "./game/next-level";
import { runNextTask } from "./engine/tasks";
import { updateJoystick } from "./engine/joystick";
import { updateScreen } from "./engine/screen";

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