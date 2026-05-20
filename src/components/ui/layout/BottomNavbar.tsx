import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import BottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'

import type { INavbarItem } from '../../../types/common'
import { Link } from '@tanstack/react-router'

interface Props {
    items: INavbarItem[]
    activeHrefTo: string
}

const BottomNavbar: React.FC<Props> = ({ items, activeHrefTo }) => {
    return (
        <AppBar position='fixed' sx={{ top: 'auto', bottom: 0, bgcolor: 'background.paper' }}>
            <Box>
                <BottomNavigation showLabels value={activeHrefTo}>
                    {items.map((item) => (
                        <BottomNavigationAction
                            key={item.hrefTo}
                            label={item.label}
                            icon={item.icon}
                            value={item.hrefTo}
                            component={Link}
                            to={item.hrefTo}
                        />
                    ))}
                </BottomNavigation>
            </Box>
        </AppBar>
    )
}

export default BottomNavbar
