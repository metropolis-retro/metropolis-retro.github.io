import { type ActiveCheats, type GameState } from "../engine/types";

export type CheatId = keyof ActiveCheats;

export const CHEAT_CODES: Array<{ code: string; id: CheatId }> = [
  { code: "slowmo", id: "slowGhosts" },
  { code: "ghost", id: "fewGhosts" },
  { code: "lives", id: "infiniteLives" },
];

export const MAX_CHEAT_BUFFER = 8;

export const DEFAULT_ACTIVE_CHEATS: ActiveCheats = {
  slowGhosts: false,
  fewGhosts: false,
  infiniteLives: false,
};

export function activateFewGhosts(state: GameState): void {
  if (!state.cheats.fewGhosts && state.ghosts.length > 1) {
    state.ghosts = state.ghosts.filter((_, i) => i % 2 === 0);
  }
  state.cheats.fewGhosts = true;
}

export function toggleCheat(state: GameState, id: CheatId): boolean {
  const nextValue = !state.cheats[id];
  state.cheats[id] = nextValue;
  return nextValue;
}
