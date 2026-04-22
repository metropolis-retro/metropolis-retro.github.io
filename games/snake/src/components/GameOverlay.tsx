import { GameStatus, Difficulty } from "../types";
import type { GameOverlayProps } from "../types/ui";
import { formatScore } from "../game/utils";

function Overlay({ children }: { children: React.ReactNode }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-20 backdrop-blur-sm">
      {children}
    </div>
  );
}

const DIFFICULTY_STYLES: Record<Difficulty, { active: string; label: string }> = {
  [Difficulty.Easy]: { active: "bg-green-500 text-black ring-2 ring-green-300/60", label: "Easy" },
  [Difficulty.Medium]: { active: "bg-yellow-400 text-black ring-2 ring-yellow-200/70", label: "Medium" },
  [Difficulty.Hard]: { active: "bg-red-500 text-black ring-2 ring-red-300/60", label: "Hard" },
};

export function GameOverlay({
  status,
  score,
  highScore,
  lastScore,
  selectedDifficulty,
  obstaclesEnabled,
  onSelectDifficulty,
  onToggleObstacles,
  onStart,
  onResume,
}: GameOverlayProps) {
  if (status === GameStatus.Playing) return null;

  if (status === GameStatus.Paused) {
    return (
      <Overlay>
        <div className="w-[90%] max-w-sm rounded-2xl border border-slate-700/70 bg-slate-900/90 p-8 text-center">
          <h2 className="text-yellow-400 text-3xl font-bold mb-6">PAUSED</h2>
          <button
            onClick={onResume}
            className="w-full py-3 bg-yellow-400 text-black font-extrabold rounded-lg hover:bg-yellow-300 transition-colors cursor-pointer text-sm"
          >
            RESUME
          </button>
          <p className="text-slate-400 text-xs mt-3">Press Esc or P to resume</p>
        </div>
      </Overlay>
    );
  }

  if (status === GameStatus.GameOver) {
    return (
      <Overlay>
        <div className="w-[90%] max-w-sm rounded-2xl border border-slate-700/70 bg-slate-900/90 p-8 text-center">
          <h2 className="text-red-500 text-3xl font-bold mb-4">GAME OVER</h2>
          <p className="text-white text-lg mb-1">Score: {formatScore(score)}</p>
          <p className="text-slate-300 text-sm mb-1">Previous: {formatScore(lastScore)}</p>
          <p className="text-yellow-300 text-sm mb-6">High Score: {formatScore(highScore)}</p>
          <button
            onClick={onStart}
            className="w-full py-3 bg-yellow-400 text-black font-extrabold rounded-lg hover:bg-yellow-300 transition-colors cursor-pointer text-sm"
          >
            PLAY AGAIN
          </button>
          <p className="text-slate-400 text-xs mt-3">
            <span className="hidden md:inline">Press Enter or Space to restart</span>
            <span className="md:hidden">Tap to restart</span>
          </p>
        </div>
      </Overlay>
    );
  }

  return (
    <Overlay>
      <div className="w-[92%] max-w-md rounded-2xl border border-slate-700/70 bg-slate-900/90 p-7 md:p-9">
        <h1 className="text-green-400 text-3xl md:text-5xl font-bold mb-4 text-center drop-shadow-lg">
          🐍 SNAKE
        </h1>

        <p className="text-slate-200 text-xs md:text-sm mb-6 text-center leading-relaxed">
          <span className="hidden md:inline">Use Arrow Keys or WASD to move</span>
          <span className="md:hidden">Swipe or use the D-pad to move</span>
        </p>

        <div className="grid grid-cols-3 gap-3 mb-4">
          {([Difficulty.Easy, Difficulty.Medium, Difficulty.Hard] as const).map((d) => (
            <button
              key={d}
              onClick={() => onSelectDifficulty(d)}
              className={`px-3 py-2 rounded-lg text-xs md:text-sm font-bold cursor-pointer transition-all ${
                selectedDifficulty === d
                  ? DIFFICULTY_STYLES[d].active
                  : "bg-slate-700 text-white hover:bg-slate-600"
              }`}
            >
              {DIFFICULTY_STYLES[d].label}
            </button>
          ))}
        </div>

        <button
          onClick={onToggleObstacles}
          className={`w-full mb-4 py-2 rounded-lg text-xs font-bold cursor-pointer transition-all ${
            obstaclesEnabled
              ? "bg-slate-600 text-white ring-2 ring-slate-400/50"
              : "bg-slate-800 text-slate-400 hover:bg-slate-700"
          }`}
        >
          Obstacles: {obstaclesEnabled ? "ON" : "OFF"}
        </button>

        <button
          onClick={onStart}
          className="w-full py-3 bg-green-500 text-black font-extrabold rounded-lg hover:bg-green-400 transition-colors text-sm md:text-base cursor-pointer"
        >
          START GAME
        </button>

        <div className="mt-4 flex items-center justify-between text-[11px] md:text-xs text-slate-400">
          <span>Previous: {formatScore(lastScore)}</span>
          <span>High Score: {formatScore(highScore)}</span>
        </div>

        <div className="mt-3 border-t border-slate-700/50 pt-3">
          <p className="text-slate-500 text-[10px] text-center mb-2 uppercase tracking-wider">Power-Ups</p>
          <div className="grid grid-cols-3 gap-1 text-[10px] text-center">
            <span className="bg-slate-800 rounded px-1 py-1 text-blue-400">⏱ Slow Motion</span>
            <span className="bg-slate-800 rounded px-1 py-1 text-amber-400">×2 Double Points</span>
            <span className="bg-slate-800 rounded px-1 py-1 text-purple-400">✨ Phase Mode</span>
          </div>
        </div>

        <p className="text-slate-500 text-[10px] text-center mt-3">
          Press Enter / Space to start
        </p>
      </div>
    </Overlay>
  );
}
