import { GameStatus, Difficulty, type ActiveCheats } from "../engine/types";

interface GameOverlayProps {
  status: GameStatus;
  score: number;
  lives: number;
  lastScore: number;
  highScore: number;
  selectedDifficulty: Difficulty;
  onSelectDifficulty: (difficulty: Difficulty) => void;
  onStart: () => void;
  activeCheats: ActiveCheats;
}

export function GameOverlay({
  status,
  score,
  lives,
  lastScore,
  highScore,
  selectedDifficulty,
  onSelectDifficulty,
  onStart,
  activeCheats,
}: GameOverlayProps) {
  return (
    <>
      {status === GameStatus.Playing && (
        <div className="absolute top-0 left-0 right-0 flex justify-between px-4 py-2 text-white text-sm z-10 pointer-events-none select-none">
          <span>Score: {score}</span>
          <div className="flex gap-2 items-center">
            {activeCheats.slowGhosts && (
              <span className="text-cyan-400 text-xs font-bold animate-pulse">🐢 SLOWMO</span>
            )}
            {activeCheats.fewGhosts && (
              <span className="text-green-400 text-xs font-bold">👻 GHOST</span>
            )}
            {activeCheats.infiniteLives && (
              <span className="text-pink-400 text-xs font-bold animate-pulse">♾ LIVES</span>
            )}
          </div>
          <span>Lives: {"❤".repeat(Math.min(lives, 10))}{lives > 10 ? "+" : ""}</span>
        </div>
      )}

      {status === GameStatus.Start && (
        <Overlay>
          <div className="grid gap-3 w-[92%] max-w-md rounded-2xl border border-zinc-700/70 bg-zinc-900/80 backdrop-blur-sm shadow-2xl p-7 md:p-9">
            <h1 className="text-yellow-400 text-3xl md:text-5xl font-bold mb-4 text-center drop-shadow-lg">
              PAC-MAN
            </h1>
            <p className="text-zinc-200 text-xs md:text-sm mb-6 text-center leading-relaxed">
              <span className="hidden md:inline">Use Arrow Keys or WASD to move</span>
              <span className="md:hidden">Swipe or use the D-pad to move</span>
            </p>
            <div className="grid grid-cols-3 gap-3 mb-6">
              <button
                onClick={() => onSelectDifficulty(Difficulty.Easy)}
                className={`px-3 py-2 rounded-lg text-xs md:text-sm font-bold cursor-pointer transition-all ${selectedDifficulty === Difficulty.Easy ? "bg-green-500 text-black ring-2 ring-green-300/60" : "bg-zinc-700 text-white hover:bg-zinc-600"}`}
              >
                Easy
              </button>
              <button
                onClick={() => onSelectDifficulty(Difficulty.Medium)}
                className={`px-3 py-2 rounded-lg text-xs md:text-sm font-bold cursor-pointer transition-all ${selectedDifficulty === Difficulty.Medium ? "bg-yellow-400 text-black ring-2 ring-yellow-200/70" : "bg-zinc-700 text-white hover:bg-zinc-600"}`}
              >
                Medium
              </button>
              <button
                onClick={() => onSelectDifficulty(Difficulty.Hard)}
                className={`px-3 py-2 rounded-lg text-xs md:text-sm font-bold cursor-pointer transition-all ${selectedDifficulty === Difficulty.Hard ? "bg-red-500 text-black ring-2 ring-red-300/60" : "bg-zinc-700 text-white hover:bg-zinc-600"}`}
              >
                Hard
              </button>
            </div>
            <div className="pt-2">
              <button
                onClick={onStart}
                className="w-full mt-2 py-3 bg-yellow-400 text-black font-extrabold rounded-lg hover:bg-yellow-300 transition-colors text-sm md:text-base cursor-pointer"
              >
                START GAME
              </button>
            </div>
            <div className="mt-4 flex items-center justify-between text-[11px] md:text-xs text-zinc-400">
              <span>Last: {lastScore}</span>
              <span>Best: {highScore}</span>
            </div>
            <div className="mt-1 flex items-center justify-between text-[11px] md:text-xs text-zinc-400">
              <span>Selected: {selectedDifficulty}</span>
              <span>Enter / Space</span>
            </div>
            <div className="mt-3 border-t border-zinc-700/50 pt-3">
              <p className="text-zinc-500 text-[10px] text-center mb-1 uppercase tracking-wider">Cheat Codes (type during play)</p>
              <div className="grid grid-cols-3 gap-1 text-[10px] text-center">
                <span className="bg-zinc-800 rounded px-1 py-0.5 text-cyan-400"><span className="font-mono">slowmo</span><br/>🐢 Slow ghosts</span>
                <span className="bg-zinc-800 rounded px-1 py-0.5 text-green-400"><span className="font-mono">ghost</span><br/>👻 Half ghosts</span>
                <span className="bg-zinc-800 rounded px-1 py-0.5 text-pink-400"><span className="font-mono">lives</span><br/>♾ Infinite lives</span>
              </div>
            </div>
          </div>
        </Overlay>
      )}

      {status === GameStatus.GameOver && (
        <Overlay>
          <EndScreen
            title="GAME OVER"
            titleColor="text-red-500"
            score={score}
            lastScore={lastScore}
            highScore={highScore}
            onStart={onStart}
          />
        </Overlay>
      )}

      {status === GameStatus.Win && (
        <Overlay>
          <EndScreen
            title="YOU WIN!"
            titleColor="text-green-400"
            score={score}
            lastScore={lastScore}
            highScore={highScore}
            onStart={onStart}
          />
        </Overlay>
      )}
    </>
  );
}

function EndScreen({
  title,
  titleColor,
  score,
  lastScore,
  highScore,
  onStart,
}: {
  title: string;
  titleColor: string;
  score: number;
  lastScore: number;
  highScore: number;
  onStart: () => void;
}) {
  return (
    <div className="w-[92%] max-w-md rounded-2xl border border-zinc-700/70 bg-zinc-900/80 backdrop-blur-sm shadow-2xl p-7 md:p-9 text-center">
      <h1 className={`${titleColor} text-3xl md:text-5xl font-bold mb-4`}>
        {title}
      </h1>
      <p className="text-white text-lg mb-2">Score: {score}</p>
      <p className="text-zinc-300 text-sm mb-1">Last Score: {lastScore}</p>
      <p className="text-yellow-300 text-sm mb-6">High Score: {highScore}</p>
      <button
        onClick={onStart}
        className="px-6 py-3 bg-yellow-400 text-black font-bold rounded-lg hover:bg-yellow-300 transition-colors cursor-pointer"
      >
        PLAY AGAIN
      </button>
      <p className="text-gray-400 text-xs mt-4">
        <span className="hidden md:inline">or press Enter / Space</span>
        <span className="md:hidden">Tap anywhere to restart</span>
      </p>
    </div>
  );
}

function Overlay({ children }: { children: React.ReactNode }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 z-20">
      {children}
    </div>
  );
}
