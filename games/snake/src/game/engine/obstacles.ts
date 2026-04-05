import type { Obstacle, GameConfig, Position } from "../../types";
import { getSafeRandomPosition } from "./grid";

export function generateObstacles(
  config: GameConfig,
  occupied: Position[],
): Obstacle[] {
  if (!config.obstaclesEnabled) return [];

  const obstacles: Obstacle[] = [];
  const allOccupied = [...occupied];

  for (let i = 0; i < config.obstacleCount; i++) {
    const position = getSafeRandomPosition(config.gridWidth, config.gridHeight, allOccupied);
    if (position) {
      obstacles.push({ position });
      allOccupied.push(position);
    }
  }

  return obstacles;
}
