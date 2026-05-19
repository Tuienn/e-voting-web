import Stack from '@mui/material/Stack'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

interface Props {
    name: string
    phone: string
    avatar?: string
}

const InfoUser: React.FC<Props> = (props) => {
    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2)
    }

    return (
        <Box
            sx={{
                background: (theme) =>
                    `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                borderRadius: 3,
                p: 3,
                color: 'white',
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: -50,
                    right: -50,
                    width: 200,
                    height: 200,
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.1)',
                    pointerEvents: 'none'
                }
            }}
        >
            <Stack direction='row' spacing={2} alignItems='center' position='relative' zIndex={1}>
                <Avatar
                    src={props.avatar}
                    alt={props.name}
                    sx={{
                        width: 80,
                        height: 80,
                        fontSize: '2rem',
                        fontWeight: 600,
                        border: (theme) => `3px solid ${theme.palette.background.paper}`,
                        boxShadow: 3
                    }}
                >
                    {!props.avatar && getInitials(props.name)}
                </Avatar>
                <Stack spacing={0.5} flex={1}>
                    <Typography variant='h5' fontWeight='bold' color='inherit'>
                        {props.name}
                    </Typography>
                    <Typography variant='body2' sx={{ opacity: 0.9 }}>
                        {props.phone}
                    </Typography>
                </Stack>
            </Stack>
        </Box>
    )
}

export default InfoUser
