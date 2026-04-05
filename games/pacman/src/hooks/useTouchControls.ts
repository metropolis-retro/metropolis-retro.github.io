import { useEffect, useRef, useCallback, type RefObject } from "react";
import { Direction } from "../engine/types";

const SWIPE_THRESHOLD = 20;

export function useTouchControls(
  onDirection: (dir: Direction) => void,
  onStart: () => void,
  containerRef: RefObject<HTMLElement | null>,
): void {
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  const handleTouchStart = useCallback((e: TouchEvent) => {
    const touch = e.touches[0];
    if (!touch) return;
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  }, []);

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      const start = touchStartRef.current;
      const touch = e.touches[0];
      if (!start || !touch) return;

      const dx = touch.clientX - start.x;
      const dy = touch.clientY - start.y;
      const absDx = Math.abs(dx);
      const absDy = Math.abs(dy);

      if (absDx > SWIPE_THRESHOLD || absDy > SWIPE_THRESHOLD) {
        e.preventDefault();
        if (absDx > absDy) {
          onDirection(dx > 0 ? Direction.Right : Direction.Left);
        } else {
          onDirection(dy > 0 ? Direction.Down : Direction.Up);
        }
        // Consume this touch sequence so one swipe triggers one turn.
        touchStartRef.current = null;
      }
    },
    [onDirection],
  );

  const handleTouchEnd = useCallback(
    (e: TouchEvent) => {
      const start = touchStartRef.current;
      const touch = e.changedTouches[0];
      if (!start || !touch) return;
      touchStartRef.current = null;

      // If no swipe consumed this sequence, treat it as a tap.
      onStart();
    },
    [onStart],
  );

  const handleTouchCancel = useCallback(() => {
    touchStartRef.current = null;
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const opts: AddEventListenerOptions = { passive: false };
    el.addEventListener("touchstart", handleTouchStart, opts);
    el.addEventListener("touchmove", handleTouchMove, opts);
    el.addEventListener("touchend", handleTouchEnd, opts);
    el.addEventListener("touchcancel", handleTouchCancel, opts);
    return () => {
      el.removeEventListener("touchstart", handleTouchStart);
      el.removeEventListener("touchmove", handleTouchMove);
      el.removeEventListener("touchend", handleTouchEnd);
      el.removeEventListener("touchcancel", handleTouchCancel);
    };
  }, [containerRef, handleTouchStart, handleTouchMove, handleTouchEnd, handleTouchCancel]);
}
