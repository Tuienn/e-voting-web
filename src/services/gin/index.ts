import { API_URL } from '../../constants/env.config'
import { tokenFacade } from '../../stores/token/token.facade'
import axios from 'axios'

const REFRESH_PATH = '/auth/refresh-token'
const LOGIN_PATH = '/auth/login'

const API = axios.create({
    baseURL: API_URL,
    headers: {
        Accept: 'application/json',
        'ngrok-skip-browser-warning': 'true'
    }
})

export const ginApiService = async <T = any>(url: string, options?: RequestInit, _retried = false): Promise<T> => {
    const token = tokenFacade.getAccessToken()

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
            url: `/v1/api${url}`,
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
            const refreshToken = tokenFacade.getRefreshToken()
            if (!refreshToken) {
                tokenFacade.logout()
                throw new Error('Phiên đăng nhập đã hết hạn (không có refresh token).')
            }

            try {
                // Gọi refresh (KHÔNG gửi Authorization)
                const refreshResponse = await API.request({
                    url: `/v1/api${REFRESH_PATH}`,
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json'
                    },
                    data: { refreshToken }
                })

                const refreshData = refreshResponse.data

                if (!refreshData?.data?.accessToken) {
                    tokenFacade.logout()
                    throw new Error(refreshData?.message || 'Refresh token thất bại')
                }

                // Lưu token mới
                tokenFacade.login(refreshData.data.accessToken, refreshData.data.refreshToken)

                // Retry lại request gốc đúng 1 lần với token mới
                return ginApiService<T>(url, options, true)
            } catch (refreshError) {
                tokenFacade.logout()
                throw new Error(
                    axios.isAxiosError(refreshError)
                        ? refreshError.response?.data?.message ||
                              `Refresh token thất bại (HTTP ${refreshError.response?.status})`
                        : 'Refresh token thất bại'
                )
            }
        }

        // Các lỗi khác: ném message hợp lý
        const message = data?.message || error.message || `HTTP ${status || 'Unknown'}`
        throw new Error(message)
    }
}
