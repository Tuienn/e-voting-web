import { useSearch } from '@tanstack/react-router'
import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import Grid from '@mui/material/Grid'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import LoginSvg from '../../../assets/svg/illustrations/login.svg'
import RegisterSvg from '../../../assets/svg/illustrations/register.svg'
import BackgroundImg from '../../../assets/images/background.jpg'

const fadeAnim = 'opacity .4s ease, transform .4s ease'

const AuthPage: React.FC = () => {
    const { mode = 'login' } = useSearch({ from: '/auth' })
    const isLogin = mode === 'login'

    return (
        <>
            <img
                src={BackgroundImg}
                alt=''
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0
                }}
            />
            <Dialog open maxWidth='md' fullWidth>
                <DialogContent
                    sx={{
                        p: 0,
                        overflow: 'hidden',
                        minHeight: 400
                    }}
                >
                    <Grid container spacing={0}>
                        <Grid
                            size={{ xs: 0, md: 6 }}
                            sx={{
                                bgcolor: 'primary.main',
                                display: { xs: 'none', md: 'flex' },
                                alignItems: 'center',
                                justifyContent: 'center',
                                position: 'relative',
                                transform: {
                                    xs: 'none',
                                    md: isLogin ? 'translateX(0%)' : 'translateX(100%)'
                                },
                                transition: 'transform .6s cubic-bezier(0.4,0,0.2,1)'
                            }}
                        >
                            <Box
                                component='img'
                                src={LoginSvg}
                                sx={{
                                    position: 'absolute',
                                    maxWidth: 320,
                                    opacity: isLogin ? 1 : 0,
                                    transform: isLogin ? 'scale(1)' : 'scale(.8)',
                                    transition: fadeAnim,
                                    transitionDelay: isLogin ? '.2s' : 0
                                }}
                            />

                            <Box
                                component='img'
                                src={RegisterSvg}
                                sx={{
                                    position: 'absolute',
                                    maxWidth: 320,
                                    opacity: !isLogin ? 1 : 0,
                                    transform: !isLogin ? 'scale(1)' : 'scale(.8)',
                                    transition: fadeAnim,
                                    transitionDelay: !isLogin ? '.2s' : 0
                                }}
                            />
                        </Grid>

                        <Grid
                            size={{ xs: 12, md: 6 }}
                            sx={{
                                display: 'grid',
                                transform: {
                                    xs: 'none',
                                    md: isLogin ? 'translateX(0%)' : 'translateX(-100%)'
                                },
                                transition: 'transform .6s cubic-bezier(0.4,0,0.2,1)'
                            }}
                        >
                            <Box
                                sx={{
                                    gridArea: '1/1',
                                    opacity: isLogin ? 1 : 0,
                                    transform: isLogin ? 'none' : 'translateX(-20px)',
                                    transition: fadeAnim,
                                    transitionDelay: isLogin ? '.2s' : 0,
                                    pointerEvents: isLogin ? 'auto' : 'none',
                                    visibility: isLogin ? 'visible' : 'hidden'
                                }}
                            >
                                <LoginForm />
                            </Box>

                            <Box
                                sx={{
                                    gridArea: '1/1',
                                    opacity: !isLogin ? 1 : 0,
                                    transform: !isLogin ? 'none' : 'translateX(20px)',
                                    transition: fadeAnim,
                                    transitionDelay: !isLogin ? '.2s' : 0,
                                    pointerEvents: !isLogin ? 'auto' : 'none',
                                    visibility: !isLogin ? 'visible' : 'hidden'
                                }}
                            >
                                <RegisterForm />
                            </Box>
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default AuthPage
