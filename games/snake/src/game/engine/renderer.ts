import type { GameState, GameConfig, Position } from "../../types";
import { Direction, PowerUpType } from "../../types";
import { getPowerUpDisplay } from "../utils";

interface RenderColors {
  background: string;
  grid: string;
  snakeHead: string;
  snakeBody: string;
  snakePhase: string;
  food: string;
  foodGlow: string;
  obstacle: string;
  debugGrid: string;
  debugText: string;
}

const COLORS: RenderColors = {
  background: "#0f172a",
  grid: "#1e293b",
  snakeHead: "#22c55e",
  snakeBody: "#16a34a",
  snakePhase: "rgba(34, 197, 94, 0.4)",
  food: "#ef4444",
  foodGlow: "rgba(239, 68, 68, 0.3)",
  obstacle: "#64748b",
  debugGrid: "rgba(100, 116, 139, 0.15)",
  debugText: "rgba(148, 163, 184, 0.7)",
};

export function render(
  ctx: CanvasRenderingContext2D,
  state: GameState,
  config: GameConfig,
  frameCount: number,
): void {
  const { cellSize, gridWidth, gridHeight } = config;
  const canvasW = gridWidth * cellSize;
  const canvasH = gridHeight * cellSize;

  ctx.clearRect(0, 0, canvasW, canvasH);

  drawBackground(ctx, canvasW, canvasH);

  if (config.debugMode) {
    drawDebugGrid(ctx, config);
  }

  drawObstacles(ctx, state, cellSize);
  drawSnake(ctx, state, cellSize);
  drawFood(ctx, state, cellSize, frameCount);

  if (state.powerUp) {
    drawPowerUp(ctx, state.powerUp.position, state.powerUp.type, cellSize, frameCount);
  }

  if (config.debugMode) {
    drawDebugInfo(ctx, state, frameCount);
  }
}

function drawBackground(ctx: CanvasRenderingContext2D, w: number, h: number): void {
  ctx.fillStyle = COLORS.background;
  ctx.fillRect(0, 0, w, h);
}

function drawDebugGrid(ctx: CanvasRenderingContext2D, config: GameConfig): void {
  const { cellSize, gridWidth, gridHeight } = config;

  ctx.strokeStyle = COLORS.debugGrid;
  ctx.lineWidth = 0.5;

  for (let x = 0; x <= gridWidth; x++) {
    ctx.beginPath();
    ctx.moveTo(x * cellSize, 0);
    ctx.lineTo(x * cellSize, gridHeight * cellSize);
    ctx.stroke();
  }
  for (let y = 0; y <= gridHeight; y++) {
    ctx.beginPath();
    ctx.moveTo(0, y * cellSize);
    ctx.lineTo(gridWidth * cellSize, y * cellSize);
    ctx.stroke();
  }
}

function drawSnake(
  ctx: CanvasRenderingContext2D,
  state: GameState,
  cellSize: number,
): void {
  const phaseMode = state.activePowerUps.some((p) => p.type === PowerUpType.Phase);
  const padding = 1;

  for (let i = state.snake.length - 1; i >= 0; i--) {
    const seg = state.snake[i];
    const isHead = i === 0;

    if (phaseMode) {
      ctx.fillStyle = isHead ? COLORS.snakeHead : COLORS.snakePhase;
      ctx.globalAlpha = isHead ? 0.8 : 0.4;
    } else {
      const brightness = isHead ? 1 : Math.max(0.5, 1 - (i / state.snake.length) * 0.5);
      ctx.fillStyle = isHead ? COLORS.snakeHead : COLORS.snakeBody;
      ctx.globalAlpha = brightness;
    }

    const x = seg.x * cellSize + padding;
    const y = seg.y * cellSize + padding;
    const size = cellSize - padding * 2;
    const radius = isHead ? size / 3 : size / 4;

    drawRoundedRect(ctx, x, y, size, size, radius);
    ctx.fill();

    ctx.globalAlpha = 1;
  }

  drawSnakeEyes(ctx, state, cellSize);
}

function drawSnakeEyes(
  ctx: CanvasRenderingContext2D,
  state: GameState,
  cellSize: number,
): void {
  if (state.snake.length === 0) return;

  const head = state.snake[0];
  const cx = head.x * cellSize + cellSize / 2;
  const cy = head.y * cellSize + cellSize / 2;
  const eyeR = cellSize * 0.08;
  const eyeOffset = cellSize * 0.18;

  ctx.fillStyle = "#fff";

  const dir = state.direction;
  let e1x: number, e1y: number, e2x: number, e2y: number;

  switch (dir) {
    case Direction.Up:
      e1x = cx - eyeOffset; e1y = cy - eyeOffset;
      e2x = cx + eyeOffset; e2y = cy - eyeOffset;
      break;
    case Direction.Down:
      e1x = cx - eyeOffset; e1y = cy + eyeOffset;
      e2x = cx + eyeOffset; e2y = cy + eyeOffset;
      break;
    case Direction.Left:
      e1x = cx - eyeOffset; e1y = cy - eyeOffset;
      e2x = cx - eyeOffset; e2y = cy + eyeOffset;
      break;
    case Direction.Right:
      e1x = cx + eyeOffset; e1y = cy - eyeOffset;
      e2x = cx + eyeOffset; e2y = cy + eyeOffset;
      break;
  }

  ctx.beginPath();
  ctx.arc(e1x, e1y, eyeR, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(e2x, e2y, eyeR, 0, Math.PI * 2);
  ctx.fill();
}

function drawFood(
  ctx: CanvasRenderingContext2D,
  state: GameState,
  cellSize: number,
  frameCount: number,
): void {
  const { food } = state;
  const cx = food.position.x * cellSize + cellSize / 2;
  const cy = food.position.y * cellSize + cellSize / 2;
  const pulse = Math.sin(frameCount * 0.08) * 2;
  const baseRadius = cellSize * 0.35;

  ctx.shadowColor = COLORS.foodGlow;
  ctx.shadowBlur = 10 + pulse;

  ctx.fillStyle = COLORS.food;
  ctx.beginPath();
  ctx.arc(cx, cy, baseRadius + pulse * 0.5, 0, Math.PI * 2);
  ctx.fill();

  ctx.shadowColor = "transparent";
  ctx.shadowBlur = 0;
}

function drawPowerUp(
  ctx: CanvasRenderingContext2D,
  position: Position,
  type: PowerUpType,
  cellSize: number,
  frameCount: number,
): void {
  const cx = position.x * cellSize + cellSize / 2;
  const cy = position.y * cellSize + cellSize / 2;
  const pulse = Math.sin(frameCount * 0.12) * 2;
  const radius = cellSize * 0.4;
  const { color, symbol } = getPowerUpDisplay(type);

  ctx.shadowColor = color;
  ctx.shadowBlur = 12 + pulse;

  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(cx, cy, radius + pulse * 0.3, 0, Math.PI * 2);
  ctx.fill();

  ctx.shadowColor = "transparent";
  ctx.shadowBlur = 0;

  ctx.fillStyle = "#fff";
  ctx.font = `${cellSize * 0.4}px sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(symbol, cx, cy);
}

function drawObstacles(
  ctx: CanvasRenderingContext2D,
  state: GameState,
  cellSize: number,
): void {
  if (!state.obstaclesEnabled) return;

  ctx.fillStyle = COLORS.obstacle;
  for (const obstacle of state.obstacles) {
    const x = obstacle.position.x * cellSize + 1;
    const y = obstacle.position.y * cellSize + 1;
    const size = cellSize - 2;
    drawRoundedRect(ctx, x, y, size, size, 3);
    ctx.fill();
  }
}

function drawDebugInfo(
  ctx: CanvasRenderingContext2D,
  state: GameState,
  frameCount: number,
): void {
  ctx.fillStyle = COLORS.debugText;
  ctx.font = "10px monospace";
  ctx.textAlign = "left";
  ctx.textBaseline = "top";

  const lines = [
    `Frame: ${frameCount}`,
    `Snake: ${state.snake.length}`,
    `Score: ${state.score}`,
    `Speed: ${state.speed}`,
    `Level: ${state.level}`,
    `Dir: ${state.direction}`,
  ];

  lines.forEach((line, i) => {
    ctx.fillText(line, 4, 4 + i * 12);
  });
}

function drawRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
): void {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}
