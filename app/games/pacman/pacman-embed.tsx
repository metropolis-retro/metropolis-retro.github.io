"use client"

import { useState } from "react"

export function PacmanEmbed() {
  const [loaded, setLoaded] = useState(false)

  return (
    <div className="relative w-full overflow-hidden rounded-xl border border-border bg-black" style={{ aspectRatio: "4/3", maxHeight: "80vh" }}>
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center text-muted-foreground z-10">
          <div className="flex flex-col items-center gap-3">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-muted-foreground border-t-transparent" />
            <span className="text-sm">Loading game&hellip;</span>
          </div>
        </div>
      )}
      <iframe
        src="/games/pacman/index.html"
        title="Pac-Man Game"
        className="w-full h-full border-0"
        style={{ opacity: loaded ? 1 : 0, transition: "opacity 0.3s ease" }}
        onLoad={() => setLoaded(true)}
        allow="autoplay"
        sandbox="allow-scripts allow-same-origin"
      />
    </div>
  )
}
