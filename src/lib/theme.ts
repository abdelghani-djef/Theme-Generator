export type HSL = { h: number; s: number; l: number }
export type Mode = 'light' | 'dark'

export type Palette = {
  background: HSL
  foreground: HSL
  card: HSL
  cardForeground: HSL
  popover: HSL
  popoverForeground: HSL
  primary: HSL
  primaryForeground: HSL
  secondary: HSL
  secondaryForeground: HSL
  muted: HSL
  mutedForeground: HSL
  accent: HSL
  accentForeground: HSL
  destructive: HSL
  destructiveForeground: HSL
  border: HSL
  input: HSL
  ring: HSL
  chart1: HSL
  chart2: HSL
  chart3: HSL
  chart4: HSL
  chart5: HSL
}

const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v))
const hsl = (h: number, s: number, l: number): HSL => ({
  h: Math.round(h * 10) / 10,
  s: Math.round(s * 10) / 10,
  l: Math.round(l * 10) / 10,
})

function hslToRgb({ h, s, l }: HSL) {
  s /= 100
  l /= 100
  const k = (n: number) => (n + h / 30) % 12
  const a = s * Math.min(l, 1 - l)
  const f = (n: number) => l - a * Math.max(-1, Math.min(k(n) - 3, 9 - k(n), 1))
  return { r: f(0), g: f(8), b: f(4) }
}

function relativeLuminance(c: HSL) {
  const { r, g, b } = hslToRgb(c)
  const lin = (v: number) => (v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4))
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b)
}

function contrastForeground(bg: HSL): HSL {
  return relativeLuminance(bg) < 0.45 ? hsl(bg.h, 10, 98) : hsl(bg.h, 30, 10)
}

export function hexToHsl(hex: string): HSL | null {
  const m = /^#?([\da-f]{6})$/i.exec(hex.trim())
  if (!m) return null
  const n = parseInt(m[1], 16)
  const r = ((n >> 16) & 255) / 255
  const g = ((n >> 8) & 255) / 255
  const b = (n & 255) / 255
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const l = (max + min) / 2
  let h = 0
  let s = 0
  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0)
        break
      case g:
        h = (b - r) / d + 2
        break
      case b:
        h = (r - g) / d + 4
        break
    }
    h *= 60
  }
  return hsl(h, s * 100, l * 100)
}

export function hslToHex({ h, s, l }: HSL): string {
  const { r, g, b } = hslToRgb({ h, s, l })
  const toHex = (v: number) =>
    Math.round(clamp(v, 0, 1) * 255)
      .toString(16)
      .padStart(2, '0')
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`
}

export function modeForPrimary(c: HSL): Mode {
  return relativeLuminance(c) < 0.45 ? 'light' : 'dark'
}

export function randomPrimary(): HSL {
  return hsl(Math.random() * 360, 50 + Math.random() * 30, 45 + Math.random() * 10)
}

export function generatePalette(primaryInput: HSL, mode: Mode): Palette {
  const primary = hsl(primaryInput.h, primaryInput.s, primaryInput.l)
  const h = primary.h
  const s = primary.s
  const accentH = (h + 40) % 360
  const triadH = (h + 180) % 360

  // Every neutral picks up a hint of the primary's hue, so swapping primary
  // visibly retints backgrounds, cards, borders — not just buttons.
  const neutralS = clamp(s * 0.2, 6, 16)

  if (mode === 'light') {
    return {
      background: hsl(h, neutralS, 98),
      foreground: hsl(h, Math.max(neutralS, 12), 9),
      card: hsl(h, neutralS * 0.6, 100),
      cardForeground: hsl(h, Math.max(neutralS, 12), 9),
      popover: hsl(h, neutralS * 0.6, 100),
      popoverForeground: hsl(h, Math.max(neutralS, 12), 9),
      primary,
      primaryForeground: contrastForeground(primary),
      // Tonal sibling of primary — same hue, soft surface.
      secondary: hsl(h, clamp(s * 0.45, 14, 38), 91),
      secondaryForeground: hsl(h, clamp(s * 0.55, 22, 50), 18),
      muted: hsl(h, neutralS * 1.2, 94),
      mutedForeground: hsl(h, clamp(s * 0.22, 8, 20), 42),
      // Analogous-warm hue shift for a complementary highlight.
      accent: hsl(accentH, clamp(s * 0.55, 26, 58), 90),
      accentForeground: hsl(accentH, clamp(s * 0.6, 36, 62), 22),
      destructive: hsl(0, 75, 50),
      destructiveForeground: hsl(0, 0, 98),
      border: hsl(h, clamp(s * 0.25, 8, 20), 87),
      input: hsl(h, clamp(s * 0.25, 8, 20), 87),
      ring: primary,
      chart1: primary,
      chart2: hsl(accentH, 65, 50),
      chart3: hsl(triadH, 55, 45),
      chart4: hsl((h + 90) % 360, 60, 50),
      chart5: hsl((h + 270) % 360, 55, 55),
    }
  }

  return {
    background: hsl(h, neutralS, 7),
    foreground: hsl(h, neutralS * 0.7, 96),
    card: hsl(h, neutralS * 0.9, 11),
    cardForeground: hsl(h, neutralS * 0.7, 96),
    popover: hsl(h, neutralS * 0.9, 11),
    popoverForeground: hsl(h, neutralS * 0.7, 96),
    primary,
    primaryForeground: contrastForeground(primary),
    secondary: hsl(h, clamp(s * 0.4, 14, 32), 19),
    secondaryForeground: hsl(h, clamp(s * 0.3, 10, 28), 95),
    muted: hsl(h, neutralS * 1.2, 16),
    mutedForeground: hsl(h, clamp(s * 0.32, 10, 28), 65),
    accent: hsl(accentH, clamp(s * 0.4, 20, 42), 22),
    accentForeground: hsl(accentH, clamp(s * 0.55, 32, 58), 92),
    destructive: hsl(0, 65, 45),
    destructiveForeground: hsl(0, 0, 98),
    border: hsl(h, clamp(s * 0.28, 10, 24), 19),
    input: hsl(h, clamp(s * 0.28, 10, 24), 19),
    ring: primary,
    chart1: primary,
    chart2: hsl(accentH, 65, 60),
    chart3: hsl(triadH, 55, 60),
    chart4: hsl((h + 90) % 360, 60, 60),
    chart5: hsl((h + 270) % 360, 55, 65),
  }
}

const CSS_VAR_MAP: Record<keyof Palette, string> = {
  background: '--background',
  foreground: '--foreground',
  card: '--card',
  cardForeground: '--card-foreground',
  popover: '--popover',
  popoverForeground: '--popover-foreground',
  primary: '--primary',
  primaryForeground: '--primary-foreground',
  secondary: '--secondary',
  secondaryForeground: '--secondary-foreground',
  muted: '--muted',
  mutedForeground: '--muted-foreground',
  accent: '--accent',
  accentForeground: '--accent-foreground',
  destructive: '--destructive',
  destructiveForeground: '--destructive-foreground',
  border: '--border',
  input: '--input',
  ring: '--ring',
  chart1: '--chart-1',
  chart2: '--chart-2',
  chart3: '--chart-3',
  chart4: '--chart-4',
  chart5: '--chart-5',
}

const formatHsl = (c: HSL) => `${c.h} ${c.s}% ${c.l}%`

export function applyPalette(palette: Palette, mode: Mode) {
  const root = document.documentElement
  for (const key in CSS_VAR_MAP) {
    const cssVar = CSS_VAR_MAP[key as keyof Palette]
    root.style.setProperty(cssVar, formatHsl(palette[key as keyof Palette]))
  }
  root.classList.toggle('dark', mode === 'dark')
}

export function serializeTheme(light: Palette, dark: Palette): string {
  const block = (selector: string, p: Palette) => {
    const lines = (Object.keys(CSS_VAR_MAP) as (keyof Palette)[])
      .map((k) => `  ${CSS_VAR_MAP[k]}: ${formatHsl(p[k])};`)
      .join('\n')
    return `${selector} {\n${lines}\n  --radius: 0.5rem;\n}`
  }
  return `${block(':root', light)}\n\n${block('.dark', dark)}\n`
}

const STORAGE_KEY = 'theme-generator:v1'

export type StoredState = { primary: HSL; mode: Mode }

export function loadState(): StoredState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as StoredState
    if (
      parsed &&
      parsed.primary &&
      typeof parsed.primary.h === 'number' &&
      (parsed.mode === 'light' || parsed.mode === 'dark')
    ) {
      return parsed
    }
  } catch {
    /* ignore */
  }
  return null
}

export function saveState(state: StoredState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    /* ignore */
  }
}
