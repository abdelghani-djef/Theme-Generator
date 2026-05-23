import { NavLink } from 'react-router-dom'
import { FileText, LayoutDashboard, LogIn, ShoppingCart } from 'lucide-react'
import { cn } from '@/lib/utils'

const TABS = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/login', label: 'Login', icon: LogIn },
  { to: '/blog', label: 'Blog', icon: FileText },
  { to: '/orders', label: 'Orders', icon: ShoppingCart },
]

export function NavTabs() {
  return (
    <nav className="inline-flex items-center gap-1 rounded-md bg-muted p-1">
      {TABS.map(({ to, label, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            cn(
              'inline-flex items-center gap-2 rounded-sm px-3 py-1.5 text-sm font-medium transition-colors',
              isActive
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            )
          }
        >
          <Icon className="h-4 w-4" />
          {label}
        </NavLink>
      ))}
    </nav>
  )
}
