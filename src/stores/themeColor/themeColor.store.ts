import { create } from 'zustand'
import { type IThemeColorState } from './themeColor.types'
import { persist } from 'zustand/middleware'
import { getDataStorage, removeDataStorage, saveDataStorage } from '../../lib/handleStorage'
import { DEFAULT_THEME_COLOR, THEME_COLOR_STORAGE_KEY } from '../../constants/theme'

export const useThemeColorStore = create<IThemeColorState>()(
    persist(
        (set) => ({
            themeColor: DEFAULT_THEME_COLOR,
            setThemeColor: (color) => set({ themeColor: color })
        }),
        {
            name: THEME_COLOR_STORAGE_KEY,
            storage: {
                getItem: (key) => getDataStorage(key, 'local'),
                setItem: (key, value) => saveDataStorage(key, value, 'local'),
                removeItem: (key) => removeDataStorage(key, 'local')
            }
        }
    )
)
