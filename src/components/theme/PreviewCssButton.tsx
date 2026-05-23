import * as React from 'react'
import { Code, Copy } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { useTheme } from '@/context/ThemeProvider'

export function PreviewCssButton() {
  const { exportCSS } = useTheme()
  const [open, setOpen] = React.useState(false)
  const css = open ? exportCSS() : ''

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(exportCSS())
      toast.success('Theme CSS copied to clipboard')
    } catch {
      toast.error('Could not access clipboard')
    }
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="secondary" className="w-full">
          <Code />
          Preview CSS
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="flex w-full max-w-xl flex-col gap-4 overflow-hidden sm:max-w-xl">
        <SheetHeader>
          <SheetTitle>Generated CSS</SheetTitle>
          <SheetDescription>
            Drop these variables into your shadcn project's <code className="font-mono text-foreground">globals.css</code>.
          </SheetDescription>
        </SheetHeader>
        <Button variant="outline" onClick={onCopy} className="w-fit">
          <Copy />
          Copy to clipboard
        </Button>
        <pre className="flex-1 overflow-auto rounded-md border bg-muted p-4 font-mono text-xs leading-relaxed">
          <code>{css}</code>
        </pre>
      </SheetContent>
    </Sheet>
  )
}
