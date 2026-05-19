import type { ReactNode } from 'react'
import AppBar from '@mui/material/AppBar'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import ButtonGroup from '@mui/material/ButtonGroup'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useRouter } from '@tanstack/react-router'
import Container from '@mui/material/Container'

interface Props {
    title: string
    actions?: ReactNode[]
    hasBackButton?: boolean
}

const PageHeader: React.FC<Props> = (props) => {
    const router = useRouter()

    const handleBack = () => {
        router.history.back()
    }

    return (
        <AppBar position='sticky' sx={{ backgroundColor: 'background.paper' }}>
            <Container>
                <Stack direction='row' py={1} alignItems='center' gap={2}>
                    <Stack direction='row' alignItems='center' gap={1} flexGrow={1}>
                        {props.hasBackButton && (
                            <IconButton onClick={handleBack}>
                                <ArrowBackIcon />
                            </IconButton>
                        )}
                        <Typography variant='h6' component='div' fontWeight='bold' color='text.secondary'>
                            {props.title}
                        </Typography>
                    </Stack>

                    {props.actions && props.actions.length > 0 && (
                        <ButtonGroup variant='outlined'>{props.actions.map((item) => item)}</ButtonGroup>
                    )}
                </Stack>
            </Container>
        </AppBar>
    )
}

export default PageHeader
