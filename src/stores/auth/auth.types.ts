import type { UserRole } from '../../types/user'

export interface IUser {
    id: string
    email: string
    role?: UserRole
}

export interface IAuthState {
    user: IUser | null
    isAuthenticated: boolean

    setUser: (user: IUser) => void
    clearUser: () => void
    updateUser: (partial: Partial<IUser>) => void
}
