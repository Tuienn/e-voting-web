import { decrypt, encrypt } from '../../lib/handleCrypto'
import { useRefreshTokenStore } from './refreshToken.store'
import { useAccessTokenStore } from './accessToken.store'

export const tokenFacade = {
    login: (accessToken: string, refreshToken: string) => {
        const encryptedAccessToken = encrypt(accessToken)
        const encryptedRefreshToken = encrypt(refreshToken)

        if (!encryptedAccessToken || !encryptedRefreshToken) {
            throw new Error('Failed to encrypt access token or refresh token')
        }

        useAccessTokenStore.getState().setAccessToken(encryptedAccessToken)
        useRefreshTokenStore.getState().setRefreshToken(encryptedRefreshToken)
    },

    logout: () => {
        useAccessTokenStore.getState().clearAccessToken()
        useRefreshTokenStore.getState().clearRefreshToken()
    },

    getAccessToken: () => {
        const accessToken = useAccessTokenStore.getState().accessToken
        if (!accessToken) {
            return null
        }
        return decrypt(accessToken)
    },

    getRefreshToken: () => {
        const refreshToken = useRefreshTokenStore.getState().refreshToken
        if (!refreshToken) {
            return null
        }
        return decrypt(refreshToken)
    }
}
