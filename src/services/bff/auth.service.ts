import { bffApiService } from '.'

export default class AuthService {
    private static readonly BASE_URL = '/identity'

    static login = async (email: string, password: string) => {
        return await bffApiService(`${this.BASE_URL}/auth/sign-in`, {
            method: 'POST',
            body: JSON.stringify({ email, password })
        })
    }

    static register = async (email: string, password: string) => {
        return await bffApiService(`${this.BASE_URL}/auth/register`, {
            method: 'POST',
            body: JSON.stringify({ email, password })
        })
    }

    static signOut = async (refreshToken: string) => {
        return await bffApiService(`${this.BASE_URL}/auth/sign-out`, {
            method: 'POST',
            body: JSON.stringify({ refreshToken })
        })
    }

    static getCurrentUser = async () => {
        return await bffApiService(`${this.BASE_URL}/user/me`)
    }
}
