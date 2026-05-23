import { Toaster } from 'sonner'
import { ThemeProvider } from '@/context/ThemeProvider'
import { AppShell } from '@/components/layout/AppShell'

export default function App() {
  return (
    <ThemeProvider>
      <AppShell />
      <Toaster richColors position="bottom-right" />
    </ThemeProvider>
  )
}
