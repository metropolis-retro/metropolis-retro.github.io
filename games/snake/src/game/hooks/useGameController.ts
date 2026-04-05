import { useRef, useState, useCallback, useEffect } from "react";
import { GameStatus, Direction, type GameState, type GameConfig } from "../../types";
import { createInitialState, gameTick, render, changeDirection } from "../engine";
import { createGameConfig } from "../../config";
import { Difficulty } from "../../types";
import { useGameLoop } from "./useGameLoop";
import { useInput } from "./useInput";
import { useHighScore } from "./useHighScore";
import { playEat, playPowerUp, playGameOver, playLevelUp, playStart } from "../sound";

export interface GameControllerState {
  status: GameStatus;
  score: number;
  level: number;
  speed: number;
  highScore: number;
  lastScore: number;
  selectedDifficulty: Difficulty;
  obstaclesEnabled: boolean;
}

export function useGameController(canvasRef: React.RefObject<HTMLCanvasElement | null>) {
  const [selectedDifficulty, setSelectedDifficulty] = useState(Difficulty.Medium);
  const [obstaclesEnabled, setObstaclesEnabled] = useState(false);
  const { highScore, lastScore, submitScore } = useHighScore();

  const configRef = useRef<GameConfig>(createGameConfig(selectedDifficulty, { obstaclesEnabled }));
  const stateRef = useRef<GameState>(createInitialState(configRef.current));
  const frameCountRef = useRef(0);

  const [controllerState, setControllerState] = useState<GameControllerState>({
    status: GameStatus.Idle,
    score: 0,
    level: 1,
    speed: configRef.current.initialSpeed,
    highScore,
    lastScore: 0,
    selectedDifficulty,
    obstaclesEnabled,
  });

  const syncUiState = useCallback(() => {
    const s = stateRef.current;
    setControllerState((prev) => {
      if (
        prev.status === s.status &&
        prev.score === s.score &&
        prev.level === s.level &&
        prev.speed === s.speed
      ) {
        return prev;
      }
      return {
        ...prev,
        status: s.status,
        score: s.score,
        level: s.level,
        speed: s.speed,
      };
    });
  }, []);

  const renderFrame = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    render(ctx, stateRef.current, configRef.current, frameCountRef.current);
  }, [canvasRef]);

  const onTick = useCallback(
    (timestamp: number) => {
      const state = stateRef.current;
      if (state.status !== GameStatus.Playing) return;

      const result = gameTick(state, configRef.current, timestamp);

      if (result.ate) playEat();
      if (result.powerUpCollected) playPowerUp();
      if (result.leveledUp) playLevelUp();
      if (result.died) {
        playGameOver();
        submitScore(state.score);
      }

      frameCountRef.current++;
      renderFrame();
      syncUiState();
    },
    [renderFrame, syncUiState, submitScore],
  );

  const isPlaying = controllerState.status === GameStatus.Playing;
  useGameLoop(onTick, isPlaying);

  const onDirection = useCallback((dir: Direction) => {
    const state = stateRef.current;
    if (state.status === GameStatus.Playing) {
      changeDirection(state, dir);
    }
  }, []);

  const onStart = useCallback(() => {
    const state = stateRef.current;
    if (state.status === GameStatus.Playing) return;

    const config = createGameConfig(selectedDifficulty, { obstaclesEnabled });
    configRef.current = config;
    const newState = createInitialState(config);
    newState.status = GameStatus.Playing;
    newState.lastMoveTime = performance.now();
    stateRef.current = newState;

    playStart();
    frameCountRef.current = 0;
    renderFrame();

    setControllerState((prev) => ({
      ...prev,
      status: GameStatus.Playing,
      score: 0,
      level: 1,
      speed: config.initialSpeed,
      highScore: prev.highScore,
    }));
  }, [selectedDifficulty, obstaclesEnabled, renderFrame]);

  const resumeGame = useCallback(() => {
    const state = stateRef.current;
    if (state.status !== GameStatus.Paused) return;
    state.status = GameStatus.Playing;
    state.lastMoveTime = performance.now();
    setControllerState((prev) => ({ ...prev, status: GameStatus.Playing }));
  }, []);

  const onPause = useCallback(() => {
    const state = stateRef.current;
    if (state.status === GameStatus.Playing) {
      state.status = GameStatus.Paused;
      setControllerState((prev) => ({ ...prev, status: GameStatus.Paused }));
    } else if (state.status === GameStatus.Paused) {
      resumeGame();
    }
  }, [resumeGame]);

  const onSelectDifficulty = useCallback((d: Difficulty) => {
    setSelectedDifficulty(d);
    setControllerState((prev) => ({ ...prev, selectedDifficulty: d }));
  }, []);

  const onToggleObstacles = useCallback(() => {
    setObstaclesEnabled((prev) => {
      const next = !prev;
      setControllerState((p) => ({ ...p, obstaclesEnabled: next }));
      return next;
    });
  }, []);

  useInput(onDirection, onPause, onStart);

  useEffect(() => {
    setControllerState((prev) => {
      if (prev.highScore === highScore && prev.lastScore === lastScore) return prev;
      return { ...prev, highScore, lastScore };
    });
  }, [highScore, lastScore]);

  useEffect(() => {
    renderFrame();
  }, [renderFrame]);

  return {
    ...controllerState,
    activePowerUps: stateRef.current.activePowerUps,
    onStart,
    onPause,
    onResume: resumeGame,
    onDirection,
    onSelectDifficulty,
    onToggleObstacles,
    canvasWidth: configRef.current.gridWidth * configRef.current.cellSize,
    canvasHeight: configRef.current.gridHeight * configRef.current.cellSize,
  } as const;
}
