import { GameStatus } from "../engine/types";

export function canStartGame(status: GameStatus): boolean {
  return (
    status === GameStatus.Start ||
    status === GameStatus.GameOver ||
    status === GameStatus.Win
  );
}
