import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { useAuthStore } from '@/store/authStore'
import { useLocation, useNavigate } from 'react-router-dom'
import { LayoutDashboard, CreditCard, Settings, LogOut } from 'lucide-react'

const sidebarItems = [
  {
    name: 'Dashboard',
    icon: LayoutDashboard,
    path: '/dashboard',
  },
  {
    name: 'Dívidas',
    icon: CreditCard,
    path: '/debts',
  },
]

export function Sidebar() {
  const location = useLocation()
  const navigate = useNavigate()
  const { logout } = useAuthStore()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const isRouteActive = (path: string) => location.pathname === path

  return (
    <div className="flex h-full w-64 flex-col bg-zinc-900 text-white">
      {/* Logo */}
      <div className="flex items-center justify-center gap-3 p-[1.13rem] border-b border-zinc-700">
        <img src="/assets/logo.svg" alt="logo" className="w-16 h-16" />
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {sidebarItems.map((item) => {
          const Icon = item.icon
          const isActive = isRouteActive(item.path)

          return (
            <Button
              key={item.path}
              variant={isActive ? 'secondary' : 'ghost'}
              className={cn(
                'w-full justify-start gap-3 text-white hover:bg-zinc-700',
                isActive && 'bg-orange-500 hover:bg-orange-600'
              )}
              onClick={() => navigate(item.path)}
            >
              <Icon className="w-4 h-4" />
              {item.name}
            </Button>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-zinc-700 space-y-2">
        <Button
          variant={isRouteActive('/settings') ? 'secondary' : 'ghost'}
          className={cn(
            'w-full justify-start gap-3 text-white hover:bg-zinc-700',
            isRouteActive('/settings') && 'bg-orange-500 hover:bg-orange-600'
          )}
          onClick={() => navigate('/settings')}
        >
          <Settings className="w-4 h-4" />
          Configurações
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-white hover:bg-zinc-700"
          onClick={handleLogout}
        >
          <LogOut className="w-4 h-4" />
          Sair
        </Button>
      </div>
    </div>
  )
}
