"use client"

import { useRef, useState, useCallback, useEffect } from "react"
import dynamic from "next/dynamic"

const PacmanApp = dynamic(() => import("@games/pacman"), { ssr: false })

export function PacmanEmbed() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)

  const toggleFullscreen = useCallback(async () => {
    const el = containerRef.current
    if (!el) return

    if (!document.fullscreenElement) {
      await el.requestFullscreen().catch(() => {})
    } else {
      await document.exitFullscreen().catch(() => {})
    }
  }, [])

  useEffect(() => {
    const onChange = () => setIsFullscreen(!!document.fullscreenElement)
    document.addEventListener("fullscreenchange", onChange)
    return () => document.removeEventListener("fullscreenchange", onChange)
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden border border-border bg-black [&_canvas]:![image-rendering:pixelated] pacman-embed"
      style={{
        aspectRatio: "14/15",
        maxHeight: isFullscreen ? "100vh" : "85vh",
        fontFamily: "'Press Start 2P', monospace, system-ui",
      }}
    >
      <PacmanApp />

      <style>{`
        .pacman-embed:fullscreen,
        .pacman-embed:fullscreen * {
          cursor: auto !important;
        }
        .pacman-embed:fullscreen button {
          cursor: pointer !important;
        }
      `}</style>

      <button
        onClick={toggleFullscreen}
        className="absolute top-2 right-2 z-40 flex items-center justify-center w-9 h-9 rounded-lg bg-zinc-800/70 hover:bg-zinc-700 text-white/70 hover:text-white transition-colors cursor-pointer"
        aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
        title={isFullscreen ? "Exit fullscreen (Esc)" : "Fullscreen"}
      >
        {isFullscreen ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="4 14 10 14 10 20" />
            <polyline points="20 10 14 10 14 4" />
            <line x1="14" y1="10" x2="21" y2="3" />
            <line x1="3" y1="21" x2="10" y2="14" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 3 21 3 21 9" />
            <polyline points="9 21 3 21 3 15" />
            <line x1="21" y1="3" x2="14" y2="10" />
            <line x1="3" y1="21" x2="10" y2="14" />
          </svg>
        )}
      </button>
    </div>
  )
}
