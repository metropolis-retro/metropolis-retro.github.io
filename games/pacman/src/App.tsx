import { useRef, useState, useCallback, useEffect } from "react";
import { GameCanvas } from "./components/GameCanvas";
import { GameOverlay } from "./components/GameOverlay";
import { useGameLoop } from "./hooks/useGameLoop";
import { useKeyboard } from "./hooks/useKeyboard";
import { createInitialState } from "./engine/gameState";
import { tick } from "./engine/gameTick";
import { type GameState, GameStatus, Direction, Difficulty, type ActiveCheats } from "./engine/types";

export default function App() {
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>(Difficulty.Medium);
  const stateRef = useRef<GameState>(createInitialState(selectedDifficulty));
  const prevStatusRef = useRef<GameStatus>(GameStatus.Start);
  const [lastScore, setLastScore] = useState(0);
  const [highScore, setHighScore] = useState<number>(() => {
    if (typeof window === "undefined") return 0;
    const raw = window.localStorage.getItem("pacman_high_score");
    const parsed = Number(raw);
    return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
  });

  const [uiState, setUiState] = useState({
    status: GameStatus.Start,
    score: 0,
    lives: 3,
  });

  const [frameCount, setFrameCount] = useState(0);

  const [activeCheats, setActiveCheats] = useState<ActiveCheats>({
    slowGhosts: false,
    fewGhosts: false,
    infiniteLives: false,
  });
  const cheatBufferRef = useRef<string>("");

  const onTick = useCallback((dt: number) => {
    const state = stateRef.current;
    tick(state, dt);

    const previousStatus = prevStatusRef.current;
    const currentStatus = state.status;
    if (
      previousStatus === GameStatus.Playing &&
      currentStatus !== GameStatus.Playing
    ) {
      const finishedScore = state.score;
      setLastScore(finishedScore);
      setHighScore((prev) => {
        const next = Math.max(prev, finishedScore);
        if (next !== prev && typeof window !== "undefined") {
          window.localStorage.setItem("pacman_high_score", String(next));
        }
        return next;
      });
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
    if (
      state.status === GameStatus.Start ||
      state.status === GameStatus.GameOver ||
      state.status === GameStatus.Win
    ) {
      stateRef.current = createInitialState(selectedDifficulty);
      stateRef.current.status = GameStatus.Playing;
      setUiState({
        status: GameStatus.Playing,
        score: 0,
        lives: 3,
      });
      prevStatusRef.current = GameStatus.Playing;
      cheatBufferRef.current = "";
      setActiveCheats({ slowGhosts: false, fewGhosts: false, infiniteLives: false });
    }
  }, [selectedDifficulty]);

  useKeyboard(onDirection, onStart);

  useEffect(() => {
    const CHEATS: Array<{ code: string; id: keyof ActiveCheats }> = [
      { code: "slowmo", id: "slowGhosts" },
      { code: "ghost",  id: "fewGhosts"  },
      { code: "lives",  id: "infiniteLives" },
    ];
    const MAX_BUF = 8;

    const handler = (e: KeyboardEvent) => {
      if (e.key.length !== 1) return;
      cheatBufferRef.current = (cheatBufferRef.current + e.key.toLowerCase()).slice(-MAX_BUF);
      const buf = cheatBufferRef.current;

      for (const cheat of CHEATS) {
        if (buf.endsWith(cheat.code)) {
          cheatBufferRef.current = "";
          const gs = stateRef.current;

          if (cheat.id === "fewGhosts") {
            if (!gs.cheats.fewGhosts && gs.ghosts.length > 1) {
              gs.ghosts = gs.ghosts.filter((_, i) => i % 2 === 0);
            }
            gs.cheats.fewGhosts = true;
            setActiveCheats((prev) => ({ ...prev, fewGhosts: true }));
          } else {
            const newVal = !gs.cheats[cheat.id];
            gs.cheats[cheat.id] = newVal;
            setActiveCheats((prev) => ({ ...prev, [cheat.id]: newVal }));
          }
          break;
        }
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center bg-black relative select-none">
      <GameCanvas stateRef={stateRef} frameCount={frameCount} />
      <GameOverlay
        status={uiState.status}
        score={uiState.score}
        lives={uiState.lives}
        lastScore={lastScore}
        highScore={highScore}
        selectedDifficulty={selectedDifficulty}
        onSelectDifficulty={setSelectedDifficulty}
        onStart={onStart}
        activeCheats={activeCheats}
      />
    </div>
  );
}
