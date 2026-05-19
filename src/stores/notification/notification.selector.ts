import { useNotificationStore } from './notification.store'

export const useNotify = () => useNotificationStore((state) => state.notify)

export const useStopNotify = () => useNotificationStore((state) => state.stopNotify)

export const useNotificationState = () =>
    useNotificationStore((state) => ({
        open: state.open,
        message: state.message,
        severity: state.severity
    }))
