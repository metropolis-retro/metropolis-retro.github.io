"use client"

import * as React from "react"
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react"
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes"
import type { ThemeMode } from "@/lib/theme/types"
import {
  generateRandomTokens,
  applyTokensToDOM,
  clearTokenOverrides,
  persistMode,
  readPersistedMode,
  persistPalette,
  readPersistedPalette,
  clearPersistedPalette,
} from "@/lib/theme"

interface ThemeModeContextValue {
  mode: ThemeMode
  cycleMode: () => void
  setMode: (m: ThemeMode) => void
  shuffleRandom: () => void
}

const ThemeModeContext = createContext<ThemeModeContextValue>({
  mode: "dark",
  cycleMode: () => {},
  setMode: () => {},
  shuffleRandom: () => {},
})

export const useThemeMode = () => useContext(ThemeModeContext)

const MODE_ORDER: ThemeMode[] = ["light", "dark", "random"]

function ThemeModeManager({ children }: { children: React.ReactNode }) {
  const { setTheme: setNextTheme } = useTheme()
  const [mode, setModeState] = useState<ThemeMode>("light")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const stored = readPersistedMode()
    if (stored === "light" || stored === "dark" || stored === "random") {
      setModeState(stored)
    }
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    setNextTheme(mode)

    if (mode === "random") {
      let tokens = readPersistedPalette()
      if (!tokens) {
        tokens = generateRandomTokens()
        persistPalette(tokens)
      }
      applyTokensToDOM(tokens)
    } else {
      clearTokenOverrides()
      clearPersistedPalette()
    }
  }, [mode, mounted, setNextTheme])

  const setMode = useCallback(
    (m: ThemeMode) => {
      setModeState(m)
      persistMode(m)
    },
    [],
  )

  const cycleMode = useCallback(() => {
    setModeState((prev) => {
      const idx = MODE_ORDER.indexOf(prev)
      const next = MODE_ORDER[(idx + 1) % MODE_ORDER.length]
      persistMode(next)
      return next
    })
  }, [])

  const shuffleRandom = useCallback(() => {
    if (mode !== "random") return
    const tokens = generateRandomTokens()
    persistPalette(tokens)
    applyTokensToDOM(tokens)
  }, [mode])

  const value = useMemo(
    () => ({ mode, cycleMode, setMode, shuffleRandom }),
    [mode, cycleMode, setMode, shuffleRandom],
  )

  return <ThemeModeContext.Provider value={value}>{children}</ThemeModeContext.Provider>
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="light"
      themes={["light", "dark", "random"]}
      enableSystem={false}
      disableTransitionOnChange
      storageKey="metropolis-theme"
    >
      <ThemeModeManager>{children}</ThemeModeManager>
    </NextThemesProvider>
  )
}
