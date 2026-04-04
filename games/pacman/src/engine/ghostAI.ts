import { Direction, type Ghost, type Entity, GhostName } from "./types";
import { DIR_VECTORS, COLS, ROWS, TILE_GHOST_HOUSE } from "./constants";
import { isWalkable, tryChangeDirection } from "./movement";

const OPPOSITE: Record<Direction, Direction> = {
  [Direction.Up]: Direction.Down,
  [Direction.Down]: Direction.Up,
  [Direction.Left]: Direction.Right,
  [Direction.Right]: Direction.Left,
};

const ALL_DIRS: Direction[] = [
  Direction.Up,
  Direction.Down,
  Direction.Left,
  Direction.Right,
];

function getTargetTile(
  ghost: Ghost,
  pacman: Entity,
  blinky: Ghost
): { x: number; y: number } {
  const { dx, dy } = DIR_VECTORS[pacman.direction];

  switch (ghost.name) {
    case GhostName.Blinky:
    case GhostName.Funky:
      return { x: pacman.x, y: pacman.y };

    case GhostName.Pinky:
    case GhostName.Spooky:
      return {
        x: Math.max(0, Math.min(COLS - 1, pacman.x + dx * 4)),
        y: Math.max(0, Math.min(ROWS - 1, pacman.y + dy * 4)),
      };

    case GhostName.Inky: {
      const ahead2X = pacman.x + dx * 2;
      const ahead2Y = pacman.y + dy * 2;
      return {
        x: Math.max(0, Math.min(COLS - 1, ahead2X + (ahead2X - blinky.x))),
        y: Math.max(0, Math.min(ROWS - 1, ahead2Y + (ahead2Y - blinky.y))),
      };
    }

    case GhostName.Clyde: {
      const dist =
        Math.abs(ghost.x - pacman.x) + Math.abs(ghost.y - pacman.y);
      if (dist > 8) {
        return { x: pacman.x, y: pacman.y };
      }
      return { x: 0, y: ROWS - 1 };
    }

    case GhostName.Sue:
      return { x: COLS - 1, y: 0 };
  }
}

export function decideGhostDirection(
  ghost: Ghost,
  pacman: Entity,
  blinky: Ghost,
  grid: number[][],
  reservedNextTiles: Set<string>,
  occupiedTiles: Set<string>
): void {
  const selfKey = `${ghost.x},${ghost.y}`;
  const isOccupiedByOther = (x: number, y: number): boolean => {
    const key = `${x},${y}`;
    return key !== selfKey && occupiedTiles.has(key);
  };

  if (ghost.scared) {
    const available = ALL_DIRS.filter((d) => {
      if (d === OPPOSITE[ghost.direction]) return false;
      const { dx, dy } = DIR_VECTORS[d];
      let nx = ghost.x + dx;
      const ny = ghost.y + dy;
      if (nx < 0) nx = COLS - 1;
      if (nx >= COLS) nx = 0;
      if (reservedNextTiles.has(`${nx},${ny}`)) return false;
      if (isOccupiedByOther(nx, ny)) return false;
      return isWalkable(grid, nx, ny, true);
    });
    if (available.length > 0) {
      const pick = available[Math.floor(Math.random() * available.length)];
      tryChangeDirection(ghost, pick, grid, true);
      return;
    }

    const fallback = ALL_DIRS.filter((d) => {
      if (d === OPPOSITE[ghost.direction]) return false;
      const { dx, dy } = DIR_VECTORS[d];
      let nx = ghost.x + dx;
      const ny = ghost.y + dy;
      if (nx < 0) nx = COLS - 1;
      if (nx >= COLS) nx = 0;
      if (reservedNextTiles.has(`${nx},${ny}`)) return false;
      return isWalkable(grid, nx, ny, true);
    });
    if (fallback.length > 0) {
      const pick = fallback[Math.floor(Math.random() * fallback.length)];
      tryChangeDirection(ghost, pick, grid, true);
      return;
    }

    const reverse = OPPOSITE[ghost.direction];
    const { dx, dy } = DIR_VECTORS[reverse];
    let nx = ghost.x + dx;
    const ny = ghost.y + dy;
    if (nx < 0) nx = COLS - 1;
    if (nx >= COLS) nx = 0;
    if (isWalkable(grid, nx, ny, true) && !reservedNextTiles.has(`${nx},${ny}`) && !isOccupiedByOther(nx, ny)) {
      tryChangeDirection(ghost, reverse, grid, true);
      return;
    }
    if (isWalkable(grid, nx, ny, true) && !reservedNextTiles.has(`${nx},${ny}`)) {
      tryChangeDirection(ghost, reverse, grid, true);
    }
    return;
  }

  const target = getTargetTile(ghost, pacman, blinky);

  let bestDir: Direction | null = null;
  let bestDist = Infinity;

  for (const d of ALL_DIRS) {
    if (d === OPPOSITE[ghost.direction]) continue;

    const { dx, dy } = DIR_VECTORS[d];
    let nx = ghost.x + dx;
    const ny = ghost.y + dy;
    if (nx < 0) nx = COLS - 1;
    if (nx >= COLS) nx = 0;

    if (!isWalkable(grid, nx, ny, true)) continue;
    if (reservedNextTiles.has(`${nx},${ny}`)) continue;
    if (isOccupiedByOther(nx, ny)) continue;

    if (
      ny >= 0 && ny < ROWS && nx >= 0 && nx < COLS &&
      grid[ny][nx] === TILE_GHOST_HOUSE &&
      grid[ghost.y][ghost.x] !== TILE_GHOST_HOUSE
    ) {
      continue;
    }

    const dist = (nx - target.x) ** 2 + (ny - target.y) ** 2;
    if (dist < bestDist) {
      bestDist = dist;
      bestDir = d;
    }
  }

  if (bestDir !== null) {
    tryChangeDirection(ghost, bestDir, grid, true);
    return;
  }

  for (const d of ALL_DIRS) {
    if (d === OPPOSITE[ghost.direction]) continue;

    const { dx, dy } = DIR_VECTORS[d];
    let nx = ghost.x + dx;
    const ny = ghost.y + dy;
    if (nx < 0) nx = COLS - 1;
    if (nx >= COLS) nx = 0;

    if (!isWalkable(grid, nx, ny, true)) continue;
    if (reservedNextTiles.has(`${nx},${ny}`)) continue;

    if (
      ny >= 0 && ny < ROWS && nx >= 0 && nx < COLS &&
      grid[ny][nx] === TILE_GHOST_HOUSE &&
      grid[ghost.y][ghost.x] !== TILE_GHOST_HOUSE
    ) {
      continue;
    }

    const dist = (nx - target.x) ** 2 + (ny - target.y) ** 2;
    if (dist < bestDist) {
      bestDist = dist;
      bestDir = d;
    }
  }

  if (bestDir !== null) {
    tryChangeDirection(ghost, bestDir, grid, true);
    return;
  }

  const reverse = OPPOSITE[ghost.direction];
  const { dx, dy } = DIR_VECTORS[reverse];
  let nx = ghost.x + dx;
  const ny = ghost.y + dy;
  if (nx < 0) nx = COLS - 1;
  if (nx >= COLS) nx = 0;
  if (isWalkable(grid, nx, ny, true) && !reservedNextTiles.has(`${nx},${ny}`) && !isOccupiedByOther(nx, ny)) {
    tryChangeDirection(ghost, reverse, grid, true);
    return;
  }
  if (isWalkable(grid, nx, ny, true) && !reservedNextTiles.has(`${nx},${ny}`)) {
    tryChangeDirection(ghost, reverse, grid, true);
  }
}

export function isInGhostHouse(ghost: Ghost, grid: number[][]): boolean {
  if (
    ghost.y >= 0 &&
    ghost.y < ROWS &&
    ghost.x >= 0 &&
    ghost.x < COLS
  ) {
    return grid[ghost.y][ghost.x] === TILE_GHOST_HOUSE;
  }
  return false;
}

export function moveOutOfHouse(
  ghost: Ghost,
  grid: number[][]
): void {
  const exitColByGhost: Record<GhostName, number> = {
    [GhostName.Blinky]: 14,
    [GhostName.Pinky]: 13,
    [GhostName.Inky]: 14,
    [GhostName.Clyde]: 13,
    [GhostName.Sue]: 14,
    [GhostName.Funky]: 13,
    [GhostName.Spooky]: 14,
  };
  const exitCol = exitColByGhost[ghost.name];
  const tryDir = (dir: Direction): boolean => {
    const { dx, dy } = DIR_VECTORS[dir];
    let nx = ghost.x + dx;
    const ny = ghost.y + dy;
    if (nx < 0) nx = COLS - 1;
    if (nx >= COLS) nx = 0;
    if (!isWalkable(grid, nx, ny, true)) return false;
    return tryChangeDirection(ghost, dir, grid, true);
  };

  if (ghost.x < exitCol) {
    if (tryDir(Direction.Right)) return;
    tryDir(Direction.Up);
  } else if (ghost.x > exitCol) {
    if (tryDir(Direction.Left)) return;
    tryDir(Direction.Up);
  } else {
    if (tryDir(Direction.Up)) return;
    if (tryDir(Direction.Left)) return;
    tryDir(Direction.Right);
  }
}
