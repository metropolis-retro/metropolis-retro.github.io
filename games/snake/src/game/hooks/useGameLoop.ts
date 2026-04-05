import { useRef, useEffect, useCallback } from "react";

export function useGameLoop(
  callback: (timestamp: number) => void,
  active: boolean,
): void {
  const cbRef = useRef(callback);
  cbRef.current = callback;

  const rafId = useRef(0);

  const loop = useCallback((time: number) => {
    cbRef.current(time);
    rafId.current = requestAnimationFrame(loop);
  }, []);

  useEffect(() => {
    if (active) {
      rafId.current = requestAnimationFrame(loop);
    }
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [active, loop]);
}
