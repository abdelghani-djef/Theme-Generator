import * as React from 'react'
import { HslColorPicker } from 'react-colorful'
import { Shuffle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { useTheme } from '@/context/ThemeProvider'
import { hexToHsl, hslToHex } from '@/lib/theme'
import { ModeToggle } from './ModeToggle'
import { PalettePreview } from './PalettePreview'
import { CopyThemeButton } from './CopyThemeButton'
import { PreviewCssButton } from './PreviewCssButton'

export function ThemeControls() {
  const { primary, setPrimary, randomize } = useTheme()
  const [hexValue, setHexValue] = React.useState(hslToHex(primary))

  React.useEffect(() => {
    setHexValue(hslToHex(primary))
  }, [primary])

  const onHexChange = (raw: string) => {
    setHexValue(raw)
    const parsed = hexToHsl(raw)
    if (parsed) setPrimary(parsed)
  }

  return (
    <Card>
      <CardContent className="grid gap-6 p-6 md:grid-cols-[260px_minmax(0,1fr)_240px]">
        <div className="space-y-3">
          <Label htmlFor="hex">Primary color</Label>
          <div className="theme-picker">
            <HslColorPicker
              color={{ h: primary.h, s: primary.s, l: primary.l }}
              onChange={(c) => setPrimary({ h: c.h, s: c.s, l: c.l })}
            />
          </div>
          <Input
            id="hex"
            value={hexValue}
            onChange={(e) => onHexChange(e.target.value)}
            spellCheck={false}
            className="font-mono"
          />
          <p className="text-[11px] text-muted-foreground">
            HSL:{' '}
            <span className="font-mono">
              {Math.round(primary.h)}°, {Math.round(primary.s)}%, {Math.round(primary.l)}%
            </span>
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <Label>Generated palette</Label>
          <PalettePreview />
          <p className="mt-auto text-xs text-muted-foreground">
            Every shadcn surface — buttons, cards, badges, tables — reskins from this palette in real time.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <Label>Actions</Label>
          <Button onClick={randomize}>
            <Shuffle />
            Randomize
          </Button>
          <PreviewCssButton />
          <CopyThemeButton />
          <div className="mt-auto flex items-center justify-between rounded-md border bg-muted/40 px-3 py-2">
            <span className="text-xs text-muted-foreground">Preview mode</span>
            <ModeToggle />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
