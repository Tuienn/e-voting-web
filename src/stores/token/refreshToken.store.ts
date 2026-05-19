import { create } from 'zustand'
import { type IRefreshTokenState } from './token.types'
import { persist } from 'zustand/middleware'
import { getDataStorage, removeDataStorage, saveDataStorage } from '../../lib/handleStorage'

export const useRefreshTokenStore = create<IRefreshTokenState>()(
    persist(
        (set) => ({
            refreshToken: null,
            setRefreshToken: (token) => set({ refreshToken: token }),
            clearRefreshToken: () => set({ refreshToken: null })
        }),
        {
            name: 'refreshToken',
            storage: {
                getItem: (key) => getDataStorage(key, 'local'),
                setItem: (key, value) => saveDataStorage(key, value, 'local'),
                removeItem: (key) => removeDataStorage(key, 'local')
            }
        }
    )
)
