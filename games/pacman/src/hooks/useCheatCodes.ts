import { useRef, useState, useEffect, useCallback, type MutableRefObject } from "react";
import { type GameState, type ActiveCheats } from "../engine/types";

const CHEATS: Array<{ code: string; id: keyof ActiveCheats }> = [
  { code: "slowmo", id: "slowGhosts" },
  { code: "ghost",  id: "fewGhosts" },
  { code: "lives",  id: "infiniteLives" },
];
const MAX_BUF = 8;

const INITIAL_CHEATS: ActiveCheats = {
  slowGhosts: false,
  fewGhosts: false,
  infiniteLives: false,
};

export function useCheatCodes(stateRef: MutableRefObject<GameState>) {
  const bufferRef = useRef("");
  const [activeCheats, setActiveCheats] = useState<ActiveCheats>({ ...INITIAL_CHEATS });

  const resetCheats = useCallback(() => {
    bufferRef.current = "";
    setActiveCheats({ ...INITIAL_CHEATS });
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key.length !== 1) return;
      bufferRef.current = (bufferRef.current + e.key.toLowerCase()).slice(-MAX_BUF);
      const buf = bufferRef.current;

      for (const cheat of CHEATS) {
        if (buf.endsWith(cheat.code)) {
          bufferRef.current = "";
          const gs = stateRef.current;

          if (cheat.id === "fewGhosts") {
            if (!gs.cheats.fewGhosts && gs.ghosts.length > 1) {
              gs.ghosts = gs.ghosts.filter((_, i) => i % 2 === 0);
            }
            gs.cheats.fewGhosts = true;
            setActiveCheats((prev) => ({ ...prev, fewGhosts: true }));
          } else {
            const newVal = !gs.cheats[cheat.id];
            gs.cheats[cheat.id] = newVal;
            setActiveCheats((prev) => ({ ...prev, [cheat.id]: newVal }));
          }
          break;
        }
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [stateRef]);

  return { activeCheats, resetCheats } as const;
}
