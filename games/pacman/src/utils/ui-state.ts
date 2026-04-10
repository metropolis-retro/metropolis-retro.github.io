import { GameStatus, type GameState } from "../engine/types";
import { INITIAL_LIVES } from "../engine/constants";
import type { UiState } from "../types/ui";

export const INITIAL_UI_STATE: UiState = {
  status: GameStatus.Start,
  score: 0,
  lives: INITIAL_LIVES,
};

export const PLAYING_UI_STATE: UiState = {
  status: GameStatus.Playing,
  score: 0,
  lives: INITIAL_LIVES,
};

export function toUiState(state: GameState): UiState {
  return {
    status: state.status,
    score: state.score,
    lives: state.lives,
  };
}

export function hasUiStateChanged(prev: UiState, next: UiState): boolean {
  return (
    prev.status !== next.status ||
    prev.score !== next.score ||
    prev.lives !== next.lives
  );
}
