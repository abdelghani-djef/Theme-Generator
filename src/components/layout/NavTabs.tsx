import { FileText, LayoutDashboard, LogIn, ShoppingCart } from 'lucide-react'
import { cn } from '@/lib/utils'

export type PageId = 'dashboard' | 'login' | 'blog' | 'orders'

const TABS: { id: PageId; label: string; icon: typeof LayoutDashboard }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'login', label: 'Login', icon: LogIn },
  { id: 'blog', label: 'Blog', icon: FileText },
  { id: 'orders', label: 'Orders', icon: ShoppingCart },
]

type Props = {
  value: PageId
  onChange: (next: PageId) => void
}

export function NavTabs({ value, onChange }: Props) {
  return (
    <nav className="inline-flex items-center gap-1 rounded-md bg-muted p-1">
      {TABS.map(({ id, label, icon: Icon }) => {
        const active = value === id
        return (
          <button
            key={id}
            type="button"
            onClick={() => onChange(id)}
            className={cn(
              'inline-flex items-center gap-2 rounded-sm px-3 py-1.5 text-sm font-medium transition-colors',
              active
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            <Icon className="h-4 w-4" />
            {label}
          </button>
        )
      })}
    </nav>
  )
}
