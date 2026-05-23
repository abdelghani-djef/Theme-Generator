import { Copy } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { useTheme } from '@/context/ThemeProvider'

export function CopyThemeButton() {
  const { exportCSS } = useTheme()
  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(exportCSS())
      toast.success('Theme CSS copied to clipboard')
    } catch {
      toast.error('Could not access clipboard')
    }
  }
  return (
    <Button variant="outline" className="w-full" onClick={onCopy}>
      <Copy />
      Copy CSS variables
    </Button>
  )
}
