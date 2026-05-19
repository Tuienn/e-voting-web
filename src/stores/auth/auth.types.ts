export interface IUser {
    id: string
    name: string
}

export interface IAuthState {
    user: IUser | null
    isAuthenticated: boolean

    setUser: (user: IUser) => void
    clearUser: () => void
    updateUser: (partial: Partial<IUser>) => void
}
