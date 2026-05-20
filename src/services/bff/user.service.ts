import { bffApiService } from '.'
import { queryString } from './../../lib/utils'
export default class UserService {
    private static readonly BASE_URL = '/identity/user'

    static filterUsers = async (searchParams: Record<string, string>) => {
        return await bffApiService(`${this.BASE_URL}/filter${queryString(searchParams)}`)
    }

    static getUserById = async (id: string) => {
        return await bffApiService(`${this.BASE_URL}/${id}`)
    }

    static disableUserById = async (id: string) => {
        return await bffApiService(`${this.BASE_URL}/${id}/disable`, {
            method: 'PATCH'
        })
    }

    static enableUserById = async (id: string) => {
        return await bffApiService(`${this.BASE_URL}/${id}/enable`, {
            method: 'PATCH'
        })
    }

    static updateUserById = async (id: string, data: { email?: string; name?: string }) => {
        return await bffApiService(`${this.BASE_URL}/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(data)
        })
    }

    static createUser = async (data: {
        email: string
        name: string
        password: string
        role: 'CANDIDATE' | 'VOTER'
    }) => {
        return await bffApiService(`${this.BASE_URL}/create-user`, {
            method: 'POST',
            body: JSON.stringify(data)
        })
    }
}
