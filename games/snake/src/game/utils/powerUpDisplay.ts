import { PowerUpType } from "../../types";

export interface PowerUpDisplayInfo {
  label: string;
  symbol: string;
  color: string;
  tailwindColor: string;
}

const POWER_UP_DISPLAY: Record<PowerUpType, PowerUpDisplayInfo> = {
  [PowerUpType.SlowMotion]: {
    label: "Slow",
    symbol: "⏱",
    color: "#3b82f6",
    tailwindColor: "text-blue-400",
  },
  [PowerUpType.DoublePoints]: {
    label: "Points",
    symbol: "×2",
    color: "#f59e0b",
    tailwindColor: "text-amber-400",
  },
  [PowerUpType.Phase]: {
    label: "Phase",
    symbol: "✨",
    color: "#a855f7",
    tailwindColor: "text-purple-400",
  },
};

export function getPowerUpDisplay(type: PowerUpType): PowerUpDisplayInfo {
  return POWER_UP_DISPLAY[type];
}
