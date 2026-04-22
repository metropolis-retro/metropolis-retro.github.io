import type { GameState, GameConfig } from "../../types";
import { GameStatus, Direction } from "../../types";
import { getInitialSnake } from "./snake";
import { createInitialFood } from "./food";
import { generateObstacles } from "./obstacles";

export function createInitialState(config: GameConfig): GameState {
  const snake = getInitialSnake(config);
  const food = createInitialFood(config, snake);
  const obstacles = generateObstacles(config, [...snake, food.position]);

  return {
    status: GameStatus.Idle,
    snake,
    direction: Direction.Left,
    nextDirection: Direction.Left,
    food,
    powerUp: null,
    activePowerUps: [],
    obstacles,
    score: 0,
    level: 1,
    speed: config.initialSpeed,
    gridWidth: config.gridWidth,
    gridHeight: config.gridHeight,
    obstaclesEnabled: config.obstaclesEnabled,
    difficulty: config.difficulty,
    lastMoveTime: 0,
    foodEaten: 0,
  };
}
