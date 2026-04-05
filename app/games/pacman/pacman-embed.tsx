"use client"

import dynamic from "next/dynamic"

const PacmanApp = dynamic(() => import("@games/pacman"), { ssr: false })

export function PacmanEmbed() {
  return (
    <div
      className="relative w-full overflow-hidden rounded-xl border border-border bg-black [&_canvas]:![image-rendering:pixelated]"
      style={{ aspectRatio: "4/3", maxHeight: "80vh", fontFamily: "'Press Start 2P', monospace, system-ui" }}
    >
      <PacmanApp />
    </div>
  )
}
