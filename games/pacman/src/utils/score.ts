const SCORE_FORMATTER = new Intl.NumberFormat("en-US");

export function formatScore(value: number): string {
  return SCORE_FORMATTER.format(value);
}
