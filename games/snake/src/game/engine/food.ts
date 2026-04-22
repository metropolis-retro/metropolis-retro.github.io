import type { Food, Position, GameState, GameConfig } from "../../types";
import { getOccupiedPositions, getSafeRandomPosition } from "./grid";

function createFood(gridWidth: number, gridHeight: number, occupied: Position[]): Food | null {
  const position = getSafeRandomPosition(gridWidth, gridHeight, occupied);
  if (!position) return null;
  return { position, spawnTime: performance.now() };
}

export function spawnFood(state: GameState, config: GameConfig): Food | null {
  return createFood(config.gridWidth, config.gridHeight, getOccupiedPositions(state));
}

export function createInitialFood(config: GameConfig, snakePositions: Position[]): Food {
  const food = createFood(config.gridWidth, config.gridHeight, snakePositions);
  if (!food) {
    throw new Error("Unable to spawn initial food: no available cells in grid.");
  }
  return food;
}
