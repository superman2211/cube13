import { cellSize } from "../config";
import { DEBUG } from "../debug";
import { isFloorCube } from "../game/fall-cubes";
import { brightnessQuality, getImage } from "../resources/images";
import { cubes } from "./stage";

export interface Task {
    run(): void
}

export interface GetImageBrightnessTask extends Task {
    id: number,
}

const tasks: Task[] = [];

export const prepareImagesTasks = () => {
    for (const cube of cubes) {
        if (isFloorCube(cube)) {
            const info = cube.info;
            if (info.front) {
                const task: GetImageBrightnessTask = {
                    id: info.front.id,
                    run() {
                        for (let i = 0; i < brightnessQuality; i++) {
                            getImage(this.id, i / brightnessQuality);
                        }
                    }
                };
                tasks.push(task);
            }
        }
    }

    if (DEBUG) {
        console.log(`prepareImagesTasks ${tasks.length}`);
    }
}

export const runNextTask = () => {
    const task = tasks.shift();
    if (task) {
        task.run();

        if (DEBUG && !tasks.length) {
            console.log('tasks finished');
        }
    }
}