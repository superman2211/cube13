import { cellSize } from "./config";
import { brightnessQuality, getImage } from "./resources/images";
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
        if (cube.x > 0 &&
            cube.x < cellSize * 14 &&
            cube.y > 0 &&
            cube.y < cellSize * 14
        ) {
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

    console.log(`prepareImagesTasks ${tasks.length}`);
}

export const runNextTask = () => {
    const task = tasks.shift();
    if (task) {
        task.run();

        console.log(`tasks ${tasks.length}`);
    }
}