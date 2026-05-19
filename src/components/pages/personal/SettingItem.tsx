import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

interface Props {
    icon: React.ReactNode
    title: string
    action: React.ReactNode
}

const SettingItem: React.FC<Props> = (props) => {
    return (
        <Stack
            direction='row'
            alignItems='center'
            spacing={2}
            sx={{
                py: 2,
                px: 2.5,
                borderRadius: 2,
                transition: 'all 0.2s ease',
                '&:hover': {
                    bgcolor: 'action.hover'
                }
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 40,
                    height: 40,
                    borderRadius: 2,
                    bgcolor: 'primary.main',
                    color: 'primary.contrastText',
                    flexShrink: 0
                }}
            >
                {props.icon}
            </Box>
            <Typography variant='body1' fontWeight={500} flex={1}>
                {props.title}
            </Typography>
            {props.action}
        </Stack>
    )
}

export default SettingItem
