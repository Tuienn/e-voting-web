import Box from '@mui/material/Box'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { cloneElement, isValidElement, useState } from 'react'

interface Props {
    children: React.ReactNode
    items: {
        label: string
        onClick: () => void
        disabled?: boolean
    }[]
}

const MenuSelector: React.FC<Props> = (props) => {
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(e.currentTarget)
    }

    const childrenWithProps = isValidElement(props.children)
        ? cloneElement(props.children as React.ReactElement<any>, {
              onClick: handleClick
          })
        : props.children

    return (
        <Box>
            {childrenWithProps}
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                {props.items.map((item, idx) => (
                    <MenuItem
                        key={idx}
                        onClick={() => {
                            item.onClick()
                            setAnchorEl(null)
                        }}
                        disabled={item.disabled}
                    >
                        {item.label}
                    </MenuItem>
                ))}
            </Menu>
        </Box>
    )
}

export default MenuSelector
