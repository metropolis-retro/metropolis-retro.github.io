import { useEffect, useState } from "react";
import type { GameHUDProps } from "../types/ui";
import type { PowerUpType } from "../types";
import { formatScore } from "../game/utils";
import { getPowerUpDisplay } from "../game/utils";

function PowerUpIndicator({ type, expiresAt, now }: { type: PowerUpType; expiresAt: number; now: number }) {
  const remaining = Math.max(0, Math.ceil((expiresAt - now) / 1000));
  const { symbol, label, tailwindColor } = getPowerUpDisplay(type);

  return (
    <span className={`${tailwindColor} text-xs font-bold animate-pulse`}>
      {symbol} {label} ({remaining}s)
    </span>
  );
}

export function GameHUD({ score, highScore, level, speed, activePowerUps }: GameHUDProps) {
  const [now, setNow] = useState(0);

  useEffect(() => {
    if (activePowerUps.length === 0) return;

    const id = window.setInterval(() => {
      setNow(performance.now());
    }, 250);

    return () => {
      window.clearInterval(id);
    };
  }, [activePowerUps.length]);

  return (
    <div className="flex flex-wrap items-center justify-between gap-2 px-1 py-2 text-sm select-none">
      <div className="flex items-center gap-4">
        <span className="text-white font-bold">
          Score: <span className="text-green-400">{formatScore(score)}</span>
        </span>
        <span className="text-slate-400 text-xs">
          Best: {formatScore(highScore)}
        </span>
      </div>

      <div className="flex items-center gap-3">
        {activePowerUps.map((p) => (
          <PowerUpIndicator key={p.type} type={p.type} expiresAt={p.expiresAt} now={now} />
        ))}
      </div>

      <div className="flex items-center gap-4">
        <span className="text-slate-300 text-xs">
          Lvl <span className="text-cyan-400 font-bold">{level}</span>
        </span>
        <span className="text-slate-300 text-xs">
          Speed <span className="text-yellow-400 font-bold">{Math.round(speed)}</span>
        </span>
      </div>
    </div>
  );
}
