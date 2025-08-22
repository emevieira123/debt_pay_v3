import { useAuthStore } from '@/store/authStore'
import { Bell, Menu, User } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface HeaderProps {
  title: string
  description: string
  onMenuClick: () => void
}

export function Header({ title, description, onMenuClick }: HeaderProps) {
  const { user } = useAuthStore()

  return (
    <header className="flex items-center justify-between p-6 border-b border-zinc-800 shrink-0">
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-white md:hidden"
          onClick={onMenuClick}
        >
          <Menu className="w-6 h-6" />
        </Button>
        <div>
          <h1 className="text-xl md:text-2xl font-semibold text-white">{title}</h1>
          <p className="text-zinc-400 text-sm hidden md:block">{description}</p>
        </div>
      </div>
      <div className="flex items-center gap-2 md:gap-4">
        <Button variant="ghost" size="icon" className="text-white">
          <Bell className="w-5 h-5" />
        </Button>
        <div className="hidden sm:flex items-center gap-2 text-white">
          <div className="w-8 h-8 bg-zinc-700 rounded-full flex items-center justify-center">
            <User className="w-4 h-4" />
          </div>
          <span className="hidden lg:inline">{user?.name}</span>
        </div>
      </div>
    </header>
  )
}
