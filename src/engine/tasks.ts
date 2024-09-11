import { cellSize } from "../config";
import { DEBUG } from "../debug";
import { isFloorCube } from "../game/fall-cubes";
import { brightnessQuality, getImage } from "../resources/images";
import { now } from "../utils/browser";
import { cubes } from "./stage";

export interface Task {
    run(): void
}

export interface GetImageBrightnessTask extends Task {
    id: number,
    brightness: number,
}

const tasks: Task[] = [];

export const prepareImagesTasks = () => {
    for (const cube of cubes) {
        if (isFloorCube(cube)) {
            const info = cube.info;
            if (info.front) {
                for (let i = 0; i < brightnessQuality; i++) {
                    const task: GetImageBrightnessTask = {
                        id: info.front.id,
                        brightness: i / brightnessQuality,
                        run() {
                            getImage(this.id, this.brightness);
                        }
                    };
                    tasks.push(task);
                }
            }
        }
    }

    if (DEBUG) {
        console.log(`add images tasks ${tasks.length}`);
    }
}

export const runTasks = () => {
    const startTime = now();

    while (tasks.length) {
        const task = tasks.shift()!;
        task.run();

        if (DEBUG && !tasks.length) {
            console.log('all tasks finished');
        }

        if (now() - startTime > 1) {
            break;
        }
    }
}

export const tasksCount = (): number => tasks.length;