import type { User, UserRole } from './user'

export interface LoginPayload {
    email: string
    password: string
}

export type RegisterPayload = LoginPayload

export interface RefreshTokenPayload {
    refreshToken: string
}

export interface AuthTokens {
    accessToken: string
    refreshToken: string
}

export interface AuthSession extends AuthTokens {
    id: string
    email: string
    role: UserRole
}

export type CurrentUser = User
