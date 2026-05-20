import { create } from 'zustand'
import { type IAuthState } from './auth.types'
import { persist } from 'zustand/middleware'
import { getDataStorage, saveDataStorage } from '../../lib/handleStorage'

// export const useAuthStore = create<IAuthState>((set) => ({
//     user: null,
//     isAuthenticated: false,

//     setUser: (user) => set({ user, isAuthenticated: true }),
//     clearUser: () => set({ user: null, isAuthenticated: false }),
//     updateUser: (partial) =>
//         set((state) => ({
//             user: state.user ? { ...state.user, ...partial } : state.user
//         }))
// }))

export const useAuthStore = create<IAuthState>()(
    persist(
        (set) => ({
            user: null,
            isAuthenticated: false,

            setUser: (user) => set({ user, isAuthenticated: true }),
            clearUser: () => set({ user: null, isAuthenticated: false }),
            updateUser: (partial) =>
                set((state) => ({
                    user: state.user ? { ...state.user, ...partial } : state.user
                }))
        }),
        {
            name: 'auth',
            storage: {
                getItem: (key) => getDataStorage(key, 'session'),
                setItem: (key, value) => saveDataStorage(key, value, 'session'),
                removeItem: (key) => saveDataStorage(key, null, 'session')
            }
        }
    )
)
