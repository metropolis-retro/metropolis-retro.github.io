
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

export const GHOST_CONFIG: {
  name: GhostName;
  color: string;
}[] = [
  { name: GhostName.Blinky, color: "#FF0000" },
  { name: GhostName.Pinky, color: "#FFB8FF" },
  { name: GhostName.Inky, color: "#00FFFF" },
  { name: GhostName.Clyde, color: "#FFB852" },
  { name: GhostName.Sue, color: "#7CFC00" },
  { name: GhostName.Funky, color: "#FFA500" },
  { name: GhostName.Spooky, color: "#9370DB" },
];

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
