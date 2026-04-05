import { useRef, useState, useEffect, useCallback, type MutableRefObject } from "react";
import { type GameState, type ActiveCheats } from "../engine/types";
import {
  activateFewGhosts,
  CHEAT_CODES,
  DEFAULT_ACTIVE_CHEATS,
  MAX_CHEAT_BUFFER,
  toggleCheat,
} from "../utils/cheats";

export function useCheatCodes(stateRef: MutableRefObject<GameState>) {
  const bufferRef = useRef("");
  const [activeCheats, setActiveCheats] = useState<ActiveCheats>({ ...DEFAULT_ACTIVE_CHEATS });

  const resetCheats = useCallback(() => {
    bufferRef.current = "";
    setActiveCheats({ ...DEFAULT_ACTIVE_CHEATS });
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key.length !== 1) return;
      bufferRef.current = (bufferRef.current + e.key.toLowerCase()).slice(-MAX_CHEAT_BUFFER);
      const buf = bufferRef.current;

      for (const cheat of CHEAT_CODES) {
        if (buf.endsWith(cheat.code)) {
          bufferRef.current = "";
          const gs = stateRef.current;

          if (cheat.id === "fewGhosts") {
            activateFewGhosts(gs);
            setActiveCheats((prev) => ({ ...prev, fewGhosts: true }));
          } else {
            const newVal = toggleCheat(gs, cheat.id);
            setActiveCheats((prev) => ({ ...prev, [cheat.id]: newVal }));
          }
          break;
        }
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return { activeCheats, resetCheats } as const;
}
