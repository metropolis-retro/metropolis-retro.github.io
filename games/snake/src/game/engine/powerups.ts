import type { PowerUp, GameState, GameConfig } from "../../types";
import { PowerUpType } from "../../types";
import { getOccupiedPositions, getSafeRandomPosition } from "./grid";

const POWER_UP_TYPES = [PowerUpType.SlowMotion, PowerUpType.DoublePoints, PowerUpType.Phase];

export function trySpawnPowerUp(state: GameState, config: GameConfig): PowerUp | null {
  if (state.powerUp) return null;
  if (Math.random() > config.powerUpSpawnChance) return null;

  const occupied = getOccupiedPositions(state);
  const position = getSafeRandomPosition(config.gridWidth, config.gridHeight, occupied);
  if (!position) return null;

  const type = POWER_UP_TYPES[Math.floor(Math.random() * POWER_UP_TYPES.length)];
  return {
    type,
    position,
    duration: config.powerUpDuration,
    spawnTime: performance.now(),
  };
}

export function activatePowerUp(state: GameState, powerUp: PowerUp): void {
  const existing = state.activePowerUps.findIndex((p) => p.type === powerUp.type);
  const expiresAt = performance.now() + powerUp.duration;

  if (existing >= 0) {
    state.activePowerUps[existing] = { type: powerUp.type, expiresAt };
  } else {
    state.activePowerUps.push({ type: powerUp.type, expiresAt });
  }
  state.powerUp = null;
}

export function updateActivePowerUps(state: GameState): void {
  const now = performance.now();
  state.activePowerUps = state.activePowerUps.filter((p) => p.expiresAt > now);
}

export function hasPowerUp(state: GameState, type: PowerUpType): boolean {
  return state.activePowerUps.some((p) => p.type === type);
}

export function getScoreMultiplier(state: GameState): number {
  return hasPowerUp(state, PowerUpType.DoublePoints) ? 2 : 1;
}

export function getSpeedMultiplier(state: GameState): number {
  return hasPowerUp(state, PowerUpType.SlowMotion) ? 0.5 : 1;
}

export function isPhaseMode(state: GameState): boolean {
  return hasPowerUp(state, PowerUpType.Phase);
}
