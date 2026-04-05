const SCORE_FMT = new Intl.NumberFormat("en-US");

export function formatScore(value: number): string {
  return SCORE_FMT.format(value);
}
