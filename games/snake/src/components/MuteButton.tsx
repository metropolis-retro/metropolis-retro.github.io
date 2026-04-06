import { useState, useCallback } from "react";
import { toggleMute, isMuted } from "../game/sound";

export function MuteButton() {
  const [muted, setMuted] = useState(() => isMuted());

  const handleToggle = useCallback(() => {
    const newMuted = toggleMute();
    setMuted(newMuted);
  }, []);

  return (
    <button
      type="button"
      onClick={handleToggle}
      className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-white text-sm cursor-pointer transition-colors select-none"
      aria-label={muted ? "Unmute" : "Mute"}
      title={muted ? "Unmute" : "Mute"}
    >
      {muted ? "🔇" : "🔊"}
    </button>
  );
}
