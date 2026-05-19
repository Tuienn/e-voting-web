import Popover from '@mui/material/Popover'
import { useState } from 'react'

export interface Props {
    children: React.ReactNode
    openContent: (close: () => void) => React.ReactNode
    anchorOrigin?: {
        vertical: 'top' | 'bottom' | 'center'
        horizontal: 'left' | 'right' | 'center'
    }
    transformOrigin?: {
        vertical: 'top' | 'bottom' | 'center'
        horizontal: 'left' | 'right' | 'center'
    }
}

// A Popover that renders inside shadow DOM and opens when clicking on the children
const CustomPopover: React.FC<Props> = (props) => {
    const [anchorPosition, setAnchorPosition] = useState<{ top: number; left: number } | null>(null)

    const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation()
        const rect = event.currentTarget.getBoundingClientRect()
        setAnchorPosition({
            top: rect.bottom,
            left: rect.right
        })
    }

    const handleClose = () => {
        setAnchorPosition(null)
    }

    const open = Boolean(anchorPosition)

    return (
        <>
            <span onClick={handleOpen} style={{ display: 'inline-flex' }}>
                {props.children}
            </span>
            <Popover
                open={open}
                onClose={handleClose}
                anchorReference='anchorPosition'
                anchorPosition={anchorPosition ?? { top: 0, left: 0 }}
                anchorOrigin={props.anchorOrigin}
                transformOrigin={props.transformOrigin}
                disablePortal
            >
                {props.openContent(handleClose)}
            </Popover>
        </>
    )
}

export default CustomPopover
