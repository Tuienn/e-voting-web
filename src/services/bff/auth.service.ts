import { bffApiService } from '.'
import type { BffEmptyResponse, BffResponse } from '../../types/common'
import type {
    AuthSession,
    AuthTokens,
    CurrentUser,
    LoginPayload,
    RefreshTokenPayload,
    RegisterPayload
} from '../../types/auth'

export default class AuthService {
    private static readonly BASE_URL = '/identity/auth'

    static login = async (email: string, password: string) => {
        const payload: LoginPayload = { email, password }

        return await bffApiService<BffResponse<AuthSession>>(`${this.BASE_URL}/sign-in`, {
            method: 'POST',
            body: JSON.stringify(payload)
        })
    }

    static register = async (email: string, password: string) => {
        const payload: RegisterPayload = { email, password }

        return await bffApiService<BffResponse<AuthSession>>(`${this.BASE_URL}/register`, {
            method: 'POST',
            body: JSON.stringify(payload)
        })
    }

    static signOut = async (refreshToken: string) => {
        const payload: RefreshTokenPayload = { refreshToken }

        return await bffApiService<BffEmptyResponse>(`${this.BASE_URL}/sign-out`, {
            method: 'POST',
            body: JSON.stringify(payload)
        })
    }

    static getCurrentUser = async () => {
        return await bffApiService<BffResponse<CurrentUser>>(`${this.BASE_URL}/me`)
    }

    static refreshToken = async (refreshToken: string) => {
        const payload: RefreshTokenPayload = { refreshToken }

        return await bffApiService<BffResponse<AuthTokens>>(`${this.BASE_URL}/refresh-token`, {
            method: 'POST',
            body: JSON.stringify(payload)
        })
    }
}
