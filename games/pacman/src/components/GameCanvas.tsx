import { useRef, useEffect, useCallback } from "react";
import { CANVAS_W, CANVAS_H } from "../engine/constants";
import { render } from "../engine/renderer";
import { type GameCanvasProps } from "../types/ui";

export function GameCanvas({ stateRef, frameCount }: GameCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const updateScale = useCallback(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const containerW = container.clientWidth;
    const containerH = container.clientHeight;
    const scaleX = containerW / CANVAS_W;
    const scaleY = containerH / CANVAS_H;
    const scale = Math.min(scaleX, scaleY);

    canvas.style.transform = `scale(${scale})`;
    canvas.style.transformOrigin = "top left";
    canvas.style.position = "absolute";
    canvas.style.left = `${(containerW - CANVAS_W * scale) / 2}px`;
    canvas.style.top = `${(containerH - CANVAS_H * scale) / 2}px`;
  }, []);

  useEffect(() => {
    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, [updateScale]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !stateRef.current) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    render(ctx, stateRef.current, frameCount);
  }, [frameCount, stateRef]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-hidden"
    >
      <canvas
        ref={canvasRef}
        width={CANVAS_W}
        height={CANVAS_H}
        className="image-rendering-pixelated"
      />
    </div>
  );
}
