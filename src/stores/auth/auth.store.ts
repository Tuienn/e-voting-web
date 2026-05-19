import { create } from 'zustand'
import { type IAuthState } from './auth.types'

export const useAuthStore = create<IAuthState>((set) => ({
    user: null,
    isAuthenticated: false,

    setUser: (user) => set({ user, isAuthenticated: true }),
    clearUser: () => set({ user: null, isAuthenticated: false }),
    updateUser: (partial) =>
        set((state) => ({
            user: state.user ? { ...state.user, ...partial } : state.user
        }))
}))
