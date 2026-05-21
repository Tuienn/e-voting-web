import { useTranslation } from 'react-i18next'
import Alert from '@mui/material/Alert'

interface Props {
    error: string | null
}

const ChainErrorAlert: React.FC<Props> = (props) => {
    const { t } = useTranslation('$electionId')

    if (!props.error) return null

    return <Alert severity='warning'>{t('tally.alerts.chainError', { error: props.error })}</Alert>
}

export default ChainErrorAlert
