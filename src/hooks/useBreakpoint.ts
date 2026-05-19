import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

interface IBreakpoint {
    xs: boolean
    sm: boolean
    md: boolean
    lg: boolean
    xl: boolean
}

const useBreakpoint = (): IBreakpoint => {
    const theme = useTheme()

    // Check if screen width is >= breakpoint value
    const xs = useMediaQuery(theme.breakpoints.up('xs'))
    const sm = useMediaQuery(theme.breakpoints.up('sm'))
    const md = useMediaQuery(theme.breakpoints.up('md'))
    const lg = useMediaQuery(theme.breakpoints.up('lg'))
    const xl = useMediaQuery(theme.breakpoints.up('xl'))

    return {
        xs,
        sm,
        md,
        lg,
        xl
    }
}

export default useBreakpoint
