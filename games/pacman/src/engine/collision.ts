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
  GHOST_HOUSE_CENTER,
} from "./constants";
import { resetPositions } from "./gameState";
import { playEatPellet, playEatPower, playEatGhost, playDeath, playGameOver, playWin } from "./sound";

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
    playEatPellet();
  } else if (tile === TILE_POWER) {
    grid[row][col] = TILE_EMPTY;
    state.score += POWER_SCORE;
    state.pelletsLeft--;
    state.powerTimer = POWER_DURATION;
    playEatPower();

    for (const ghost of state.ghosts) {
      ghost.scared = true;
      ghost.scaredTimer = POWER_DURATION;
    }
  }

  if (state.pelletsLeft <= 0) {
    state.status = GameStatus.Win;
    playWin();
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
        ghost.x = GHOST_HOUSE_CENTER.x;
        ghost.y = GHOST_HOUSE_CENTER.y;
        ghost.px = GHOST_HOUSE_CENTER.x * TILE_SIZE;
        ghost.py = GHOST_HOUSE_CENTER.y * TILE_SIZE;
        playEatGhost();
      } else {
        if (!state.cheats.infiniteLives) {
          state.lives--;
          if (state.lives <= 0) {
            state.status = GameStatus.GameOver;
            playGameOver();
            return;
          }
        }
        playDeath();
        resetPositions(state);
        return;
      }
    }
  }
}
