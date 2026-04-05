"use client"

import dynamic from "next/dynamic"

const SnakeApp = dynamic(() => import("@games/snake"), { ssr: false })

export function SnakeEmbed() {
  return (
    <div
      className="relative w-full overflow-hidden rounded-xl border border-border bg-slate-950"
      style={{ aspectRatio: "4/3", maxHeight: "80vh" }}
    >
      <SnakeApp />
    </div>
  )
}