import type { ReactNode, RefObject } from "react";
import { type ActiveCheats, type Difficulty, type Direction, type GameState, type GameStatus } from "../engine/types";

export interface UiState {
  status: GameStatus;
  score: number;
  lives: number;
}

export interface GameOverlayProps {
  status: GameStatus;
  score: number;
  lives: number;
  lastScore: number;
  previousScore: number;
  highScore: number;
  selectedDifficulty: Difficulty;
  onSelectDifficulty: (difficulty: Difficulty) => void;
  onStart: () => void;
  activeCheats: ActiveCheats;
}

export interface EndScreenProps {
  title: string;
  titleColor: string;
  score: number;
  previousScore: number;
  highScore: number;
  onStart: () => void;
}

export interface OverlayProps {
  children: ReactNode;
}

export interface DPadProps {
  onDirection: (dir: Direction) => void;
}

export interface GameCanvasProps {
  stateRef: RefObject<GameState>;
  frameCount: number;
}
