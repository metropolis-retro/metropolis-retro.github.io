import { useRef, useEffect } from "react";

export function useGameLoop(
  callback: (timestamp: number) => void,
  active: boolean,
): void {
  const cbRef = useRef(callback);

  useEffect(() => {
    cbRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!active) return;

    let rafId = 0;
    const loop = (time: number) => {
      cbRef.current(time);
      rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [active]);
}
