import { useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import Alert from '@mui/material/Alert'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import type { IAuditResponse, ITallyResponse } from '../../../../../../types/revealVote'

interface Props {
    electionId: string
    data: IAuditResponse
}

interface ReconciliationRow {
    label: string
    matched: boolean
    detail: string
}

const AuditReconciliationCard: React.FC<Props> = (props) => {
    const { t } = useTranslation('$electionId')
    const queryClient = useQueryClient()
    const tally = queryClient.getQueryData<ITallyResponse>(['tally', props.electionId])
    const chain = props.data.chain

    const rows: ReconciliationRow[] = []

    if (chain) {
        rows.push({
            label: t('tally.audit.reconciliation.voteCount'),
            matched: props.data.db.voteCount === chain.voteCount,
            detail: t('tally.audit.reconciliation.dbChainValue', {
                db: props.data.db.voteCount,
                chain: chain.voteCount
            })
        })
        rows.push({
            label: t('tally.audit.reconciliation.revealCount'),
            matched: props.data.db.revealCount === chain.revealCount,
            detail: t('tally.audit.reconciliation.dbChainValue', {
                db: props.data.db.revealCount,
                chain: chain.revealCount
            })
        })
    }

    if (tally && !tally.chainError) {
        const candidateMismatchCount = tally.tallyResult.filter(
            (candidate) => candidate.dbRevealCount !== candidate.chainRevealCount
        ).length

        rows.push({
            label: t('tally.audit.reconciliation.totalSelections'),
            matched: tally.dbTotalSelections === tally.chainTotalSelections,
            detail: t('tally.audit.reconciliation.dbChainValue', {
                db: tally.dbTotalSelections,
                chain: tally.chainTotalSelections
            })
        })
        rows.push({
            label: t('tally.audit.reconciliation.candidateMismatchCount'),
            matched: candidateMismatchCount === 0,
            detail: t('tally.audit.reconciliation.mismatchCountValue', { count: candidateMismatchCount })
        })
    }

    return (
        <Paper variant='outlined' sx={{ p: 2 }}>
            <Typography variant='subtitle1' fontWeight='semibold'>
                {t('tally.audit.reconciliation.title')}
            </Typography>
            <Divider sx={{ my: 1.5 }} />
            <Stack spacing={1.5}>
                {chain && props.data.status === 'CLOSED' && !chain.rootCommitted && (
                    <Alert severity='error'>{t('tally.audit.alerts.rootNotCommitted')}</Alert>
                )}
                {!chain && <Alert severity='warning'>{t('tally.audit.reconciliation.chainUnavailable')}</Alert>}
                {rows.length === 0 && <Alert severity='info'>{t('tally.audit.reconciliation.noComparableData')}</Alert>}
                {rows.map((row) => (
                    <Stack
                        key={row.label}
                        direction={{ xs: 'column', sm: 'row' }}
                        spacing={1}
                        alignItems={{ xs: 'flex-start', sm: 'center' }}
                        justifyContent='space-between'
                    >
                        <Stack spacing={0.25}>
                            <Typography variant='body2' fontWeight='medium'>
                                {row.label}
                            </Typography>
                            <Typography variant='body2' color='text.secondary'>
                                {row.detail}
                            </Typography>
                        </Stack>
                        <Chip
                            label={row.matched ? t('tally.status.match') : t('tally.status.mismatch')}
                            color={row.matched ? 'success' : 'error'}
                            size='small'
                        />
                    </Stack>
                ))}
            </Stack>
        </Paper>
    )
}

export default AuditReconciliationCard
