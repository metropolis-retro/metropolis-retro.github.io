import { useCallback, useEffect, useRef, useState } from "react";
import { GameBoard } from "./GameBoard";
import { GameHUD } from "./GameHUD";
import { GameOverlay } from "./GameOverlay";
import { DPad } from "./DPad";
import { MuteButton } from "./MuteButton";
import { GameStatus } from "../types";
import { useGameController } from "../game/hooks/useGameController";
import { useTouchControls } from "../game/hooks/useTouchControls";
import type { SnakeGameProps } from "../types/ui";

export function SnakeGame({ className = "" }: SnakeGameProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [controlsOpen, setControlsOpen] = useState(true);

  const controller = useGameController(canvasRef);

  useTouchControls(controller.onDirection, controller.onStart, containerRef);

  const showDPad =
    isTouchDevice && controlsOpen && controller.status === GameStatus.Playing;
  const showHUD = controller.status === GameStatus.Playing || controller.status === GameStatus.Paused;

  useEffect(() => {
    if (typeof window === "undefined") return;
    const media = window.matchMedia("(pointer: coarse)");
    const update = () => setIsTouchDevice(media.matches || window.innerWidth < 1024);
    update();
    media.addEventListener("change", update);
    window.addEventListener("resize", update);
    return () => {
      media.removeEventListener("change", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;

    const onFullscreenChange = () => {
      const inFullscreen = Boolean(document.fullscreenElement);
      setIsFullscreen(inFullscreen);
    };

    document.addEventListener("fullscreenchange", onFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", onFullscreenChange);
    };
  }, []);

  const toggleFullscreen = useCallback(async () => {
    const el = containerRef.current;
    if (!el || typeof document === "undefined") return;

    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
        return;
      }

      const withWebkit = el as HTMLDivElement & {
        webkitRequestFullscreen?: () => Promise<void> | void;
      };

      if (el.requestFullscreen) {
        await el.requestFullscreen();
      } else if (withWebkit.webkitRequestFullscreen) {
        await withWebkit.webkitRequestFullscreen();
      }
    } catch {
      // Ignore fullscreen failures caused by browser restrictions.
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative flex flex-col items-center justify-center w-full h-full min-h-[400px] bg-slate-950 select-none touch-manipulation cursor-default ${isFullscreen ? "show-system-cursor" : ""} ${className}`}
      style={isFullscreen ? { cursor: "default" } : undefined}
    >
      <div className="absolute top-2 right-2 z-30 flex items-center gap-2">
        {isTouchDevice && (
          <button
            type="button"
            onClick={() => setControlsOpen((prev) => !prev)}
            className="rounded-md border border-slate-600/60 bg-slate-900/85 px-3 py-2 text-xs font-bold text-slate-200 transition-colors hover:bg-slate-800"
            aria-label={controlsOpen ? "Hide controller" : "Show controller"}
            title={controlsOpen ? "Hide controller" : "Show controller"}
          >
            {controlsOpen ? "Controller On" : "Controller Off"}
          </button>
        )}

        <button
          type="button"
          onClick={toggleFullscreen}
          className="rounded-md border border-slate-600/60 bg-slate-900/85 px-3 py-2 text-xs font-bold text-slate-200 transition-colors hover:bg-slate-800"
          aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
          title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
        >
          {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
        </button>

        <MuteButton />
      </div>

      {showHUD && (
        <div className="w-full max-w-[500px] px-2 z-10">
          <GameHUD
            score={controller.score}
            highScore={controller.highScore}
            level={controller.level}
            speed={controller.speed}
            activePowerUps={controller.activePowerUps}
          />
        </div>
      )}

      <div className="relative flex items-center justify-center">
        <GameBoard
          canvasRef={canvasRef}
          width={controller.canvasWidth}
          height={controller.canvasHeight}
        />

        <GameOverlay
          status={controller.status}
          score={controller.score}
          highScore={controller.highScore}
          lastScore={controller.lastScore}
          selectedDifficulty={controller.selectedDifficulty}
          obstaclesEnabled={controller.obstaclesEnabled}
          onSelectDifficulty={controller.onSelectDifficulty}
          onToggleObstacles={controller.onToggleObstacles}
          onStart={controller.onStart}
          onResume={controller.onResume}
        />
      </div>

      {showDPad && (
        <div className="absolute bottom-4 left-1/2 z-30 -translate-x-1/2 pointer-events-none lg:bottom-6">
          <DPad onDirection={controller.onDirection} />
        </div>
      )}
    </div>
  );
}
