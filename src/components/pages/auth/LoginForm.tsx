import { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from '@tanstack/react-router'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Logo from '../../../assets/svg/icons/logo.svg?react'
import PasswordInput from '../../common/mui/PasswordInput'
import { useMutation } from '@tanstack/react-query'
import AuthService from '../../../services/gin/auth.service'
import { tokenFacade } from '../../../stores/token/token.facade'
import { useNotify } from '../../../stores/notification/notification.selector'

const LoginForm: React.FC = () => {
    const { t } = useTranslation('auth')
    const navigate = useNavigate()
    const notify = useNotify()

    const loginSchema = useMemo(
        () =>
            z.object({
                username: z.string().trim().min(1, t('login.error.usernameRequired')),
                password: z.string().trim().min(1, t('login.error.passwordRequired'))
            }),
        [t]
    )

    type LoginFormData = z.infer<typeof loginSchema>

    const form = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema)
    })

    const mutationLogin = useMutation({
        mutationFn: (data: LoginFormData) => AuthService.login(data.username, data.password),
        onSuccess: (data) => {
            notify(t('login.success.loginSuccess'), 'success')
            tokenFacade.login(data.accessToken, data.refreshToken)
            setTimeout(() => {
                navigate({ to: '/' })
            }, 500)
        },
        onError: () => {
            notify(t('login.error.invalidCredentials'), 'error')
        }
    })

    return (
        <Stack spacing={3} flex={1} p={3}>
            <Stack alignItems='center' spacing={1}>
                <Logo width={30} onClick={() => navigate({ to: '/' })} style={{ cursor: 'pointer' }} />
                <Typography variant='h4' fontWeight='bold' textAlign={'center'}>
                    {t('login.title')}
                </Typography>
                <Typography variant='body2' color='text.secondary' textAlign={'center'}>
                    {t('login.subtitle')}
                </Typography>
            </Stack>

            <Stack component='form' onSubmit={form.handleSubmit((data) => mutationLogin.mutate(data))} spacing={2}>
                <TextField
                    {...form.register('username')}
                    label={t('login.username')}
                    error={!!form.formState.errors.username}
                    helperText={form.formState.errors.username?.message || ''}
                    fullWidth
                    autoComplete='username'
                    autoFocus
                    required
                />

                <PasswordInput
                    {...form.register('password')}
                    label={t('login.password')}
                    error={!!form.formState.errors.password}
                    helperText={form.formState.errors.password?.message || ''}
                    fullWidth
                    autoComplete='current-password'
                    required
                />

                <Button
                    type='submit'
                    variant='contained'
                    size='large'
                    loading={form.formState.isSubmitting || mutationLogin.isPending}
                    fullWidth
                >
                    {t('login.submit')}
                </Button>
            </Stack>

            <Stack direction='row' spacing={0.5} justifyContent='center'>
                <Typography variant='body2' color='text.secondary'>
                    {t('login.noAccount')}
                </Typography>
                <Link to='/auth' search={{ mode: 'register' }}>
                    <Typography variant='body2' color='primary'>
                        {t('login.signUp')}
                    </Typography>
                </Link>
            </Stack>
        </Stack>
    )
}

export default LoginForm
