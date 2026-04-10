import { Direction, type Entity } from "./types";
import {
  TILE_SIZE,
  COLS,
  ROWS,
  TILE_WALL,
  DIR_VECTORS,
} from "./constants";

export function isWalkable(
  grid: number[][],
  col: number,
  row: number,
  _isGhost: boolean
): boolean {
  if (row >= 0 && row < ROWS && (col < 0 || col >= COLS)) return true;

  if (col < 0 || col >= COLS || row < 0 || row >= ROWS) return false;
  const tile = grid[row][col];
  if (tile === TILE_WALL) return false;
  return true;
}

export function moveEntity(
  entity: Entity,
  grid: number[][],
  speed: number,
  dt: number,
  isGhost: boolean
): boolean {
  const { dx, dy } = DIR_VECTORS[entity.direction];
  const dist = speed * dt;

  const centerPx = entity.x * TILE_SIZE;
  const centerPy = entity.y * TILE_SIZE;

  const atCenter =
    Math.abs(entity.px - centerPx) < 0.5 &&
    Math.abs(entity.py - centerPy) < 0.5;

  if (atCenter) {
    entity.px = centerPx;
    entity.py = centerPy;

    const nextCol = entity.x + dx;
    const nextRow = entity.y + dy;

    if (nextCol < 0) {
      entity.x = COLS - 1;
      entity.px = (COLS - 1) * TILE_SIZE;
      return true;
    }
    if (nextCol >= COLS) {
      entity.x = 0;
      entity.px = 0;
      return true;
    }

    if (!isWalkable(grid, nextCol, nextRow, isGhost)) {
      return false;
    }

    entity.px += dx * dist;
    entity.py += dy * dist;

    snapIfOvershot(entity, nextCol, nextRow, dx, dy);
    return true;
  }

  const nextCol = entity.x + dx;
  const nextRow = entity.y + dy;

  if (nextCol < 0) {
    entity.x = COLS - 1;
    entity.px = (COLS - 1) * TILE_SIZE;
    entity.py = centerPy;
    return true;
  }
  if (nextCol >= COLS) {
    entity.x = 0;
    entity.px = 0;
    entity.py = centerPy;
    return true;
  }

  entity.px += dx * dist;
  entity.py += dy * dist;

  snapIfOvershot(entity, nextCol, nextRow, dx, dy);
  return true;
}

function snapIfOvershot(
  entity: Entity,
  nextCol: number,
  nextRow: number,
  dx: number,
  dy: number
): void {
  const nextPx = nextCol * TILE_SIZE;
  const nextPy = nextRow * TILE_SIZE;

  const passedX =
    dx > 0 ? entity.px >= nextPx : dx < 0 ? entity.px <= nextPx : true;
  const passedY =
    dy > 0 ? entity.py >= nextPy : dy < 0 ? entity.py <= nextPy : true;

  if (passedX && passedY) {
    entity.x = nextCol;
    entity.y = nextRow;
    entity.px = nextPx;
    entity.py = nextPy;
  }
}

export function tryChangeDirection(
  entity: Entity,
  newDir: Direction,
  grid: number[][],
  isGhost: boolean
): boolean {
  const currentPx = entity.x * TILE_SIZE;
  const currentPy = entity.y * TILE_SIZE;

  const nearCenter =
    Math.abs(entity.px - currentPx) < 4 &&
    Math.abs(entity.py - currentPy) < 4;

  if (!nearCenter) return false;

  const { dx, dy } = DIR_VECTORS[newDir];
  const nextCol = ((entity.x + dx) % COLS + COLS) % COLS;
  const nextRow = entity.y + dy;

  if (!isWalkable(grid, nextCol, nextRow, isGhost)) return false;

  entity.direction = newDir;
  entity.px = currentPx;
  entity.py = currentPy;
  return true;
}
