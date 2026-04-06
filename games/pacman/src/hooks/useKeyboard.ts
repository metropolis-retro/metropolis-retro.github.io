import { useEffect } from "react";
import { Direction } from "../engine/types";

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

export function useKeyboard(
  onDirection: (dir: Direction) => void,
  onStart: () => void
): void {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const dir = KEY_MAP[e.key];
      if (dir) {
        e.preventDefault();
        onDirection(dir);
      }
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onStart();
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onDirection, onStart]);
}
