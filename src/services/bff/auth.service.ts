import { bffApiService } from '.'

export default class AuthService {
    private static readonly BASE_URL = '/identity/auth'

    static login = async (email: string, password: string) => {
        return await bffApiService(`${this.BASE_URL}/sign-in`, {
            method: 'POST',
            body: JSON.stringify({ email, password })
        })
    }

    static register = async (email: string, password: string) => {
        return await bffApiService(`${this.BASE_URL}/register`, {
            method: 'POST',
            body: JSON.stringify({ email, password })
        })
    }

    static signOut = async (refreshToken: string) => {
        return await bffApiService(`${this.BASE_URL}/sign-out`, {
            method: 'POST',
            body: JSON.stringify({ refreshToken })
        })
    }

    static getCurrentUser = async () => {
        return await bffApiService(`${this.BASE_URL}/me`)
    }
}
