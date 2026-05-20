import { forwardRef, type ReactNode } from 'react'
import Button, { type ButtonProps } from '@mui/material/Button'
import IconButton, { type IconButtonProps } from '@mui/material/IconButton'
import useBreakpoint from '../../../hooks/useBreakpoint'

interface Props extends Omit<ButtonProps, 'startIcon' | 'endIcon'> {
    children: ReactNode
    icon: ReactNode
    iconButtonProps?: Omit<IconButtonProps, 'children' | 'onClick' | 'disabled' | 'color' | 'size'>
}

const ResponsiveButton = forwardRef<HTMLButtonElement, Props>((props, ref) => {
    const breakpoint = useBreakpoint()
    const { children, icon, iconButtonProps, variant, ...sharedProps } = props

    if (breakpoint.md) {
        return (
            <Button {...sharedProps} ref={ref} startIcon={icon} variant={variant}>
                {children}
            </Button>
        )
    }

    return (
        <IconButton {...iconButtonProps} {...(sharedProps as IconButtonProps)} ref={ref}>
            {icon}
        </IconButton>
    )
})

ResponsiveButton.displayName = 'ResponsiveButton'

export default ResponsiveButton
