import { useRef, useEffect, useCallback } from "react";

export function useGameLoop(
  callback: (dt: number) => void,
  active: boolean
): void {
  const cbRef = useRef(callback);
  cbRef.current = callback;

  const rafId = useRef<number>(0);
  const lastTime = useRef<number>(0);

  const loop = useCallback((time: number) => {
    if (lastTime.current === 0) lastTime.current = time;
    const dt = (time - lastTime.current) / 1000; 
    lastTime.current = time;
    cbRef.current(dt);
    rafId.current = requestAnimationFrame(loop);
  }, []);

  useEffect(() => {
    if (active) {
      lastTime.current = 0;
      rafId.current = requestAnimationFrame(loop);
    }
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [active, loop]);
}
