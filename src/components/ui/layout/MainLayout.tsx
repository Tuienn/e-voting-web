import Box from '@mui/material/Box'
import type { ReactNode } from 'react'
import TopNavbar from './TopNavbar'
import BottomNavbar from './BottomNavbar'
import type { NavbarItem } from '../../../types/common'
import { useTranslation } from 'react-i18next'
import { useLocation } from '@tanstack/react-router'
import useBreakpoint from '../../../hooks/useBreakpoint'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'
import HowToVoteIcon from '@mui/icons-material/HowToVote'

interface Props {
    children: ReactNode
}

const MainLayout: React.FC<Props> = (props) => {
    const { t } = useTranslation('layout')
    const breakpoint = useBreakpoint()
    const location = useLocation()
    const activeHrefTo = location.pathname

    const navbarItems: NavbarItem[] = [
        // { label: t('home'), hrefTo: '/', icon: <HomeIcon /> },
        { label: t('userManagement'), hrefTo: '/user-management', icon: <PeopleAltIcon /> },
        { label: t('electionManagement'), hrefTo: '/election-management', icon: <HowToVoteIcon /> }
    ]

    return (
        <Box>
            {['/', '/personal', '/user-management', '/election-management'].includes(activeHrefTo) && (
                <TopNavbar items={navbarItems} activeHrefTo={activeHrefTo} />
            )}
            {props.children}
            {!breakpoint.md && <BottomNavbar items={navbarItems} activeHrefTo={activeHrefTo} />}
        </Box>
    )
}

export default MainLayout
