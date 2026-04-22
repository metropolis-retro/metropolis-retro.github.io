import type { Difficulty, Direction, GameStatus, ActivePowerUp } from "./game";

export interface GameHUDProps {
  score: number;
  highScore: number;
  level: number;
  speed: number;
  activePowerUps: ActivePowerUp[];
}

export interface GameOverlayProps {
  status: GameStatus;
  score: number;
  highScore: number;
  lastScore: number;
  selectedDifficulty: Difficulty;
  obstaclesEnabled: boolean;
  onSelectDifficulty: (difficulty: Difficulty) => void;
  onToggleObstacles: () => void;
  onStart: () => void;
  onResume: () => void;
}

export interface DPadProps {
  onDirection: (dir: Direction) => void;
}

export interface GameBoardProps {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  width: number;
  height: number;
}

export interface SnakeGameProps {
  className?: string;
}
