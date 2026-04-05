import { useState, useCallback } from "react";
import { readStoredHighScore, writeStoredHighScore } from "../utils/high-score-storage";

export function useHighScore() {
  const [lastScore, setLastScore] = useState(0);
  const [previousScore, setPreviousScore] = useState(0);
  const [highScore, setHighScore] = useState<number>(readStoredHighScore);

  const submitScore = useCallback((score: number) => {
    setLastScore((prev) => {
      setPreviousScore(prev);
      return score;
    });
    setHighScore((prev) => {
      const next = Math.max(prev, score);
      if (next !== prev) writeStoredHighScore(next);
      return next;
    });
  }, []);

  return { lastScore, previousScore, highScore, submitScore } as const;
}
