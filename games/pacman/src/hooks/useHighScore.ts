import { useState, useCallback } from "react";

const STORAGE_KEY = "pacman_high_score";

function readStoredScore(): number {
  if (typeof window === "undefined") return 0;
  const raw = window.localStorage.getItem(STORAGE_KEY);
  const parsed = Number(raw);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
}

export function useHighScore() {
  const [lastScore, setLastScore] = useState(0);
  const [highScore, setHighScore] = useState<number>(readStoredScore);

  const submitScore = useCallback((score: number) => {
    setLastScore(score);
    setHighScore((prev) => {
      const next = Math.max(prev, score);
      if (next !== prev && typeof window !== "undefined") {
        window.localStorage.setItem(STORAGE_KEY, String(next));
      }
      return next;
    });
  }, []);

  return { lastScore, highScore, submitScore } as const;
}
