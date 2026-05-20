import { redirect } from '@tanstack/react-router'
import { BFF_API_URL } from '../../constants/env.config'
import { tokenFacade } from '../../stores/token/token.facade'
import axios from 'axios'
import { useAuthStore } from '../../stores/auth/auth.store'

const REFRESH_PATH = '/identity/auth/refresh-token'
const LOGIN_PATH = '/identity/auth/sign-in'

const API = axios.create({
    baseURL: BFF_API_URL,
    headers: {
        Accept: 'application/json'
    }
})

export const bffApiService = async <T = any>(url: string, options?: RequestInit, _retried = false): Promise<T> => {
    const token = tokenFacade.getAccessToken()
    const method = options?.method || 'GET'

    // Prepare headers
    const headers: Record<string, string> = {
        Authorization: `Bearer ${token}`,
        ...(options?.headers as Record<string, string> | undefined)
    }

    // Add Content-Type if not FormData
    if (!(options?.body instanceof FormData)) {
        headers['Content-Type'] = 'application/json'
    }

    try {
        const response = await API.request({
            url: `/api/v1${url}`,
            method: (options?.method as any) || 'GET',
            headers,
            data:
                options?.body instanceof FormData
                    ? options.body
                    : options?.body
                      ? JSON.parse(options.body as string)
                      : undefined
        })

        return (response.data ?? (undefined as unknown)) as T
    } catch (error) {
        if (!axios.isAxiosError(error)) {
            throw error
        }

        const status = error.response?.status
        const data = error.response?.data

        // Nếu 401/403 => thử refresh đúng 1 lần (không áp dụng cho chính endpoint refresh)
        if (
            (status === 401 || status === 403) &&
            !_retried &&
            !url.startsWith(REFRESH_PATH) &&
            !url.startsWith(LOGIN_PATH)
        ) {
            console.warn(`${method} ${url} returned ${status}. Attempting to refresh token...`)
            const refreshToken = tokenFacade.getRefreshToken()
            if (!refreshToken) {
                tokenFacade.logout()
                useAuthStore.getState().clearUser()
                redirect({
                    to: '/auth',
                    search: {
                        mode: 'login'
                    }
                })
                const message = data?.message || 'Refresh token is required'
                console.error(`${method} ${url}: ${message}`)
                throw new Error(message)
            }

            try {
                // Gọi refresh (KHÔNG gửi Authorization)
                const refreshResponse = await API.request({
                    url: `/api/v1${REFRESH_PATH}`,
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json'
                    },
                    data: { refreshToken }
                })

                const refreshData = refreshResponse.data

                if (!refreshData?.data?.accessToken) {
                    //NOTE - Nếu refresh không trả về accessToken mới thì logout luôn (tránh vòng lặp refresh)
                    tokenFacade.logout()
                    useAuthStore.getState().clearUser()
                    redirect({
                        to: '/auth',
                        search: {
                            mode: 'login'
                        }
                    })
                    throw new Error(refreshData?.message || 'Refresh token thất bại')
                }

                // Lưu token mới
                tokenFacade.login(refreshData.data.accessToken, refreshData.data.refreshToken)

                // Retry lại request gốc đúng 1 lần với token mới
                return bffApiService<T>(url, options, true)
            } catch (refreshError) {
                tokenFacade.logout()
                const refreshMessage = axios.isAxiosError(refreshError)
                    ? refreshError.response?.data?.message ||
                      `Refresh token thất bại (HTTP ${refreshError.response?.status})`
                    : refreshError instanceof Error
                      ? refreshError.message
                      : 'Refresh token thất bại'
                console.error(`${method} ${url}: ${refreshMessage}`)
                throw new Error(refreshMessage)
            }
        }

        // Các lỗi khác: ném message hợp lý
        const message = data?.message || error.message || `HTTP ${status || 'Unknown'}`
        console.error(`${method} ${url}: ${message}`)
        throw new Error(message)
    }
}
