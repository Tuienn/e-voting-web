import { useThemeColorStore } from './themeColor.store'

export const useThemeColor = () => useThemeColorStore((state) => state.themeColor)
export const useSetThemeColor = () => useThemeColorStore((state) => state.setThemeColor)
