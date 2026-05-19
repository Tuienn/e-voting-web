import Button from '@mui/material/Button'
import { Link } from '@tanstack/react-router'
import Logo from '../../../assets/svg/icons/logo.svg?react'
import Divider from '@mui/material/Divider'
import AppBar from '@mui/material/AppBar'
import type { INavbarItem } from '../../../types/common'
import TopNavbarActions from './TopNavbarActions'
import Stack from '@mui/material/Stack'
import useBreakpoint from '../../../hooks/useBreakpoint'
import Container from '@mui/material/Container'
import NotificationButton from './NotificationButton'

interface Props {
    items: INavbarItem[]
    activeHrefTo: string
}

const TopNavbar: React.FC<Props> = (props) => {
    const breakpoint = useBreakpoint()

    return (
        <AppBar position='sticky' sx={{ backgroundColor: 'background.paper' }}>
            <Container>
                <Stack direction={'row'} py={1} alignItems={'center'}>
                    <Stack direction={'row'} alignItems={'center'} gap={1} flexGrow={1}>
                        <Logo width={25} />

                        {breakpoint.md && (
                            <>
                                {props.items.map((item) => (
                                    <Button
                                        key={item.label}
                                        component={Link}
                                        to={item.hrefTo}
                                        sx={{ fontWeight: 'bold' }}
                                        color={props.activeHrefTo === item.hrefTo ? 'secondary' : 'primary'}
                                    >
                                        {item.label}
                                    </Button>
                                ))}
                            </>
                        )}
                    </Stack>
                    <Stack direction={'row'} alignItems={'center'}>
                        <TopNavbarActions />

                        <Divider orientation='vertical' flexItem />
                        <NotificationButton />
                    </Stack>
                </Stack>
            </Container>
        </AppBar>
    )
}

export default TopNavbar
