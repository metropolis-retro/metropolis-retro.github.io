import type { Food, Position, GameState, GameConfig } from "../../types";
import { getOccupiedPositions, getSafeRandomPosition } from "./grid";

function createFood(gridWidth: number, gridHeight: number, occupied: Position[]): Food {
  const position = getSafeRandomPosition(gridWidth, gridHeight, occupied)
    ?? { x: Math.floor(gridWidth / 2), y: 0 };
  return { position, spawnTime: performance.now() };
}

export function spawnFood(state: GameState, config: GameConfig): Food {
  return createFood(config.gridWidth, config.gridHeight, getOccupiedPositions(state));
}

export function createInitialFood(config: GameConfig, snakePositions: Position[]): Food {
  return createFood(config.gridWidth, config.gridHeight, snakePositions);
}
