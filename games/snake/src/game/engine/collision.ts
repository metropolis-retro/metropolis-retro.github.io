import type { Position, GameState, GameConfig } from "../../types";
import { isPositionEqual, isInBounds, isPositionInList } from "./grid";

export interface CollisionResult {
  wall: boolean;
  self: boolean;
  food: boolean;
  powerUp: boolean;
  obstacle: boolean;
}

export function checkCollisions(newHead: Position, state: GameState, config: GameConfig): CollisionResult {
  const food = checkFoodCollision(newHead, state);
  return {
    wall: checkWallCollision(newHead, config),
    self: checkSelfCollision(newHead, state, food),
    food,
    powerUp: checkPowerUpCollision(newHead, state),
    obstacle: checkObstacleCollision(newHead, state),
  };
}

function checkWallCollision(pos: Position, config: GameConfig): boolean {
  return !isInBounds(pos, config.gridWidth, config.gridHeight);
}

function checkSelfCollision(pos: Position, state: GameState, includeTail: boolean): boolean {
  const bodyToCheck = includeTail ? state.snake : state.snake.slice(0, -1);
  return isPositionInList(pos, bodyToCheck);
}

function checkFoodCollision(pos: Position, state: GameState): boolean {
  return isPositionEqual(pos, state.food.position);
}

function checkPowerUpCollision(pos: Position, state: GameState): boolean {
  if (!state.powerUp) return false;
  return isPositionEqual(pos, state.powerUp.position);
}

function checkObstacleCollision(pos: Position, state: GameState): boolean {
  if (!state.obstaclesEnabled) return false;
  return state.obstacles.some((o) => isPositionEqual(pos, o.position));
}
