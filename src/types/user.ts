export type UserRole = 'ADMIN' | 'VOTER' | 'CANDIDATE'

export type CreateUserRole = Extract<UserRole, 'VOTER' | 'CANDIDATE'>

export interface User {
    id: string
    email: string
    name: string
    role: UserRole
    isActive: boolean
    createdAt?: string
    updatedAt?: string
}

export type UserOption = Pick<User, 'id' | 'name' | 'email'>

export interface FilterUsersParams {
    email?: string
    name?: string
    isActive?: boolean | 'true' | 'false'
    role?: UserRole
    page?: number | string
    pageSize?: number | string
    [key: string]: unknown
}

export interface UpdateUserPayload {
    email?: string
    name?: string
}

export interface CreateUserPayload {
    email: string
    name: string
    password: string
    role: CreateUserRole
}
