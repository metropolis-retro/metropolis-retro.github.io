"use client"

import { useEffect, useState } from "react"
import { Moon, Sun, Shuffle, RefreshCw } from "lucide-react"
import { cn } from "@/lib/utils"
import { useThemeMode } from "@/components/theme-provider"

const ICONS = {
  light: Sun,
  dark: Moon,
  random: Shuffle,
} as const

const LABELS = {
  light: "Light mode — click for dark",
  dark: "Dark mode — click for random",
  random: "Random mode — click for light",
} as const

export function ThemeToggle({ className }: { className?: string }) {
  const { mode, cycleMode, shuffleRandom } = useThemeMode()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) {
    return (
      <div className={cn("flex items-center gap-1", className)}>
        <button
          className="relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-secondary transition-colors"
          aria-label="Toggle theme"
        >
          <span className="h-4 w-4" />
        </button>
      </div>
    )
  }

  const Icon = ICONS[mode]

  return (
    <div className={cn("flex items-center gap-1", className)}>
      <button
        onClick={cycleMode}
        className="relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-secondary transition-colors hover:bg-accent cursor-pointer"
        aria-label={LABELS[mode]}
      >
        <Icon className="h-4 w-4" />
      </button>

      {mode === "random" && (
        <button
          onClick={shuffleRandom}
          className="relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-secondary transition-colors hover:bg-accent cursor-pointer"
          aria-label="Regenerate random palette"
        >
          <RefreshCw className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  )
}
