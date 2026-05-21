import { REVEAL_VOTE_API_URL } from '../../constants/env.config'
import { tokenFacade } from '../../stores/token/token.facade'
import axios from 'axios'
import type { AxiosRequestConfig } from 'axios'

const API = axios.create({
    baseURL: REVEAL_VOTE_API_URL,
    headers: {
        Accept: 'application/json'
    }
})

interface RevealVoteResponse<T> {
    data: T
    message: string
    statusCode: number
    title?: string
}

export const revealVoteApiService = async <T = unknown>(url: string, options?: RequestInit): Promise<T> => {
    const token = tokenFacade.getAccessToken()
    const method = options?.method || 'GET'

    const headers: Record<string, string> = {
        ...(options?.headers as Record<string, string> | undefined)
    }

    if (token) {
        headers.Authorization = `Bearer ${token}`
    }

    if (!(options?.body instanceof FormData)) {
        headers['Content-Type'] = 'application/json'
    }

    try {
        const response = await API.request({
            url: `/api/v1${url}`,
            method: method as AxiosRequestConfig['method'],
            headers,
            data:
                options?.body instanceof FormData
                    ? options.body
                    : options?.body
                      ? JSON.parse(options.body as string)
                      : undefined
        })
        console.info(`${method} ${url} called successfully`)

        const responseData = response.data as RevealVoteResponse<T> | T | undefined

        if (responseData && typeof responseData === 'object' && 'data' in responseData) {
            return (responseData as RevealVoteResponse<T>).data
        }

        return (responseData ?? (undefined as unknown)) as T
    } catch (error) {
        if (!axios.isAxiosError(error)) {
            throw error
        }

        const status = error.response?.status
        const data = error.response?.data

        const message = data?.message || error.message || `HTTP ${status || 'Unknown'}`
        console.error(`${method} ${url}: ${message}`)
        throw new Error(message)
    }
}
