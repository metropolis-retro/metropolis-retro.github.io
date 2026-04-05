import { useRef } from "react";
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

  const controller = useGameController(canvasRef);

  useTouchControls(controller.onDirection, controller.onStart, containerRef);

  const showDPad = controller.status === GameStatus.Playing;
  const showHUD = controller.status === GameStatus.Playing || controller.status === GameStatus.Paused;

  return (
    <div
      ref={containerRef}
      className={`relative flex flex-col items-center justify-center w-full h-full min-h-[400px] bg-slate-950 select-none ${className}`}
    >
      <div className="absolute top-2 right-2 z-30">
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
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 md:hidden z-30 pointer-events-none">
          <DPad onDirection={controller.onDirection} />
        </div>
      )}
    </div>
  );
}
