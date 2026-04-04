import { type GameState, GameStatus } from "./types";
import {
  TILE_SIZE,
  TILE_PELLET,
  TILE_POWER,
  TILE_EMPTY,
  PELLET_SCORE,
  POWER_SCORE,
  GHOST_SCORE,
  POWER_DURATION,
} from "./constants";
import { resetPositions } from "./gameState";

const COLLISION_DIST = TILE_SIZE * 0.7;

export function handlePelletCollision(state: GameState): void {
  const { pacman, grid } = state;
  const col = pacman.x;
  const row = pacman.y;

  if (row < 0 || row >= grid.length || col < 0 || col >= grid[0].length) return;

  const tile = grid[row][col];

  if (tile === TILE_PELLET) {
    grid[row][col] = TILE_EMPTY;
    state.score += PELLET_SCORE;
    state.pelletsLeft--;
  } else if (tile === TILE_POWER) {
    grid[row][col] = TILE_EMPTY;
    state.score += POWER_SCORE;
    state.pelletsLeft--;
    state.powerTimer = POWER_DURATION;

    for (const ghost of state.ghosts) {
      ghost.scared = true;
      ghost.scaredTimer = POWER_DURATION;
    }
  }

  if (state.pelletsLeft <= 0) {
    state.status = GameStatus.Win;
  }
}

export function handleGhostCollision(state: GameState): void {
  const { pacman } = state;

  for (const ghost of state.ghosts) {
    const dx = pacman.px - ghost.px;
    const dy = pacman.py - ghost.py;
    const distSq = dx * dx + dy * dy;

    if (distSq < COLLISION_DIST * COLLISION_DIST) {
      if (ghost.scared) {
        state.score += GHOST_SCORE;
        ghost.scared = false;
        ghost.scaredTimer = 0;
        ghost.x = 14;
        ghost.y = 14;
        ghost.px = 14 * TILE_SIZE;
        ghost.py = 14 * TILE_SIZE;
      } else {
        if (!state.cheats.infiniteLives) {
          state.lives--;
          if (state.lives <= 0) {
            state.status = GameStatus.GameOver;
            return;
          }
        }
        resetPositions(state);
        return;
      }
    }
  }
}
