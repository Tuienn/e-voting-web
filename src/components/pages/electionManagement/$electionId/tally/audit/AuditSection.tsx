import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import Alert from '@mui/material/Alert'
import Divider from '@mui/material/Divider'
import Paper from '@mui/material/Paper'
import Skeleton from '@mui/material/Skeleton'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import RevealVoteService from '../../../../../../services/revealVote/revealVote.service'
import { useUser } from '../../../../../../stores/auth/auth.selector'
import { useNotify } from '../../../../../../stores/notification/notification.selector'
import ChainErrorAlert from '../ChainErrorAlert'
import AuditDbCard from './AuditDbCard'
import AuditChainCard from './AuditChainCard'
import AuditReconciliationCard from './AuditReconciliationCard'

interface Props {
    electionId: string
}

const AuditSection: React.FC<Props> = (props) => {
    const { t } = useTranslation('$electionId')
    const user = useUser()
    const notify = useNotify()

    const queryAudit = useQuery({
        queryKey: ['tallyAudit', props.electionId],
        queryFn: () => RevealVoteService.getAudit(props.electionId),
        enabled: user?.role === 'ADMIN'
    })

    useEffect(() => {
        if (queryAudit.isError) {
            const message = queryAudit.error?.message || t('tally.error.auditLoadFailed')
            notify(message, 'error')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [queryAudit.isError])

    if (user?.role !== 'ADMIN') return null

    if (queryAudit.isPending) {
        return (
            <Paper sx={{ p: 3 }} elevation={3}>
                <Stack spacing={2}>
                    <Skeleton width='30%' height={32} />
                    <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                        <Skeleton variant='rectangular' width='100%' height={160} />
                        <Skeleton variant='rectangular' width='100%' height={160} />
                    </Stack>
                    <Skeleton variant='rectangular' width='100%' height={180} />
                </Stack>
            </Paper>
        )
    }

    if (queryAudit.isError || !queryAudit.data) {
        return <Alert severity='error'>{t('tally.error.auditLoadFailed')}</Alert>
    }

    const data = queryAudit.data

    return (
        <Paper sx={{ p: 3 }} elevation={3}>
            <Typography variant='h6' fontWeight='semibold' color='text.secondary'>
                {t('tally.audit.title')}
            </Typography>
            <Divider sx={{ my: 1.5 }} />
            <Stack spacing={2}>
                <ChainErrorAlert error={data.chainError} />
                <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                    <AuditDbCard db={data.db} />
                    <AuditChainCard chain={data.chain} chainError={data.chainError} />
                </Stack>
                <AuditReconciliationCard electionId={props.electionId} data={data} />
            </Stack>
        </Paper>
    )
}

export default AuditSection
