import type { ReactNode } from 'react'
import Button, { type ButtonProps } from '@mui/material/Button'
import IconButton, { type IconButtonProps } from '@mui/material/IconButton'
import useBreakpoint from '../../../hooks/useBreakpoint'

interface Props extends Omit<ButtonProps, 'startIcon' | 'endIcon'> {
    children: ReactNode
    icon: ReactNode
    iconButtonProps?: Omit<IconButtonProps, 'children' | 'onClick' | 'disabled' | 'color' | 'size'>
}

const ResponsiveButton: React.FC<Props> = (props) => {
    const breakpoint = useBreakpoint()

    if (breakpoint.md) {
        return (
            <Button startIcon={props.icon} {...props}>
                {props.children}
            </Button>
        )
    }

    return (
        <IconButton
            color={props.color}
            disabled={props.disabled}
            size={props.size}
            onClick={props.onClick}
            loading={props.loading}
            {...props.iconButtonProps}
        >
            {props.icon}
        </IconButton>
    )
}

export default ResponsiveButton
