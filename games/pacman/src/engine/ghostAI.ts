import { Direction, type Ghost, type Entity, GhostName } from "./types";
import { DIR_VECTORS, COLS, ROWS, TILE_GHOST_HOUSE, GHOST_EXIT_COL } from "./constants";
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

function wrapCol(col: number): number {
  if (col < 0) return COLS - 1;
  if (col >= COLS) return 0;
  return col;
}

interface NeighborTile {
  dir: Direction;
  x: number;
  y: number;
}

function getWalkableNeighbors(
  ghost: Ghost,
  grid: number[][],
): NeighborTile[] {
  return ALL_DIRS.reduce<NeighborTile[]>((acc, d) => {
    if (d === OPPOSITE[ghost.direction]) return acc;
    const { dx, dy } = DIR_VECTORS[d];
    const nx = wrapCol(ghost.x + dx);
    const ny = ghost.y + dy;
    if (isWalkable(grid, nx, ny, true)) acc.push({ dir: d, x: nx, y: ny });
    return acc;
  }, []);
}

function isReservedOrOccupied(
  x: number,
  y: number,
  reserved: Set<string>,
  occupied: Set<string> | null,
  selfKey: string,
): boolean {
  const key = `${x},${y}`;
  if (reserved.has(key)) return true;
  if (occupied && key !== selfKey && occupied.has(key)) return true;
  return false;
}

function isEnteringGhostHouse(
  grid: number[][],
  fromX: number,
  fromY: number,
  toX: number,
  toY: number,
): boolean {
  if (toY < 0 || toY >= ROWS || toX < 0 || toX >= COLS) return false;
  return grid[toY][toX] === TILE_GHOST_HOUSE && grid[fromY][fromX] !== TILE_GHOST_HOUSE;
}

/** Pick a random direction from candidates, applying tryChangeDirection. */
function pickRandom(ghost: Ghost, candidates: NeighborTile[], grid: number[][]): boolean {
  if (candidates.length === 0) return false;
  const pick = candidates[Math.floor(Math.random() * candidates.length)];
  tryChangeDirection(ghost, pick.dir, grid, true);
  return true;
}

/** Try reversing as an absolute last resort. */
function tryReverse(
  ghost: Ghost,
  grid: number[][],
  reserved: Set<string>,
  occupied: Set<string> | null,
  selfKey: string,
): void {
  const reverse = OPPOSITE[ghost.direction];
  const { dx, dy } = DIR_VECTORS[reverse];
  const nx = wrapCol(ghost.x + dx);
  const ny = ghost.y + dy;
  if (!isWalkable(grid, nx, ny, true) || reserved.has(`${nx},${ny}`)) return;
  if (occupied && `${nx},${ny}` !== selfKey && occupied.has(`${nx},${ny}`)) {
    tryChangeDirection(ghost, reverse, grid, true);
    return;
  }
  tryChangeDirection(ghost, reverse, grid, true);
}

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
  const neighbors = getWalkableNeighbors(ghost, grid);

  if (ghost.scared) {
    decideScared(ghost, grid, neighbors, reservedNextTiles, occupiedTiles, selfKey);
  } else {
    decideHunt(ghost, pacman, blinky, grid, neighbors, reservedNextTiles, occupiedTiles, selfKey);
  }
}

function decideScared(
  ghost: Ghost,
  grid: number[][],
  neighbors: NeighborTile[],
  reserved: Set<string>,
  occupied: Set<string>,
  selfKey: string,
): void {
  const best = neighbors.filter(
    (n) => !isReservedOrOccupied(n.x, n.y, reserved, occupied, selfKey),
  );
  if (pickRandom(ghost, best, grid)) return;

  const relaxed = neighbors.filter(
    (n) => !isReservedOrOccupied(n.x, n.y, reserved, null, selfKey),
  );
  if (pickRandom(ghost, relaxed, grid)) return;

  tryReverse(ghost, grid, reserved, occupied, selfKey);
}

function decideHunt(
  ghost: Ghost,
  pacman: Entity,
  blinky: Ghost,
  grid: number[][],
  neighbors: NeighborTile[],
  reserved: Set<string>,
  occupied: Set<string>,
  selfKey: string,
): void {
  const target = getTargetTile(ghost, pacman, blinky);

  const pick = (candidates: NeighborTile[]): Direction | null => {
    let bestDir: Direction | null = null;
    let bestDist = Infinity;
    for (const n of candidates) {
      if (isEnteringGhostHouse(grid, ghost.x, ghost.y, n.x, n.y)) continue;
      const dist = (n.x - target.x) ** 2 + (n.y - target.y) ** 2;
      if (dist < bestDist) {
        bestDist = dist;
        bestDir = n.dir;
      }
    }
    return bestDir;
  };

  const strict = neighbors.filter(
    (n) => !isReservedOrOccupied(n.x, n.y, reserved, occupied, selfKey),
  );
  let best = pick(strict);
  if (best !== null) {
    tryChangeDirection(ghost, best, grid, true);
    return;
  }

  const relaxed = neighbors.filter(
    (n) => !isReservedOrOccupied(n.x, n.y, reserved, null, selfKey),
  );
  best = pick(relaxed);
  if (best !== null) {
    tryChangeDirection(ghost, best, grid, true);
    return;
  }

  tryReverse(ghost, grid, reserved, occupied, selfKey);
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
  const exitCol = GHOST_EXIT_COL[ghost.name];
  const tryDir = (dir: Direction): boolean => {
    const { dx, dy } = DIR_VECTORS[dir];
    const nx = wrapCol(ghost.x + dx);
    const ny = ghost.y + dy;
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
