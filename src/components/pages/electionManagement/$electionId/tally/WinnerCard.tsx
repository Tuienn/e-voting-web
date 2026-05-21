import { useTranslation } from 'react-i18next'
import Alert from '@mui/material/Alert'
import Divider from '@mui/material/Divider'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import type { ICandidateTally, ITallyResponse } from '../../../../../types/revealVote'

interface Props {
    data: ITallyResponse
}

const getMaxCandidates = (tally: ICandidateTally[]): ICandidateTally[] => {
    if (!tally || tally.length === 0) return []
    const max = tally.reduce((acc, c) => (c.dbRevealCount > acc ? c.dbRevealCount : acc), 0)
    if (max <= 0) return []
    return tally.filter((c) => c.dbRevealCount === max)
}

const WinnerCard: React.FC<Props> = (props) => {
    const { t } = useTranslation('$electionId')
    const data = props.data

    const hasMismatch =
        data.dbRevealTotal !== data.chainRevealTotal ||
        data.tallyResult.some((c) => c.dbRevealCount !== c.chainRevealCount)

    const topCandidates = getMaxCandidates(data.tallyResult)
    const getName = (c: ICandidateTally) => c.candidateName ?? t('tally.fields.unknownCandidate')

    const renderBody = () => {
        if (data.chainError || hasMismatch) {
            return <Alert severity='info'>{t('tally.winner.needsAudit')}</Alert>
        }

        if (data.status === 'COMPLETED') {
            if (topCandidates.length === 0) {
                return <Alert severity='info'>{t('tally.alerts.noVotes')}</Alert>
            }
            if (topCandidates.length === 1) {
                return (
                    <Typography variant='body1'>
                        {t('tally.winner.winner', { name: getName(topCandidates[0]) })}
                    </Typography>
                )
            }
            const names = topCandidates.map(getName).join(', ')
            return <Typography variant='body1'>{t('tally.winner.tie', { names })}</Typography>
        }

        if (data.status === 'CLOSED') {
            if (topCandidates.length === 0) {
                return <Alert severity='info'>{t('tally.alerts.noVotes')}</Alert>
            }
            if (topCandidates.length === 1) {
                return (
                    <Typography variant='body1'>
                        {t('tally.winner.leading', { name: getName(topCandidates[0]) })}
                    </Typography>
                )
            }
            const names = topCandidates.map(getName).join(', ')
            return <Typography variant='body1'>{t('tally.winner.tie', { names })}</Typography>
        }

        if (data.dbRevealTotal === 0) {
            return <Alert severity='info'>{t('tally.alerts.noVotes')}</Alert>
        }

        return null
    }

    return (
        <Paper sx={{ p: 3 }} elevation={3}>
            <Typography variant='h6' fontWeight='semibold' color='text.secondary'>
                {t('tally.winner.title')}
            </Typography>
            <Divider sx={{ mt: 1.5, mb: 1.5 }} />
            {renderBody()}
        </Paper>
    )
}

export default WinnerCard
