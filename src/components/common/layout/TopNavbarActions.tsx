import Button from '@mui/material/Button'
import { useTranslation } from 'react-i18next'
import { Link } from '@tanstack/react-router'
import { useIsAuthenticated } from '../../../stores/auth/auth.selector'

const TopNavbarActions = () => {
    const { t } = useTranslation('layout')
    const isAuthenticated = useIsAuthenticated()

    return isAuthenticated ? (
        <>
            <Button color='primary' variant='outlined'>
                {t('withdraw')}
            </Button>
            <Button color='primary' variant='contained' sx={{ mx: 1 }}>
                {t('deposit')}
            </Button>
        </>
    ) : (
        <Button color='primary' variant='outlined' component={Link} to='/auth' sx={{ mr: 1 }}>
            {t('login')}
        </Button>
    )
}

export default TopNavbarActions
