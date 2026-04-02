import type { ThemeTokens } from "./types"

type HSL = [number, number, number]

function hslToHex([h, s, l]: HSL): string {
  const sn = s / 100
  const ln = l / 100
  const a = sn * Math.min(ln, 1 - ln)
  const f = (n: number) => {
    const k = (n + h / 30) % 12
    const color = ln - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, "0")
  }
  return `#${f(0)}${f(8)}${f(4)}`
}

function hslString([h, s, l]: HSL): string {
  return `hsl(${h}, ${s}%, ${l}%)`
}

function hslToRgb([h, s, l]: HSL): [number, number, number] {
  const sn = s / 100
  const ln = l / 100
  const a = sn * Math.min(ln, 1 - ln)
  const f = (n: number) => {
    const k = (n + h / 30) % 12
    return ln - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)
  }
  return [f(0), f(8), f(4)]
}

function luminance([r, g, b]: [number, number, number]): number {
  const toLinear = (c: number) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4)
  return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b)
}

function contrastRatio(a: HSL, b: HSL): number {
  const la = luminance(hslToRgb(a))
  const lb = luminance(hslToRgb(b))
  const lighter = Math.max(la, lb)
  const darker = Math.min(la, lb)
  return (lighter + 0.05) / (darker + 0.05)
}

function isLightBackground(bg: HSL): boolean {
  return luminance(hslToRgb(bg)) > 0.179
}

function readableForeground(bg: HSL): HSL {
  return isLightBackground(bg) ? [0, 0, 5] : [0, 0, 97]
}

function ensureContrast(bg: HSL, fg: HSL, minRatio = 4.5): HSL {
  let [h, s, l] = fg
  const light = isLightBackground(bg)

  for (let i = 0; i < 50; i++) {
    if (contrastRatio(bg, [h, s, l]) >= minRatio) break
    l = light ? Math.max(0, l - 2) : Math.min(100, l + 2)
  }

  return [h, s, l]
}

type Harmony = "complementary" | "analogous" | "triadic" | "split-complementary"

const HARMONIES: Harmony[] = ["complementary", "analogous", "triadic", "split-complementary"]

function pickHarmony(): Harmony {
  return HARMONIES[Math.floor(Math.random() * HARMONIES.length)]
}

function secondaryHue(primary: number, harmony: Harmony): number {
  switch (harmony) {
    case "complementary":
      return (primary + 180) % 360
    case "analogous":
      return (primary + 30 + Math.random() * 30) % 360
    case "triadic":
      return (primary + 120) % 360
    case "split-complementary":
      return (primary + 150 + Math.random() * 60) % 360
  }
}

function randRange(min: number, max: number): number {
  return min + Math.random() * (max - min)
}

function randInt(min: number, max: number): number {
  return Math.floor(randRange(min, max + 1))
}

export function generateRandomTokens(): ThemeTokens {
  const preferDark = Math.random() > 0.5

  const hue = randInt(0, 359)
  const harmony = pickHarmony()
  const hue2 = secondaryHue(hue, harmony)

  const bg: HSL = preferDark
    ? [randInt(0, 359), randInt(5, 15), randInt(5, 12)]
    : [randInt(0, 359), randInt(5, 15), randInt(94, 98)]
  const fg = readableForeground(bg)

  const card: HSL = preferDark
    ? [bg[0], bg[1], Math.min(100, bg[2] + 2)]
    : [bg[0], bg[1], Math.max(0, bg[2] - 1)]
  const cardFg = fg

  const primarySat = randInt(60, 90)
  const primaryLight = preferDark ? randInt(55, 70) : randInt(35, 50)
  const primary: HSL = [hue, primarySat, primaryLight]
  const primaryFg = readableForeground(primary)

  const secondary: HSL = preferDark
    ? [hue, randInt(8, 18), randInt(14, 22)]
    : [hue, randInt(10, 25), randInt(90, 95)]
  const secondaryFg = ensureContrast(secondary, fg)

  const muted: HSL = secondary
  const mutedFg: HSL = preferDark
    ? [hue, randInt(5, 15), randInt(55, 65)]
    : [hue, randInt(5, 15), randInt(35, 50)]

  const accent: HSL = preferDark
    ? [hue2, randInt(10, 20), randInt(16, 24)]
    : [hue2, randInt(10, 25), randInt(90, 95)]
  const accentFg = ensureContrast(accent, fg)

  const destructive: HSL = preferDark ? [0, 70, 40] : [0, 80, 50]
  const destructiveFg: HSL = readableForeground(destructive)

  const border: HSL = preferDark
    ? [hue, randInt(5, 12), randInt(18, 25)]
    : [hue, randInt(5, 15), randInt(85, 92)]
  const input = border
  const ring: HSL = preferDark
    ? [hue, randInt(10, 20), randInt(30, 40)]
    : [hue, randInt(10, 20), randInt(60, 72)]

  const brand: HSL = primary
  const brandLight: HSL = [hue2, randInt(65, 90), preferDark ? randInt(55, 70) : randInt(45, 60)]

  const chartHues = [hue, (hue + 72) % 360, (hue + 144) % 360, (hue + 216) % 360, (hue + 288) % 360]
  const chartSat = randInt(55, 80)
  const chartLight = preferDark ? randInt(55, 68) : randInt(42, 58)

  const sidebar: HSL = preferDark
    ? [bg[0], bg[1], Math.min(100, bg[2] + 4)]
    : [bg[0], bg[1], Math.max(0, bg[2] - 1)]

  const hex = hslToHex
  const str = hslString
  const rgba = (c: HSL, alpha: number) => {
    const [r, g, b] = hslToRgb(c).map((v) => Math.round(v * 255))
    return `rgba(${r}, ${g}, ${b}, ${alpha})`
  }

  return {
    background: str(bg),
    foreground: str(fg),
    card: str(card),
    cardForeground: str(cardFg),
    popover: str(card),
    popoverForeground: str(cardFg),

    primary: str(primary),
    primaryForeground: str(primaryFg),

    secondary: str(secondary),
    secondaryForeground: str(secondaryFg),

    muted: str(muted),
    mutedForeground: str(mutedFg),

    accent: str(accent),
    accentForeground: str(accentFg),

    destructive: str(destructive),
    destructiveForeground: str(destructiveFg),

    border: str(border),
    input: str(input),
    ring: str(ring),

    chart1: str([chartHues[0], chartSat, chartLight]),
    chart2: str([chartHues[1], chartSat, chartLight]),
    chart3: str([chartHues[2], chartSat, chartLight]),
    chart4: str([chartHues[3], chartSat, chartLight]),
    chart5: str([chartHues[4], chartSat, chartLight]),

    sidebar: str(sidebar),
    sidebarForeground: str(fg),
    sidebarPrimary: str(primary),
    sidebarPrimaryForeground: str(primaryFg),
    sidebarAccent: str(accent),
    sidebarAccentForeground: str(accentFg),
    sidebarBorder: str(border),
    sidebarRing: str(ring),

    brand: hex(brand),
    brandLight: hex(brandLight),
    brandGlow: rgba(brand, 0.3),
    brandGlowStrong: rgba(brand, 0.5),
    brandHoverBg: rgba(brand, 0.1),
  }
}
