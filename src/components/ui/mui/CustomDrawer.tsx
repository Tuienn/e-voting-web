import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import Typography from '@mui/material/Typography'
import type { ReactNode } from 'react'
import useBreakpoint from '../../../hooks/useBreakpoint'

interface Props {
    title?: string
    children: ReactNode

    open: boolean
    onClose: () => void
    footer?: ReactNode
}

const CustomDrawer: React.FC<Props> = (props) => {
    const breakpoint = useBreakpoint()

    return (
        <Drawer open={props.open} onClose={props.onClose} anchor={breakpoint.md ? 'right' : 'bottom'}>
            <Box
                p={2}
                minWidth={400}
                minHeight={300}
                overflow={'auto'}
                maxHeight={breakpoint.md ? '100vh' : '50vh'}
                maxWidth={!breakpoint.md ? '100vw' : '50vw'}
            >
                {props.title && (
                    <>
                        <Typography variant='h6' noWrap component='div'>
                            {props.title}
                        </Typography>
                        <Divider sx={{ my: 1 }} />
                    </>
                )}
                {props.children}
                {props.footer && (
                    <Box position={'absolute'} right={0} bottom={0} left={0} p={2}>
                        {props.footer}
                    </Box>
                )}
            </Box>
        </Drawer>
    )
}

export default CustomDrawer
