
export enum Direction {
  Up = "UP",
  Down = "DOWN",
  Left = "LEFT",
  Right = "RIGHT",
}

export enum GameStatus {
  Start = "START",
  Playing = "PLAYING",
  GameOver = "GAME_OVER",
  Win = "WIN",
}

export enum Difficulty {
  Easy = "EASY",
  Medium = "MEDIUM",
  Hard = "HARD",
}

export interface GridPos {
  x: number;
  y: number;
}

export interface PixelPos {
  px: number;
  py: number;
}

export interface Entity extends GridPos, PixelPos {
  direction: Direction;
}

export enum GhostName {
  Blinky = "BLINKY",
  Pinky = "PINKY",
  Inky = "INKY",
  Clyde = "CLYDE",
  Sue = "SUE",
  Funky = "FUNKY",
  Spooky = "SPOOKY",
}

export interface Ghost extends Entity {
  name: GhostName;
  color: string;
  scared: boolean;
  scaredTimer: number;
}

export type GhostConfig = {
  name: GhostName;
  color: string;
};

export interface ActiveCheats {
  slowGhosts: boolean;
  fewGhosts: boolean;
  infiniteLives: boolean;
}

export interface GameState {
  status: GameStatus;
  pacman: Entity;
  ghosts: Ghost[];
  
  grid: number[][];
  score: number;
  lives: number;
  pelletsLeft: number;
  powerTimer: number;
  
  nextDirection: Direction | null;
  
  lastTimestamp: number;

  cheats: ActiveCheats;
}
