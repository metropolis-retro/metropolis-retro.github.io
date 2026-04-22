import { useEffect, useCallback } from "react";
import { Direction } from "../../types";

const KEY_MAP: Record<string, Direction> = {
  ArrowUp: Direction.Up,
  ArrowDown: Direction.Down,
  ArrowLeft: Direction.Left,
  ArrowRight: Direction.Right,
  w: Direction.Up,
  s: Direction.Down,
  a: Direction.Left,
  d: Direction.Right,
  W: Direction.Up,
  S: Direction.Down,
  A: Direction.Left,
  D: Direction.Right,
};

export function useInput(
  onDirection: (dir: Direction) => void,
  onPause: () => void,
  onStart: () => void,
): void {
  const handler = useCallback(
    (e: KeyboardEvent) => {
      const dir = KEY_MAP[e.key];
      if (dir) {
        e.preventDefault();
        onDirection(dir);
        return;
      }

      if (e.key === "Escape" || e.key === "p" || e.key === "P") {
        e.preventDefault();
        onPause();
        return;
      }

      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onStart();
      }
    },
    [onDirection, onPause, onStart],
  );

  useEffect(() => {
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [handler]);
}
