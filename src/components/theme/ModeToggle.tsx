import { Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTheme } from '@/context/ThemeProvider'

export function ModeToggle() {
  const { mode, setMode } = useTheme()
  const next = mode === 'light' ? 'dark' : 'light'
  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setMode(next)}
      aria-label={`Switch to ${next} mode`}
    >
      {mode === 'light' ? <Moon /> : <Sun />}
    </Button>
  )
}
