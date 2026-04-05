import { useRef, useState, useCallback } from "react";
import { createInitialState } from "../engine/gameState";
import { tick } from "../engine/gameTick";
import { GameStatus, Direction, type Difficulty, type GameState } from "../engine/types";
import { playGameStart } from "../engine/sound";
import { useGameLoop } from "./useGameLoop";
import { useKeyboard } from "./useKeyboard";
import { type UiState } from "../types/ui";
import { canStartGame } from "../utils/game-status";
import { INITIAL_UI_STATE, PLAYING_UI_STATE, hasUiStateChanged, toUiState } from "../utils/ui-state";

export function useGameController(
  selectedDifficulty: Difficulty,
  onGameEnd: (score: number) => void,
  onResetCheats: () => void,
  stateRef: React.MutableRefObject<GameState>,
) {
  const prevStatusRef = useRef<GameStatus>(GameStatus.Start);
  const [frameCount, setFrameCount] = useState(0);

  const onGameEndRef = useRef(onGameEnd);
  onGameEndRef.current = onGameEnd;
  const onResetCheatsRef = useRef(onResetCheats);
  onResetCheatsRef.current = onResetCheats;
  const difficultyRef = useRef(selectedDifficulty);
  difficultyRef.current = selectedDifficulty;

  const [uiState, setUiState] = useState<UiState>(INITIAL_UI_STATE);

  const onTick = useCallback((dt: number) => {
    const state = stateRef.current;
    tick(state, dt);

    const previousStatus = prevStatusRef.current;
    const currentStatus = state.status;

    if (
      previousStatus === GameStatus.Playing &&
      currentStatus !== GameStatus.Playing
    ) {
      onGameEndRef.current(state.score);
    }
    prevStatusRef.current = currentStatus;

    setUiState((prev) => {
      const next = toUiState(state);
      return hasUiStateChanged(prev, next) ? next : prev;
    });

    setFrameCount((c) => c + 1);
  }, []);

  const isPlaying = uiState.status === GameStatus.Playing;
  useGameLoop(onTick, isPlaying);

  const onDirection = useCallback((dir: Direction) => {
    const state = stateRef.current;
    if (state.status === GameStatus.Playing) {
      state.nextDirection = dir;
    }
  }, []);

  const onStart = useCallback(() => {
    const state = stateRef.current;
    if (canStartGame(state.status)) {
      stateRef.current = createInitialState(difficultyRef.current);
      stateRef.current.status = GameStatus.Playing;
      playGameStart();
      setUiState(PLAYING_UI_STATE);
      prevStatusRef.current = GameStatus.Playing;
      onResetCheatsRef.current();
    }
  }, []);

  useKeyboard(onDirection, onStart);

  return { uiState, frameCount, onStart, onDirection } as const;
}
