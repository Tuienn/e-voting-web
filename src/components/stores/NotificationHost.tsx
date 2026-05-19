import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import CircularProgress from '@mui/material/CircularProgress'
import { useNotificationStore } from '../../stores/notification/notification.store'
import useBreakpoint from '../../hooks/useBreakpoint'

const NotificationHost = () => {
    const { open, message, severity, stopNotify } = useNotificationStore()
    const alertSeverity = severity === 'loading' ? 'info' : severity
    const autoHideDuration = severity === 'error' || severity === 'loading' ? null : 3000
    const { sm } = useBreakpoint()

    const handleClose = (_event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') return
        stopNotify()
    }

    return (
        <Snackbar
            open={open}
            autoHideDuration={autoHideDuration}
            onClose={handleClose}
            anchorOrigin={sm ? { vertical: 'bottom', horizontal: 'left' } : { vertical: 'top', horizontal: 'center' }}
        >
            <Alert
                elevation={6}
                onClose={handleClose}
                severity={alertSeverity}
                icon={severity === 'loading' ? <CircularProgress size={16} /> : undefined}
            >
                {message}
            </Alert>
        </Snackbar>
    )
}

export default NotificationHost
