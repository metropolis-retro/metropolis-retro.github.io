export const SITE_URL = "https://metropolis-retro.github.io";

export const BASE_KEYWORDS = [
  "Metropolis Retro",
  "chess club",
  "Brisbane chess",
  "chess meetup Brisbane",
  "chess events Brisbane",
  "Australia chess club",
];

export function pageKeywords(extraKeywords: string[] = []) {
  return Array.from(new Set([...BASE_KEYWORDS, ...extraKeywords]));
};
