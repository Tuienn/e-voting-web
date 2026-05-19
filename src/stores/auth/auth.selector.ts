import { useAuthStore } from './auth.store'

export const useUser = () => useAuthStore((state) => state.user)

export const useIsAuthenticated = () => useAuthStore((state) => state.isAuthenticated)

export const useSetUser = () => useAuthStore((state) => state.setUser)

export const useClearUser = () => useAuthStore((state) => state.clearUser)

export const useUpdateUser = () => useAuthStore((state) => state.updateUser)
