import * as React from 'react'
import {
  applyPalette,
  generatePalette,
  loadState,
  modeForPrimary,
  randomPrimary,
  saveState,
  serializeTheme,
  type HSL,
  type Mode,
  type Palette,
} from '@/lib/theme'

type ThemeContextValue = {
  primary: HSL
  mode: Mode
  light: Palette
  dark: Palette
  setPrimary: (next: HSL) => void
  setMode: (next: Mode) => void
  randomize: () => void
  exportCSS: () => string
}

const ThemeContext = React.createContext<ThemeContextValue | null>(null)

const DEFAULT_PRIMARY: HSL = { h: 222, s: 47, l: 50 }

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const initial = React.useMemo(() => {
    const stored = loadState()
    return stored ?? { primary: DEFAULT_PRIMARY, mode: 'light' as Mode }
  }, [])

  const [primary, setPrimaryState] = React.useState<HSL>(initial.primary)
  const [mode, setModeState] = React.useState<Mode>(initial.mode)

  const light = React.useMemo(() => generatePalette(primary, 'light'), [primary])
  const dark = React.useMemo(() => generatePalette(primary, 'dark'), [primary])

  React.useEffect(() => {
    applyPalette(mode === 'light' ? light : dark, mode)
    saveState({ primary, mode })
  }, [primary, mode, light, dark])

  const setPrimary = React.useCallback((next: HSL) => {
    setPrimaryState(next)
    setModeState(modeForPrimary(next))
  }, [])
  const setMode = React.useCallback((next: Mode) => setModeState(next), [])
  const randomize = React.useCallback(() => {
    const next = randomPrimary()
    setPrimaryState(next)
    setModeState(modeForPrimary(next))
  }, [])
  const exportCSS = React.useCallback(() => serializeTheme(light, dark), [light, dark])

  const value = React.useMemo(
    () => ({ primary, mode, light, dark, setPrimary, setMode, randomize, exportCSS }),
    [primary, mode, light, dark, setPrimary, setMode, randomize, exportCSS]
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const ctx = React.useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used inside ThemeProvider')
  return ctx
}
