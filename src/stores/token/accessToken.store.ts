import { create } from 'zustand'
import { type IAccessTokenState } from './token.types'
import { persist } from 'zustand/middleware'
import { getDataStorage, removeDataStorage, saveDataStorage } from '../../lib/handleStorage'

export const useAccessTokenStore = create<IAccessTokenState>()(
    persist(
        (set) => ({
            accessToken: null,
            setAccessToken: (token) => set({ accessToken: token }),
            clearAccessToken: () => set({ accessToken: null })
        }),
        {
            name: 'accessToken',
            storage: {
                getItem: (key) => getDataStorage(key, 'session'),
                setItem: (key, value) => saveDataStorage(key, value, 'session'),
                removeItem: (key) => removeDataStorage(key, 'session')
            }
        }
    )
)
