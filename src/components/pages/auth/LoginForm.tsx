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
import PasswordInput from '../../ui/mui/PasswordInput'
import { useMutation } from '@tanstack/react-query'
import AuthService from '../../../services/bff/auth.service'
import { tokenFacade } from '../../../stores/token/token.facade'
import { useNotify } from '../../../stores/notification/notification.selector'
import { useSetUser } from '../../../stores/auth/auth.selector'
import LoginIcon from '@mui/icons-material/Login'

const LoginForm: React.FC = () => {
    const { t } = useTranslation('auth')
    const navigate = useNavigate()
    const notify = useNotify()
    const setUser = useSetUser()

    const loginSchema = useMemo(
        () =>
            z.object({
                email: z.email(t('login.error.emailInvalid')),
                password: z.string().trim().min(1, t('login.error.passwordRequired'))
            }),
        [t]
    )

    type LoginFormData = z.infer<typeof loginSchema>

    const form = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema)
    })

    const loginMutation = useMutation({
        mutationFn: (data: LoginFormData) => AuthService.login(data.email, data.password),
        onSuccess: (data) => {
            notify(t('login.success.loginSuccess'), 'success')
            tokenFacade.login(data.data.accessToken, data.data.refreshToken)
            setUser({ id: data.data.id, email: data.data.email })
            navigate({ to: '/' })
        },
        onError: (e) => {
            notify(e.message ?? t('login.error.invalidCredentials'), 'error')
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

            <Stack component='form' onSubmit={form.handleSubmit((data) => loginMutation.mutate(data))} spacing={2}>
                <TextField
                    {...form.register('email')}
                    label={t('login.email')}
                    error={!!form.formState.errors.email}
                    helperText={form.formState.errors.email?.message || ''}
                    fullWidth
                    autoComplete='email'
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
                    loading={form.formState.isSubmitting || loginMutation.isPending}
                    fullWidth
                    startIcon={<LoginIcon />}
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
                        {t('login.register')}
                    </Typography>
                </Link>
            </Stack>
        </Stack>
    )
}

export default LoginForm
