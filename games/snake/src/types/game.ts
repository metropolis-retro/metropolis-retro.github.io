export enum Direction {
  Up = "UP",
  Down = "DOWN",
  Left = "LEFT",
  Right = "RIGHT",
}

export enum GameStatus {
  Idle = "IDLE",
  Playing = "PLAYING",
  Paused = "PAUSED",
  GameOver = "GAME_OVER",
}

export enum Difficulty {
  Easy = "EASY",
  Medium = "MEDIUM",
  Hard = "HARD",
}

export enum PowerUpType {
  SlowMotion = "SLOW_MOTION",
  DoublePoints = "DOUBLE_POINTS",
  Phase = "PHASE",
}

export interface Position {
  x: number;
  y: number;
}

export interface Food {
  position: Position;
  spawnTime: number;
}

export interface PowerUp {
  type: PowerUpType;
  position: Position;
  duration: number;
  spawnTime: number;
}

export interface ActivePowerUp {
  type: PowerUpType;
  expiresAt: number;
}

export interface Obstacle {
  position: Position;
}

export interface GameState {
  status: GameStatus;
  snake: Position[];
  direction: Direction;
  nextDirection: Direction;
  food: Food;
  powerUp: PowerUp | null;
  activePowerUps: ActivePowerUp[];
  obstacles: Obstacle[];
  score: number;
  level: number;
  speed: number;
  gridWidth: number;
  gridHeight: number;
  obstaclesEnabled: boolean;
  difficulty: Difficulty;
  lastMoveTime: number;
  foodEaten: number;
}

export interface GameConfig {
  gridWidth: number;
  gridHeight: number;
  cellSize: number;
  initialSpeed: number;
  speedIncrement: number;
  maxSpeed: number;
  foodScore: number;
  powerUpScore: number;
  powerUpSpawnChance: number;
  powerUpDuration: number;
  slowMotionFactor: number;
  levelUpThreshold: number;
  obstaclesEnabled: boolean;
  obstacleCount: number;
  difficulty: Difficulty;
  debugMode: boolean;
}

export const DIR_VECTORS: Record<Direction, Position> = {
  [Direction.Up]: { x: 0, y: -1 },
  [Direction.Down]: { x: 0, y: 1 },
  [Direction.Left]: { x: -1, y: 0 },
  [Direction.Right]: { x: 1, y: 0 },
};

export const OPPOSITE_DIR: Record<Direction, Direction> = {
  [Direction.Up]: Direction.Down,
  [Direction.Down]: Direction.Up,
  [Direction.Left]: Direction.Right,
  [Direction.Right]: Direction.Left,
};
