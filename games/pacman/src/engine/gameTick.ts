import { type GameState, GameStatus, Direction } from "./types";
import {
  PACMAN_SPEED,
  GHOST_SPEED,
  GHOST_SCARED_SPEED,
  TILE_SIZE,
  DIR_VECTORS,
  COLS,
  ROWS,
} from "./constants";
import { moveEntity, tryChangeDirection } from "./movement";
import {
  decideGhostDirection,
  isInGhostHouse,
  moveOutOfHouse,
} from "./ghostAI";
import { handlePelletCollision, handleGhostCollision } from "./collision";

export function tick(state: GameState, dt: number): void {
  if (state.status !== GameStatus.Playing) return;

  const clampedDt = Math.min(dt, 0.05);

  if (state.nextDirection !== null) {
    if (
      tryChangeDirection(
        state.pacman,
        state.nextDirection,
        state.grid,
        false
      )
    ) {
      state.nextDirection = null;
    }
  }

  moveEntity(state.pacman, state.grid, PACMAN_SPEED, clampedDt, false);

  handlePelletCollision(state);
  if (state.status !== GameStatus.Playing) return;

  if (state.powerTimer > 0) {
    state.powerTimer -= clampedDt * 1000;
    if (state.powerTimer <= 0) {
      state.powerTimer = 0;
      for (const ghost of state.ghosts) {
        ghost.scared = false;
        ghost.scaredTimer = 0;
      }
    }
  }

  const occupiedTiles = new Set<string>();
  for (const ghost of state.ghosts) {
    occupiedTiles.add(`${ghost.x},${ghost.y}`);
  }

  const reservedNextTiles = new Set<string>();
  const blinky = state.ghosts[0];
  for (const ghost of state.ghosts) {
    const prevTileKey = `${ghost.x},${ghost.y}`;
    occupiedTiles.delete(prevTileKey);

    if (ghost.scared) {
      ghost.scaredTimer -= clampedDt * 1000;
      if (ghost.scaredTimer <= 0) {
        ghost.scared = false;
        ghost.scaredTimer = 0;
      }
    }

    const atCenter =
      Math.abs(ghost.px - ghost.x * TILE_SIZE) < 1 &&
      Math.abs(ghost.py - ghost.y * TILE_SIZE) < 1;

    if (isInGhostHouse(ghost, state.grid)) {
      moveOutOfHouse(ghost, state.grid);
    } else if (atCenter) {
      decideGhostDirection(
        ghost,
        state.pacman,
        blinky,
        state.grid,
        reservedNextTiles,
        occupiedTiles
      );
      const { dx, dy } = DIR_VECTORS[ghost.direction];
      let nextCol = ghost.x + dx;
      const nextRow = ghost.y + dy;
      if (nextCol < 0) nextCol = COLS - 1;
      if (nextCol >= COLS) nextCol = 0;
      if (nextRow >= 0 && nextRow < ROWS) {
        reservedNextTiles.add(`${nextCol},${nextRow}`);
      }
    }

    const baseSpeed = state.cheats.slowGhosts ? GHOST_SPEED * 0.35 : GHOST_SPEED;
    const speed = ghost.scared ? GHOST_SCARED_SPEED : baseSpeed;
    moveEntity(ghost, state.grid, speed, clampedDt, true);

    const nextTileKey = `${ghost.x},${ghost.y}`;
    occupiedTiles.add(nextTileKey);
  }

  handleGhostCollision(state);
}

export { Direction };
