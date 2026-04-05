import { useRef, useState, useCallback } from "react";
import { createInitialState } from "../engine/gameState";
import { tick } from "../engine/gameTick";
import { GameStatus, Direction, type Difficulty, type GameState } from "../engine/types";
import { playGameStart } from "../engine/sound";
import { useGameLoop } from "./useGameLoop";
import { useKeyboard } from "./useKeyboard";
import { useTouchControls } from "./useTouchControls";

interface UiState {
  status: GameStatus;
  score: number;
  lives: number;
}

export function useGameController(
  selectedDifficulty: Difficulty,
  onGameEnd: (score: number) => void,
  onResetCheats: () => void,
) {
  const stateRef = useRef<GameState>(createInitialState(selectedDifficulty));
  const prevStatusRef = useRef<GameStatus>(GameStatus.Start);
  const [frameCount, setFrameCount] = useState(0);

  const [uiState, setUiState] = useState<UiState>({
    status: GameStatus.Start,
    score: 0,
    lives: 3,
  });

  const onTick = useCallback((dt: number) => {
    const state = stateRef.current;
    tick(state, dt);

    const previousStatus = prevStatusRef.current;
    const currentStatus = state.status;

    if (
      previousStatus === GameStatus.Playing &&
      currentStatus !== GameStatus.Playing
    ) {
      onGameEnd(state.score);
    }
    prevStatusRef.current = currentStatus;

    setUiState((prev) => {
      if (
        prev.status !== state.status ||
        prev.score !== state.score ||
        prev.lives !== state.lives
      ) {
        return {
          status: state.status,
          score: state.score,
          lives: state.lives,
        };
      }
      return prev;
    });

    setFrameCount((c) => c + 1);
  }, [onGameEnd]);

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
    if (
      state.status === GameStatus.Start ||
      state.status === GameStatus.GameOver ||
      state.status === GameStatus.Win
    ) {
      stateRef.current = createInitialState(selectedDifficulty);
      stateRef.current.status = GameStatus.Playing;
      playGameStart();
      setUiState({ status: GameStatus.Playing, score: 0, lives: 3 });
      prevStatusRef.current = GameStatus.Playing;
      onResetCheats();
    }
  }, [selectedDifficulty, onResetCheats]);

  useKeyboard(onDirection, onStart);
  useTouchControls(onDirection, onStart);

  return { stateRef, uiState, frameCount, onStart, onDirection } as const;
}
