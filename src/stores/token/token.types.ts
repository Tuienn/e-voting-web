export interface IUser {
    id: string
    name: string
}

export interface IAccessTokenState {
    accessToken: string | null
    setAccessToken: (accessToken: string) => void
    clearAccessToken: () => void
}

export interface IRefreshTokenState {
    refreshToken: string | null
    setRefreshToken: (refreshToken: string) => void
    clearRefreshToken: () => void
}
