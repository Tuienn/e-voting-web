import type { AlertColor } from '@mui/material/Alert'

type INotificationSeverity = AlertColor | 'loading'

export interface INotificationState {
    open: boolean
    message: string
    severity: INotificationSeverity

    notify: (message: string, severity?: INotificationSeverity) => void
    stopNotify: () => void
}
