import type { ThemeTokens } from "./types"

const TOKEN_TO_CSS: Record<keyof ThemeTokens, string> = {
  background: "--background",
  foreground: "--foreground",
  card: "--card",
  cardForeground: "--card-foreground",
  popover: "--popover",
  popoverForeground: "--popover-foreground",
  primary: "--primary",
  primaryForeground: "--primary-foreground",
  secondary: "--secondary",
  secondaryForeground: "--secondary-foreground",
  muted: "--muted",
  mutedForeground: "--muted-foreground",
  accent: "--accent",
  accentForeground: "--accent-foreground",
  destructive: "--destructive",
  destructiveForeground: "--destructive-foreground",
  border: "--border",
  input: "--input",
  ring: "--ring",
  chart1: "--chart-1",
  chart2: "--chart-2",
  chart3: "--chart-3",
  chart4: "--chart-4",
  chart5: "--chart-5",
  sidebar: "--sidebar",
  sidebarForeground: "--sidebar-foreground",
  sidebarPrimary: "--sidebar-primary",
  sidebarPrimaryForeground: "--sidebar-primary-foreground",
  sidebarAccent: "--sidebar-accent",
  sidebarAccentForeground: "--sidebar-accent-foreground",
  sidebarBorder: "--sidebar-border",
  sidebarRing: "--sidebar-ring",
  brand: "--brand",
  brandLight: "--brand-light",
  brandGlow: "--brand-glow",
  brandGlowStrong: "--brand-glow-strong",
  brandHoverBg: "--brand-hover-bg",
}

export function applyTokensToDOM(tokens: ThemeTokens): void {
  const root = document.documentElement
  for (const [key, cssVar] of Object.entries(TOKEN_TO_CSS)) {
    root.style.setProperty(cssVar, tokens[key as keyof ThemeTokens])
  }
}

export function clearTokenOverrides(): void {
  const root = document.documentElement
  for (const cssVar of Object.values(TOKEN_TO_CSS)) {
    root.style.removeProperty(cssVar)
  }
}

const STORAGE_KEY_MODE = "metropolis-theme-mode"
const STORAGE_KEY_PALETTE = "metropolis-random-palette"

export function persistMode(mode: string): void {
  try {
    localStorage.setItem(STORAGE_KEY_MODE, mode)
  } catch {}
}

export function readPersistedMode(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEY_MODE)
  } catch {
    return null
  }
}

export function persistPalette(tokens: ThemeTokens): void {
  try {
    localStorage.setItem(STORAGE_KEY_PALETTE, JSON.stringify(tokens))
  } catch {}
}

export function readPersistedPalette(): ThemeTokens | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_PALETTE)
    return raw ? (JSON.parse(raw) as ThemeTokens) : null
  } catch {
    return null
  }
}

export function clearPersistedPalette(): void {
  try {
    localStorage.removeItem(STORAGE_KEY_PALETTE)
  } catch {}
}
