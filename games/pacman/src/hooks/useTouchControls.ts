import { useEffect, useRef, useCallback } from "react";
import { Direction } from "../engine/types";

const SWIPE_THRESHOLD = 20;

export function useTouchControls(
  onDirection: (dir: Direction) => void,
  onStart: () => void,
): void {
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  const handleTouchStart = useCallback((e: TouchEvent) => {
    const touch = e.touches[0];
    if (!touch) return;
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  }, []);

  const handleTouchEnd = useCallback(
    (e: TouchEvent) => {
      const start = touchStartRef.current;
      const touch = e.changedTouches[0];
      if (!start || !touch) return;
      touchStartRef.current = null;

      const dx = touch.clientX - start.x;
      const dy = touch.clientY - start.y;
      const absDx = Math.abs(dx);
      const absDy = Math.abs(dy);

      if (absDx < SWIPE_THRESHOLD && absDy < SWIPE_THRESHOLD) {
        onStart();
        return;
      }

      if (absDx > absDy) {
        onDirection(dx > 0 ? Direction.Right : Direction.Left);
      } else {
        onDirection(dy > 0 ? Direction.Down : Direction.Up);
      }
    },
    [onDirection, onStart],
  );

  useEffect(() => {
    const opts: AddEventListenerOptions = { passive: true };
    window.addEventListener("touchstart", handleTouchStart, opts);
    window.addEventListener("touchend", handleTouchEnd, opts);
    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [handleTouchStart, handleTouchEnd]);
}
