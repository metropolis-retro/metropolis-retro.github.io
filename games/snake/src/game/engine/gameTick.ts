import type { GameState, GameConfig } from "../../types";
import { GameStatus, Difficulty } from "../../types";
import { moveSnake, growSnake, advanceSnake } from "./snake";
import { spawnFood } from "./food";
import { checkCollisions } from "./collision";
import { trySpawnPowerUp, activatePowerUp, updateActivePowerUps, getScoreMultiplier, getSpeedMultiplier, isPhaseMode } from "./powerups";

export interface TickResult {
  ate: boolean;
  died: boolean;
  powerUpCollected: boolean;
  leveledUp: boolean;
}

export function gameTick(state: GameState, config: GameConfig, now: number): TickResult {
  const result: TickResult = {
    ate: false,
    died: false,
    powerUpCollected: false,
    leveledUp: false,
  };

  if (state.status !== GameStatus.Playing) return result;

  const effectiveSpeed = state.speed * getSpeedMultiplier(state);
  const interval = 1000 / effectiveSpeed * 10;

  if (now - state.lastMoveTime < interval) return result;
  state.lastMoveTime = now;

  state.direction = state.nextDirection;

  updateActivePowerUps(state);

  const newHead = moveSnake(state);
  const collisions = checkCollisions(newHead, state, config);

  if (collisions.wall || collisions.obstacle) {
    const canWrapWalls = isPhaseMode(state) || (collisions.wall && config.difficulty === Difficulty.Easy);

    if (!canWrapWalls) {
      state.status = GameStatus.GameOver;
      result.died = true;
      return result;
    }

    if (collisions.wall) {
      newHead.x = ((newHead.x % config.gridWidth) + config.gridWidth) % config.gridWidth;
      newHead.y = ((newHead.y % config.gridHeight) + config.gridHeight) % config.gridHeight;
    }
  }

  if (collisions.self) {
    if (!isPhaseMode(state)) {
      state.status = GameStatus.GameOver;
      result.died = true;
      return result;
    }
  }

  if (collisions.powerUp && state.powerUp) {
    const multiplier = getScoreMultiplier(state);
    state.score += config.powerUpScore * multiplier;
    activatePowerUp(state, state.powerUp);
    result.powerUpCollected = true;
  }

  if (collisions.food) {
    const multiplier = getScoreMultiplier(state);
    state.score += config.foodScore * multiplier;
    state.foodEaten++;
    growSnake(state, newHead);
    state.food = spawnFood(state, config);
    result.ate = true;

    if (state.foodEaten % config.levelUpThreshold === 0) {
      state.level++;
      state.speed = Math.min(
        config.maxSpeed,
        config.initialSpeed + config.speedIncrement * (state.level - 1),
      );
      result.leveledUp = true;
    }

    const powerUp = trySpawnPowerUp(state, config);
    if (powerUp) {
      state.powerUp = powerUp;
    }
  } else {
    advanceSnake(state, newHead);
  }

  return result;
}
