import { useState, useCallback } from "react";
import { GameCanvas } from "./components/GameCanvas";
import { GameOverlay } from "./components/GameOverlay";
import { DPad } from "./components/DPad";
import { Difficulty, GameStatus } from "./engine/types";
import { useHighScore } from "./hooks/useHighScore";
import { useCheatCodes } from "./hooks/useCheatCodes";
import { useGameController } from "./hooks/useGameController";

export default function App() {
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>(Difficulty.Medium);
  const { lastScore, highScore, submitScore } = useHighScore();

  const { stateRef, uiState, frameCount, onStart, onDirection } = useGameController(
    selectedDifficulty,
    submitScore,
    () => resetCheatsRef(),
  );

  const { activeCheats, resetCheats } = useCheatCodes(stateRef);
  const resetCheatsRef = useCallback(() => resetCheats(), [resetCheats]);

  const showDPad = uiState.status === GameStatus.Playing;

  return (
    <div className="w-full h-full flex items-center justify-center bg-black relative select-none">
      <GameCanvas stateRef={stateRef} frameCount={frameCount} />
      <GameOverlay
        status={uiState.status}
        score={uiState.score}
        lives={uiState.lives}
        lastScore={lastScore}
        highScore={highScore}
        selectedDifficulty={selectedDifficulty}
        onSelectDifficulty={setSelectedDifficulty}
        onStart={onStart}
        activeCheats={activeCheats}
      />
      {showDPad && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 md:hidden z-30 pointer-events-none">
          <DPad onDirection={onDirection} />
        </div>
      )}
    </div>
  );
}
