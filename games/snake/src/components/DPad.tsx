import { Direction } from "../types";
import type { DPadProps } from "../types/ui";

const BTN =
  "flex items-center justify-center w-14 h-14 rounded-xl bg-slate-800/80 active:bg-green-400/60 text-white text-2xl select-none touch-manipulation";

export function DPad({ onDirection }: DPadProps) {
  const fire = (dir: Direction) => (e: React.TouchEvent | React.MouseEvent) => {
    e.preventDefault();
    onDirection(dir);
  };

  return (
    <div className="grid grid-cols-3 grid-rows-3 gap-1 pointer-events-auto" style={{ width: 180, height: 180 }}>
      <span />
      <button className={BTN} onTouchStart={fire(Direction.Up)} onMouseDown={fire(Direction.Up)} aria-label="Up">▲</button>
      <span />
      <button className={BTN} onTouchStart={fire(Direction.Left)} onMouseDown={fire(Direction.Left)} aria-label="Left">◀</button>
      <span />
      <button className={BTN} onTouchStart={fire(Direction.Right)} onMouseDown={fire(Direction.Right)} aria-label="Right">▶</button>
      <span />
      <button className={BTN} onTouchStart={fire(Direction.Down)} onMouseDown={fire(Direction.Down)} aria-label="Down">▼</button>
      <span />
    </div>
  );
}
