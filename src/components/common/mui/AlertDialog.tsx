import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { useTranslation } from 'react-i18next'

interface Props {
    open: boolean
    onClose: () => void
    onOk: () => void
    title: string
    okText?: string
    description?: string
    children?: React.ReactNode
    loading?: boolean
}

const AlertDialog: React.FC<Props> = (props) => {
    const { t } = useTranslation('common')

    return (
        <Dialog
            open={props.open}
            onClose={() => {
                if (props.loading) return
                props.onClose()
            }}
            aria-labelledby='alert-dialog-title'
            aria-describedby='alert-dialog-description'
        >
            <DialogTitle id='alert-dialog-title'>{props.title}</DialogTitle>
            {(props.description || props.children) && (
                <DialogContent sx={{ minWidth: '300px' }}>
                    {props.description && (
                        <DialogContentText id='alert-dialog-description'>{props.description}</DialogContentText>
                    )}
                    {props.children}
                </DialogContent>
            )}
            <DialogActions>
                <Button color='error' onClick={props.onClose} disabled={props.loading}>
                    {t('dialog.cancel')}
                </Button>
                <Button onClick={props.onOk} autoFocus variant='contained' disabled={props.loading}>
                    {props.okText || t('dialog.confirm')}
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default AlertDialog
