import Box from '@mui/material/Box'
import type { ReactNode } from 'react'
import TopNavbar from './TopNavbar'
import BottomNavbar from './BottomNavbar'
import type { INavbarItem } from '../../../types/common'
import { useTranslation } from 'react-i18next'
import HomeIcon from '@mui/icons-material/Home'
import { useLocation } from '@tanstack/react-router'
import useBreakpoint from '../../../hooks/useBreakpoint'

interface Props {
    children: ReactNode
}

const MainLayout: React.FC<Props> = (props) => {
    const { t } = useTranslation('layout')
    const breakpoint = useBreakpoint()
    const location = useLocation()
    const activeHrefTo = location.pathname

    const navbarItems: INavbarItem[] = [{ label: t('home'), hrefTo: '/', icon: <HomeIcon /> }]

    return (
        <Box>
            {(breakpoint.md || ['/', '/personal'].includes(activeHrefTo)) && (
                <TopNavbar items={navbarItems} activeHrefTo={activeHrefTo} />
            )}
            {props.children}
            {!breakpoint.md && <BottomNavbar items={navbarItems} activeHrefTo={activeHrefTo} />}
        </Box>
    )
}

export default MainLayout
