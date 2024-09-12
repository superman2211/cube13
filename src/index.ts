import { updateAnimations } from "./engine/animation";
import { checkMagicCubePlace } from "./game/magic-cubes";
import { updateDoor } from "./game/door";
import { checkGameTimer, checkPlayerDie, game, GameState, startGame, startLevel } from "./game/game";
import { render } from "./engine/graphics";
import { initInput } from "./engine/input";
import { updatePhysics } from "./engine/physics";
import { updatePlayerDeadTime, updatePlayer } from "./game/player";
import { loadResources } from "./resources/loader";
import { calculateTime } from "./engine/time";
import { checkNextLevel } from "./game/next-level";
import { runTasks } from "./engine/tasks";
import { updateJoystick } from "./engine/joystick";
import { updateScreen } from "./engine/screen";
import { checkContinue as checkStartGame } from "./game/check-continue";
import { updateShacking } from "./engine/shaking";
import { checkHole } from "./game/check-hole";
import { updateLasers } from "./game/laser";
import { updateBackgroundSound } from "./game/background-sound";

function update() {
	calculateTime();
	updateScreen();
	updateJoystick();

	if (game.state == GameState.Game) {
		updatePlayer();
		updateLasers();
		checkMagicCubePlace();
		checkHole();
		updateDoor();
		checkNextLevel();
		checkGameTimer();
		updatePlayerDeadTime();
		checkPlayerDie();
	}

	updatePhysics();
	updateShacking();
	checkStartGame();
	runTasks();
	updateAnimations();
	updateBackgroundSound();
	render();
	requestAnimationFrame(update);
}

async function main() {
	await loadResources();
	initInput();
	update();
}

main();