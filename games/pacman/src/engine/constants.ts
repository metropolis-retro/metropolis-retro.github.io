import { Direction, GhostName, Difficulty, type GhostConfig } from "./types";

export const TILE_WALL = 0;
export const TILE_PELLET = 1;
export const TILE_EMPTY = 2;
export const TILE_POWER = 3;
export const TILE_GHOST_HOUSE = 4;

export const MAP_LAYOUT: number[][] = [
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0],
  [0,1,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,1,0],
  [0,3,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,3,0],
  [0,1,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,1,0],
  [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
  [0,1,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,1,0],
  [0,1,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,1,0],
  [0,1,1,1,1,1,1,0,0,1,1,1,1,0,0,1,1,1,1,0,0,1,1,1,1,1,1,0],
  [0,0,0,0,0,0,1,0,0,0,0,0,2,0,0,2,0,0,0,0,0,1,0,0,0,0,0,0],
  [0,0,0,0,0,0,1,0,0,0,0,0,2,0,0,2,0,0,0,0,0,1,0,0,0,0,0,0],
  [0,0,0,0,0,0,1,0,0,2,2,2,2,2,2,2,2,2,2,0,0,1,0,0,0,0,0,0],
  [0,0,0,0,0,0,1,0,0,2,0,0,0,4,4,0,0,0,2,0,0,1,0,0,0,0,0,0],
  [0,0,0,0,0,0,1,0,0,2,0,4,4,4,4,4,4,0,2,0,0,1,0,0,0,0,0,0],
  [2,2,2,2,2,2,1,2,2,2,0,4,4,4,4,4,4,0,2,2,2,1,2,2,2,2,2,2],
  [0,0,0,0,0,0,1,0,0,2,0,4,4,4,4,4,4,0,2,0,0,1,0,0,0,0,0,0],
  [0,0,0,0,0,0,1,0,0,2,0,0,0,0,0,0,0,0,2,0,0,1,0,0,0,0,0,0],
  [0,0,0,0,0,0,1,0,0,2,2,2,2,2,2,2,2,2,2,0,0,1,0,0,0,0,0,0],
  [0,0,0,0,0,0,1,0,0,2,0,0,0,0,0,0,0,0,2,0,0,1,0,0,0,0,0,0],
  [0,0,0,0,0,0,1,0,0,2,0,0,0,0,0,0,0,0,2,0,0,1,0,0,0,0,0,0],
  [0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0],
  [0,1,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,1,0],
  [0,1,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,1,0],
  [0,3,1,1,0,0,1,1,1,1,1,1,1,2,2,1,1,1,1,1,1,1,0,0,1,1,3,0],
  [0,0,0,1,0,0,1,0,0,1,0,0,0,0,0,0,0,0,1,0,0,1,0,0,1,0,0,0],
  [0,0,0,1,0,0,1,0,0,1,0,0,0,0,0,0,0,0,1,0,0,1,0,0,1,0,0,0],
  [0,1,1,1,1,1,1,0,0,1,1,1,1,0,0,1,1,1,1,0,0,1,1,1,1,1,1,0],
  [0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0],
  [0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0],
  [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
];

export const COLS = MAP_LAYOUT[0].length;
export const ROWS = MAP_LAYOUT.length;

export const TILE_SIZE = 20;
export const CANVAS_W = COLS * TILE_SIZE;
export const CANVAS_H = ROWS * TILE_SIZE;

export const PACMAN_SPEED = 120;
export const GHOST_SPEED = 100;
export const GHOST_SCARED_SPEED = 60;

export const POWER_DURATION = 7_000;

export const PELLET_SCORE = 10;
export const POWER_SCORE = 50;
export const GHOST_SCORE = 200;

export const PACMAN_START = { x: 14, y: 23 };
export const PACMAN_START_DIR = Direction.Left;

export const GHOST_CONFIG: GhostConfig[] = [
  { name: GhostName.Blinky, color: "#FF0000" },
  { name: GhostName.Pinky, color: "#FFB8FF" },
  { name: GhostName.Inky, color: "#00FFFF" },
  { name: GhostName.Clyde, color: "#FFB852" },
  { name: GhostName.Sue, color: "#7CFC00" },
  { name: GhostName.Funky, color: "#FFA500" },
  { name: GhostName.Spooky, color: "#9370DB" },
];

export const GHOST_COUNT_BY_DIFFICULTY: Record<Difficulty, number> = {
  [Difficulty.Easy]: 2,
  [Difficulty.Medium]: 4,
  [Difficulty.Hard]: 7,
};

export const COLOR_WALL = "#1a1a8a";
export const COLOR_WALL_INNER = "#0000cc";
export const COLOR_PELLET = "#ffff99";
export const COLOR_POWER = "#ffff99";
export const COLOR_BG = "#000000";
export const COLOR_PACMAN = "#FFFF00";
export const COLOR_GHOST_SCARED = "#2121DE";
export const COLOR_TEXT = "#FFFFFF";

export const INITIAL_LIVES = 3;

export const GHOST_EXIT_COL: Record<GhostName, number> = {
  [GhostName.Blinky]: 14,
  [GhostName.Pinky]: 13,
  [GhostName.Inky]: 14,
  [GhostName.Clyde]: 13,
  [GhostName.Sue]: 14,
  [GhostName.Funky]: 13,
  [GhostName.Spooky]: 14,
};

export const DIR_VECTORS: Record<Direction, { dx: number; dy: number }> = {
    [Direction.Up]: { dx: 0, dy: -1 },
    [Direction.Down]: { dx: 0, dy: 1 },
    [Direction.Left]: { dx: -1, dy: 0 },
    [Direction.Right]: { dx: 1, dy: 0 },
};
