import type { ReactNode } from 'react'

export interface NavbarItem {
    label: string
    icon: ReactNode
    hrefTo: string
}

export interface PaginationData<T> {
    data: T[]
    totalPages: number
    currentPage: number
    pageSize: number
    total: number
}

export interface BffResponse<T> {
    data: T
    message: string
    statusCode: number
    title?: string
}

export interface BffEmptyResponse {
    data?: never
    message: string
    statusCode: number
    title?: string
}

export type QueryParams = Record<string, unknown>
