import { buildLevel, levels } from "./levels/builder"

export interface Game {
    level: number
}

export const game: Game = {
    level: 0
}

export const start = () => {
    buildLevel(game.level);
}

export const nextLevel = () => {
    game.level++;
    game.level = game.level % levels.length;
    buildLevel(game.level);
}