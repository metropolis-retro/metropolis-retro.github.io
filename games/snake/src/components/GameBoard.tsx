import type { GameBoardProps } from "../types/ui";

export function GameBoard({ canvasRef, width, height }: GameBoardProps) {
  return (
    <div className="relative flex items-center justify-center w-full max-w-full overflow-hidden">
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="rounded-lg border border-slate-700/50 max-w-full h-auto"
        style={{ imageRendering: "pixelated" }}
      />
    </div>
  );
}
