import type { Position, GameState } from "../../types";

export function isPositionEqual(a: Position, b: Position): boolean {
  return a.x === b.x && a.y === b.y;
}

export function isPositionInList(pos: Position, list: Position[]): boolean {
  return list.some((p) => isPositionEqual(p, pos));
}

export function isInBounds(pos: Position, width: number, height: number): boolean {
  return pos.x >= 0 && pos.x < width && pos.y >= 0 && pos.y < height;
}

export function getRandomPosition(width: number, height: number): Position {
  return {
    x: Math.floor(Math.random() * width),
    y: Math.floor(Math.random() * height),
  };
}

export function getOccupiedPositions(state: GameState): Position[] {
  const occupied: Position[] = [...state.snake];
  occupied.push(state.food.position);
  if (state.powerUp) {
    occupied.push(state.powerUp.position);
  }
  for (const obstacle of state.obstacles) {
    occupied.push(obstacle.position);
  }
  return occupied;
}

export function getSafeRandomPosition(
  width: number,
  height: number,
  occupied: Position[],
  maxAttempts = 1000,
): Position | null {
  for (let i = 0; i < maxAttempts; i++) {
    const pos = getRandomPosition(width, height);
    if (!isPositionInList(pos, occupied)) {
      return pos;
    }
  }

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const pos = { x, y };
      if (!isPositionInList(pos, occupied)) {
        return pos;
      }
    }
  }

  return null;
}
