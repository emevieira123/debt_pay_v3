import { create } from 'zustand'
import { User } from '../types'

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<boolean>
  register: (name: string, email: string, password: string) => Promise<boolean>
  logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  
  login: async (email: string, password: string) => {
    // Simulação de login
    if (email && password) {
      const user = {
        id: '1',
        name: 'Emerson Vieira',
        email: email,
      }
      set({ user, isAuthenticated: true })
      return true
    }
    return false
  },

  register: async (name: string, email: string, password: string) => {
    // Simulação de registro
    if (name && email && password) {
      const user = {
        id: '1',
        name: name,
        email: email,
      }
      set({ user, isAuthenticated: true })
      return true
    }
    return false
  },

  logout: () => {
    set({ user: null, isAuthenticated: false })
  },
}))
