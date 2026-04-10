export function formatLives(lives: number): string {
  return `${"❤".repeat(Math.min(lives, 10))}${lives > 10 ? "+" : ""}`;
}
