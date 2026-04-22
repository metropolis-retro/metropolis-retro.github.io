export { createInitialState, gameTick, render, changeDirection } from "./engine";
export { useGameController, useGameLoop, useInput, useHighScore, useTouchControls } from "./hooks";
export { formatScore, getPowerUpDisplay } from "./utils";
export { playEat, playPowerUp, playGameOver, playLevelUp, playStart, setMuted, isMuted, toggleMute } from "./sound";
