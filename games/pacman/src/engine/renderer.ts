import type { GameState } from "./types";
import {
  TILE_SIZE,
  COLS,
  ROWS,
  TILE_WALL,
  TILE_PELLET,
  TILE_POWER,
  COLOR_WALL,
  COLOR_PELLET,
  COLOR_POWER,
  COLOR_BG,
  COLOR_PACMAN,
  COLOR_GHOST_SCARED,
  CANVAS_W,
  CANVAS_H,
  DIR_VECTORS,
} from "./constants";
import { Direction } from "./types";

export function render(
  ctx: CanvasRenderingContext2D,
  state: GameState,
  frameCount: number
): void {
  ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);

  ctx.fillStyle = COLOR_BG;
  ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

  drawMaze(ctx, state.grid);
  drawPellets(ctx, state.grid, frameCount);
  drawPacman(ctx, state, frameCount);
  drawGhosts(ctx, state, frameCount);
}

function drawMaze(ctx: CanvasRenderingContext2D, grid: number[][]): void {
  ctx.fillStyle = COLOR_WALL;
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      if (grid[row][col] === TILE_WALL) {
        drawWallTile(ctx, col, row, grid);
      }
    }
  }
}

function drawWallTile(
  ctx: CanvasRenderingContext2D,
  col: number,
  row: number,
  grid: number[][]
): void {
  const x = col * TILE_SIZE;
  const y = row * TILE_SIZE;
  const s = TILE_SIZE;

  ctx.fillStyle = "#0000cc";
  ctx.fillRect(x + 1, y + 1, s - 2, s - 2);

  ctx.fillStyle = COLOR_WALL;
  const isWall = (c: number, r: number) =>
    r >= 0 && r < ROWS && c >= 0 && c < COLS && grid[r][c] === TILE_WALL;

  if (!isWall(col, row - 1)) {
    ctx.fillRect(x + 1, y, s - 2, 2);
  }
  if (!isWall(col, row + 1)) {
    ctx.fillRect(x + 1, y + s - 2, s - 2, 2);
  }
  if (!isWall(col - 1, row)) {
    ctx.fillRect(x, y + 1, 2, s - 2);
  }
  if (!isWall(col + 1, row)) {
    ctx.fillRect(x + s - 2, y + 1, 2, s - 2);
  }
}

function drawPellets(
  ctx: CanvasRenderingContext2D,
  grid: number[][],
  frameCount: number
): void {
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      const tile = grid[row][col];
      const cx = col * TILE_SIZE + TILE_SIZE / 2;
      const cy = row * TILE_SIZE + TILE_SIZE / 2;

      if (tile === TILE_PELLET) {
        ctx.fillStyle = COLOR_PELLET;
        ctx.beginPath();
        ctx.arc(cx, cy, 2, 0, Math.PI * 2);
        ctx.fill();
      } else if (tile === TILE_POWER) {
        const pulse = Math.sin(frameCount * 0.1) * 1.5 + 5;
        ctx.fillStyle = COLOR_POWER;
        ctx.beginPath();
        ctx.arc(cx, cy, pulse, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }
}

function drawPacman(
  ctx: CanvasRenderingContext2D,
  state: GameState,
  frameCount: number
): void {
  const { pacman } = state;
  const cx = pacman.px + TILE_SIZE / 2;
  const cy = pacman.py + TILE_SIZE / 2;
  const radius = TILE_SIZE / 2 - 1;

  const mouthAngle = (Math.abs(Math.sin(frameCount * 0.15)) * 0.8) * Math.PI / 4;

  let startAngle = 0;
  switch (pacman.direction) {
    case Direction.Right:
      startAngle = 0;
      break;
    case Direction.Down:
      startAngle = Math.PI / 2;
      break;
    case Direction.Left:
      startAngle = Math.PI;
      break;
    case Direction.Up:
      startAngle = (3 * Math.PI) / 2;
      break;
  }

  ctx.fillStyle = COLOR_PACMAN;
  ctx.beginPath();
  ctx.moveTo(cx, cy);
  ctx.arc(
    cx,
    cy,
    radius,
    startAngle + mouthAngle,
    startAngle + Math.PI * 2 - mouthAngle
  );
  ctx.closePath();
  ctx.fill();
}

function drawGhosts(
  ctx: CanvasRenderingContext2D,
  state: GameState,
  frameCount: number
): void {
  for (const ghost of state.ghosts) {
    const cx = ghost.px + TILE_SIZE / 2;
    const cy = ghost.py + TILE_SIZE / 2;
    const r = TILE_SIZE / 2 - 1;

    if (ghost.scared) {
      const flash =
        ghost.scaredTimer < 2000 && Math.floor(frameCount / 8) % 2 === 0;
      ctx.fillStyle = flash ? "#FFFFFF" : COLOR_GHOST_SCARED;
    } else {
      ctx.fillStyle = ghost.color;
    }

    ctx.beginPath();
    ctx.arc(cx, cy - 2, r, Math.PI, 0, false);
    ctx.lineTo(cx + r, cy + r);

    const waveOffset = (frameCount % 16) < 8 ? 0 : 2;
    const segments = 3;
    const segW = (r * 2) / segments;
    for (let i = segments - 1; i >= 0; i--) {
      const sx = cx - r + segW * i;
      const peak = (i + waveOffset) % 2 === 0 ? cy + r - 3 : cy + r;
      ctx.lineTo(sx + segW / 2, peak);
      ctx.lineTo(sx, cy + r);
    }
    ctx.closePath();
    ctx.fill();

    if (!ghost.scared) {
      drawGhostEyes(ctx, cx, cy, ghost.direction);
    } else {
      ctx.fillStyle = "#FFF";
      ctx.fillRect(cx - 4, cy - 4, 3, 3);
      ctx.fillRect(cx + 2, cy - 4, 3, 3);
    }
  }
}

function drawGhostEyes(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  direction: Direction
): void {
  const { dx, dy } = DIR_VECTORS[direction];

  ctx.fillStyle = "#FFF";
  ctx.beginPath();
  ctx.arc(cx - 4, cy - 3, 3, 0, Math.PI * 2);
  ctx.arc(cx + 4, cy - 3, 3, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#00F";
  ctx.beginPath();
  ctx.arc(cx - 4 + dx * 2, cy - 3 + dy * 2, 1.5, 0, Math.PI * 2);
  ctx.arc(cx + 4 + dx * 2, cy - 3 + dy * 2, 1.5, 0, Math.PI * 2);
  ctx.fill();
}
