import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { Link, useRouter } from '@tanstack/react-router'
import ForbiddenSvg from '../../../assets/svg/illustrations/403.svg' // import SVG như image asset
import { useTranslation } from 'react-i18next'

const ForbiddenPage: React.FC = () => {
    const { t } = useTranslation('layout')
    const router = useRouter()

    return (
        <Stack minHeight='100vh' alignItems='center' justifyContent='center' gap={1.5} px={2}>
            {/* 
              Dùng <img> vì SVG này là illustration tĩnh (403 page),
              không cần đổi màu / animation / interaction.
              Cách này nhẹ, đơn giản và tận dụng cache tốt.
            */}
            <img src={ForbiddenSvg} alt='403 forbidden' width={200} loading='lazy' />

            <Typography variant='h4' textAlign='center' fontWeight={600}>
                {t('forbidden.title')}
            </Typography>

            <Typography variant='body1' color='text.secondary' textAlign='center'>
                {t('forbidden.description')}
            </Typography>

            <Stack direction={{ xs: 'column', sm: 'row' }} gap={1}>
                <Button onClick={() => router.history.back()} variant='outlined' size='large'>
                    {t('forbidden.backButton')}
                </Button>

                <Button component={Link} to='/' variant='contained' size='large'>
                    {t('forbidden.homeButton')}
                </Button>
            </Stack>
        </Stack>
    )
}

export default ForbiddenPage
