import {
  type GameState,
  GameStatus,
  Difficulty,
  Direction,
  type Ghost,
  GhostName,
  type ActiveCheats,
} from "./types";
import {
  MAP_LAYOUT,
  COLS,
  ROWS,
  PACMAN_START,
  PACMAN_START_DIR,
  GHOST_CONFIG,
  GHOST_COUNT_BY_DIFFICULTY,
  TILE_SIZE,
  TILE_PELLET,
  TILE_POWER,
  TILE_EMPTY,
  TILE_GHOST_HOUSE,
  TILE_WALL,
  INITIAL_LIVES,
} from "./constants";

function cloneGrid(): number[][] {
  return MAP_LAYOUT.map((row) => [...row]);
}

function countPellets(grid: number[][]): number {
  let count = 0;
  for (const row of grid) {
    for (const cell of row) {
      if (cell === TILE_PELLET || cell === TILE_POWER) count++;
    }
  }
  return count;
}

function randomInt(max: number): number {
  return Math.floor(Math.random() * max);
}

function isInsideCenterBox(x: number, y: number): boolean {
  return x >= 10 && x <= 17 && y >= 11 && y <= 17;
}

function isSpawnTileAllowed(grid: number[][], x: number, y: number): boolean {
  if (x < 0 || x >= COLS || y < 0 || y >= ROWS) return false;
  const tile = grid[y][x];
  if (tile === TILE_WALL || tile === TILE_GHOST_HOUSE) return false;
  if (isInsideCenterBox(x, y)) return false;
  if (Math.abs(x - PACMAN_START.x) + Math.abs(y - PACMAN_START.y) < 6) return false;
  return tile === TILE_PELLET || tile === TILE_POWER || tile === TILE_EMPTY;
}

function isFarFromOthers(x: number, y: number, picked: Array<{ x: number; y: number }>): boolean {
  for (const pos of picked) {
    if (Math.abs(pos.x - x) <= 1 && Math.abs(pos.y - y) <= 1) {
      return false;
    }
  }
  return true;
}

function pickGhostSpawnPositions(grid: number[][], count: number): Array<{ x: number; y: number }> {
  const positions: Array<{ x: number; y: number }> = [];
  let attempts = 0;
  while (positions.length < count && attempts < 5000) {
    attempts++;
    const x = randomInt(COLS);
    const y = randomInt(ROWS);
    if (!isSpawnTileAllowed(grid, x, y)) continue;
    if (!isFarFromOthers(x, y, positions)) continue;
    positions.push({ x, y });
  }

  if (positions.length < count) {
    for (let y = 1; y < ROWS - 1 && positions.length < count; y++) {
      for (let x = 1; x < COLS - 1 && positions.length < count; x++) {
        if (!isSpawnTileAllowed(grid, x, y)) continue;
        if (!isFarFromOthers(x, y, positions)) continue;
        positions.push({ x, y });
      }
    }
  }

  return positions;
}

function createGhostsByCount(grid: number[][], ghostCount: number): Ghost[] {
  const configs = GHOST_CONFIG.slice(0, ghostCount);
  const spawns = pickGhostSpawnPositions(grid, ghostCount);

  return configs.map((cfg, index) => {
    const spawn = spawns[index] ?? { x: 14 + index, y: 11 };
    return {
      name: cfg.name,
      color: cfg.color,
      x: spawn.x,
      y: spawn.y,
      px: spawn.x * TILE_SIZE,
      py: spawn.y * TILE_SIZE,
      direction:
        cfg.name === GhostName.Blinky ? Direction.Left : Direction.Up,
      scared: false,
      scaredTimer: 0,
    };
  });
}

function createGhosts(grid: number[][], difficulty: Difficulty): Ghost[] {
  const ghostCount = GHOST_COUNT_BY_DIFFICULTY[difficulty];
  return createGhostsByCount(grid, ghostCount);
}

export function createInitialState(difficulty: Difficulty = Difficulty.Medium): GameState {
  const grid = cloneGrid();
  return {
    status: GameStatus.Start,
    pacman: {
      x: PACMAN_START.x,
      y: PACMAN_START.y,
      px: PACMAN_START.x * TILE_SIZE,
      py: PACMAN_START.y * TILE_SIZE,
      direction: PACMAN_START_DIR,
    },
    ghosts: createGhosts(grid, difficulty),
    grid,
    score: 0,
    lives: INITIAL_LIVES,
    pelletsLeft: countPellets(grid),
    powerTimer: 0,
    nextDirection: null,
    lastTimestamp: 0,
    cheats: { slowGhosts: false, fewGhosts: false, infiniteLives: false },
  };
}

export function resetPositions(state: GameState): void {
  state.pacman.x = PACMAN_START.x;
  state.pacman.y = PACMAN_START.y;
  state.pacman.px = PACMAN_START.x * TILE_SIZE;
  state.pacman.py = PACMAN_START.y * TILE_SIZE;
  state.pacman.direction = PACMAN_START_DIR;
  state.nextDirection = null;

  const ghosts = createGhostsByCount(state.grid, state.ghosts.length);
  for (let i = 0; i < state.ghosts.length; i++) {
    Object.assign(state.ghosts[i], ghosts[i]);
  }
}
