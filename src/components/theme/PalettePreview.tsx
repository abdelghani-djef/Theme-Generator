import { useTheme } from '@/context/ThemeProvider'
import type { HSL, Palette } from '@/lib/theme'

type Swatch = { key: keyof Palette; label: string; rule: string }

const SWATCHES: Swatch[] = [
  { key: 'primary', label: 'Primary', rule: 'as picked' },
  { key: 'secondary', label: 'Secondary', rule: 'same hue, soft' },
  { key: 'accent', label: 'Accent', rule: 'hue + 40°' },
  { key: 'background', label: 'Background', rule: 'tinted neutral' },
  { key: 'foreground', label: 'Foreground', rule: 'contrast pair' },
  { key: 'muted', label: 'Muted', rule: 'tinted neutral' },
  { key: 'border', label: 'Border', rule: 'tinted neutral' },
  { key: 'destructive', label: 'Destructive', rule: 'fixed red' },
]

const fmt = (c: HSL) => `${c.h}° ${c.s}% ${c.l}%`

export function PalettePreview() {
  const { light, dark, mode } = useTheme()
  const palette = mode === 'light' ? light : dark
  return (
    <div className="grid grid-cols-4 gap-2">
      {SWATCHES.map(({ key, label, rule }) => {
        const c = palette[key]
        return (
          <div key={key} className="flex flex-col gap-1.5" title={`${label} · ${rule} · ${fmt(c)}`}>
            <div
              className="h-10 w-full rounded-md border border-border"
              style={{ background: `hsl(${c.h} ${c.s}% ${c.l}%)` }}
            />
            <div className="leading-tight">
              <p className="text-[10px] font-medium uppercase tracking-wide">{label}</p>
              <p className="text-[10px] text-muted-foreground">{rule}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
