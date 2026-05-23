import * as React from 'react'
import { Sparkles } from 'lucide-react'
import { ThemeControls } from '@/components/theme/ThemeControls'
import { DashboardPage } from '@/pages/Dashboard'
import { LoginPage } from '@/pages/Login'
import { BlogPage } from '@/pages/Blog'
import { OrdersPage } from '@/pages/Orders'
import { NavTabs, type PageId } from './NavTabs'

const PAGES: Record<PageId, React.ComponentType> = {
  dashboard: DashboardPage,
  login: LoginPage,
  blog: BlogPage,
  orders: OrdersPage,
}

export function AppShell() {
  const [page, setPage] = React.useState<PageId>('dashboard')
  const ActivePage = PAGES[page]

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <header className="mb-6 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-xl font-semibold leading-tight">Theme Generator</h1>
            <p className="text-sm text-muted-foreground">
              Pick a primary color or shuffle — watch every surface retint instantly.
            </p>
          </div>
        </header>

        <section className="mb-8">
          <ThemeControls />
        </section>

        <section className="space-y-4">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold">Live preview</h2>
              <p className="text-sm text-muted-foreground">
                Real app screens powered entirely by the generated palette.
              </p>
            </div>
            <NavTabs value={page} onChange={setPage} />
          </div>

          <div className="rounded-xl border bg-background p-4 sm:p-6">
            <ActivePage />
          </div>
        </section>
      </div>
    </div>
  )
}
