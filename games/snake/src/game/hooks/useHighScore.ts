import { useState, useCallback } from "react";

const STORAGE_KEY = "snake_game_high_score";

function readFromStorage(): number {
  if (typeof window === "undefined") return 0;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed = Number(raw);
    return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
  } catch {
    return 0;
  }
}

function writeToStorage(score: number): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, String(score));
  } catch {
    // Ignore storage write failures in restricted browsing contexts.
  }
}

export function useHighScore() {
  const [highScore, setHighScore] = useState<number>(readFromStorage);
  const [lastScore, setLastScore] = useState(0);

  const submitScore = useCallback((score: number) => {
    setLastScore(score);
    setHighScore((prev) => {
      const next = Math.max(prev, score);
      if (next !== prev) writeToStorage(next);
      return next;
    });
  }, []);

  return { highScore, lastScore, submitScore } as const;
}
