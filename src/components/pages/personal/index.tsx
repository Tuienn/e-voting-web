import { useState } from 'react'
import Stack from '@mui/material/Stack'
import Container from '@mui/material/Container'
import Switch from '@mui/material/Switch'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import ChevronRight from '@mui/icons-material/ChevronRight'
import Notifications from '@mui/icons-material/Notifications'
import Language from '@mui/icons-material/Language'
import Lock from '@mui/icons-material/Lock'
import DarkMode from '@mui/icons-material/DarkMode'
import Logout from '@mui/icons-material/Logout'
import Person from '@mui/icons-material/Person'
import Palette from '@mui/icons-material/Palette'
import InfoUser from './InfoUser'
import SettingItem from './SettingItem'
import SettingItemGroup from './SettingItemGroup'
import AlertDialog from '../../ui/mui/AlertDialog'
import { useNavigate } from '@tanstack/react-router'
import { tokenFacade } from '../../../stores/token/token.facade'
import { useNotify } from '../../../stores/notification/notification.selector'
import { useTranslation } from 'react-i18next'
import ThemeSwitch from '../../ui/setting/ThemeSwitch'
import LanguageSelector from '../../ui/setting/LanguageSelector'
import ThemeColorSelector from '../../ui/setting/ThemeColorSelector'
import { useClearUser } from '../../../stores/auth/auth.selector'
import { useMutation } from '@tanstack/react-query'
import AuthService from '../../../services/bff/auth.service'

const PersonalPage: React.FC = () => {
    const { t } = useTranslation('personal')
    const navigate = useNavigate()
    const notify = useNotify()
    const [showLogoutDialog, setShowLogoutDialog] = useState(false)
    const clearUser = useClearUser()

    // TODO: Replace with real user data from API/store
    const user = {
        name: 'Nguyễn Văn A',
        phone: '+84 123 456 789',
        avatar: undefined // Optional: add avatar URL here
    }

    const handleLogout = () => {
        setShowLogoutDialog(true)
    }

    const mutateLogout = useMutation({
        mutationFn: async () => {
            const refreshToken = tokenFacade.getRefreshToken()
            await AuthService.signOut(refreshToken!)
        },
        onSuccess: () => {
            tokenFacade.logout()
            clearUser()
            notify(t('logout.success'), 'success')
            navigate({ to: '/' })
            setShowLogoutDialog(false)
        }
    })

    return (
        <Container maxWidth='lg' className='children-main-layout'>
            <Stack spacing={2} direction={{ xs: 'column', md: 'row' }} alignItems='stretch'>
                {/* Left column */}
                <Stack spacing={2} width={{ md: 320 }}>
                    <InfoUser name={user.name} phone={user.phone} avatar={user.avatar} />

                    <Button variant='outlined' color='error' size='large' startIcon={<Logout />} onClick={handleLogout}>
                        {t('logout.label')}
                    </Button>
                </Stack>

                {/* Right column */}
                <Stack spacing={2} flex={1}>
                    <SettingItemGroup title={t('settings.account.title')}>
                        <SettingItem
                            icon={<Person />}
                            title={t('settings.account.profile')}
                            action={
                                <IconButton size='small'>
                                    <ChevronRight />
                                </IconButton>
                            }
                        />

                        <SettingItem
                            icon={<Lock />}
                            title={t('settings.account.changePassword')}
                            action={
                                <IconButton size='small'>
                                    <ChevronRight />
                                </IconButton>
                            }
                        />
                    </SettingItemGroup>

                    <SettingItemGroup title={t('settings.preferences.title')}>
                        <SettingItem
                            icon={<Notifications />}
                            title={t('settings.preferences.notifications')}
                            action={<Switch />}
                        />

                        <SettingItem
                            icon={<DarkMode />}
                            title={t('settings.preferences.darkMode')}
                            action={<ThemeSwitch />}
                        />

                        <SettingItem
                            icon={<Palette />}
                            title={t('settings.preferences.themeColor')}
                            action={<ThemeColorSelector />}
                        />

                        <SettingItem
                            icon={<Language />}
                            title={t('settings.preferences.language')}
                            action={<LanguageSelector />}
                        />
                    </SettingItemGroup>
                </Stack>
            </Stack>

            <AlertDialog
                open={showLogoutDialog}
                onClose={() => setShowLogoutDialog(false)}
                onOk={mutateLogout.mutate}
                title={t('logout.confirmTitle')}
                description={t('logout.confirmMessage')}
                loading={mutateLogout.isPending}
            />
        </Container>
    )
}

export default PersonalPage
