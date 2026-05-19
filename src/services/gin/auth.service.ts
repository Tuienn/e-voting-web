import { ginApiService } from '.'

export default class AuthService {
    private static readonly BASE_URL = '/auth'

    static login = async (username: string, password: string) => {
        const res = await ginApiService(`${this.BASE_URL}/login`, {
            method: 'POST',
            body: JSON.stringify({ username, password })
        })
        return res.data
    }

    static register = async (username: string, password: string) => {
        const res = await ginApiService(`${this.BASE_URL}/register`, {
            method: 'POST',
            body: JSON.stringify({ username, password })
        })
        return res.data
    }
}
