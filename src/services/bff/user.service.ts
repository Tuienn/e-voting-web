import { bffApiService } from '.'
import { queryString } from '../../lib/utils'
import type { BffEmptyResponse, BffResponse, PaginationData } from '../../types/common'
import type { CreateUserPayload, FilterUsersParams, UpdateUserPayload, User } from '../../types/user'

export default class UserService {
    private static readonly BASE_URL = '/identity/user'

    static filterUsers = async (searchParams: FilterUsersParams) => {
        return await bffApiService<BffResponse<PaginationData<User>>>(
            `${this.BASE_URL}/filter${queryString(searchParams)}`
        )
    }

    static getUserById = async (id: string) => {
        return await bffApiService<BffResponse<User>>(`${this.BASE_URL}/${id}`)
    }

    static disableUserById = async (id: string) => {
        return await bffApiService<BffEmptyResponse>(`${this.BASE_URL}/${id}/disable`, {
            method: 'PATCH'
        })
    }

    static enableUserById = async (id: string) => {
        return await bffApiService<BffEmptyResponse>(`${this.BASE_URL}/${id}/enable`, {
            method: 'PATCH'
        })
    }

    static updateUserById = async (id: string, data: UpdateUserPayload) => {
        return await bffApiService<BffResponse<User>>(`${this.BASE_URL}/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(data)
        })
    }

    static createUser = async (data: CreateUserPayload) => {
        return await bffApiService<BffResponse<User>>(`${this.BASE_URL}/create-user`, {
            method: 'POST',
            body: JSON.stringify(data)
        })
    }
}
