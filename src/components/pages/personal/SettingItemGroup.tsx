import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import Divider from '@mui/material/Divider'

interface Props {
    title: string
    children: React.ReactNode
}

const SettingItemGroup: React.FC<Props> = (props) => {
    return (
        <Paper
            elevation={0}
            sx={{
                border: 1,
                borderColor: 'divider',
                borderRadius: 3,
                overflow: 'hidden'
            }}
        >
            <Typography
                variant='subtitle2'
                fontWeight='bold'
                textTransform='uppercase'
                sx={{
                    px: 2.5,
                    py: 1.5,
                    bgcolor: 'action.hover',
                    color: 'text.secondary',
                    letterSpacing: 0.5
                }}
            >
                {props.title}
            </Typography>
            <Divider />
            <Stack divider={<Divider />}>{props.children}</Stack>
        </Paper>
    )
}

export default SettingItemGroup
