import { Difficulty, type GameConfig } from "../types";

const BASE_CONFIG: Omit<GameConfig, "difficulty" | "initialSpeed" | "speedIncrement" | "maxSpeed" | "obstacleCount"> = {
  gridWidth: 20,
  gridHeight: 20,
  cellSize: 24,
  foodScore: 10,
  powerUpScore: 25,
  powerUpSpawnChance: 0.15,
  powerUpDuration: 5000,
  slowMotionFactor: 0.5,
  levelUpThreshold: 5,
  obstaclesEnabled: false,
  debugMode: false,
};

const DIFFICULTY_SETTINGS: Record<Difficulty, Pick<GameConfig, "initialSpeed" | "speedIncrement" | "maxSpeed" | "obstacleCount" | "difficulty">> = {
  [Difficulty.Easy]: {
    difficulty: Difficulty.Easy,
    initialSpeed: 120,
    speedIncrement: 3,
    maxSpeed: 200,
    obstacleCount: 3,
  },
  [Difficulty.Medium]: {
    difficulty: Difficulty.Medium,
    initialSpeed: 150,
    speedIncrement: 5,
    maxSpeed: 280,
    obstacleCount: 5,
  },
  [Difficulty.Hard]: {
    difficulty: Difficulty.Hard,
    initialSpeed: 200,
    speedIncrement: 8,
    maxSpeed: 400,
    obstacleCount: 8,
  },
};

export function createGameConfig(
  difficulty: Difficulty = Difficulty.Medium,
  overrides: Partial<GameConfig> = {},
): GameConfig {
  return {
    ...BASE_CONFIG,
    ...DIFFICULTY_SETTINGS[difficulty],
    ...overrides,
  };
}

export const DEFAULT_CONFIG = createGameConfig(Difficulty.Medium);
