import { useTranslation } from 'react-i18next'
import Alert from '@mui/material/Alert'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { BarChart } from '@mui/x-charts/BarChart'
import type { ICandidateTally } from '../../../../../types/revealVote'

interface Props {
    candidates: ICandidateTally[]
    total: number
}

const VoteShareChart: React.FC<Props> = (props) => {
    const { t } = useTranslation('$electionId')

    if (props.total === 0 || props.candidates.length === 0) {
        return <Alert severity='info'>{t('tally.alerts.noVotes')}</Alert>
    }

    return (
        <Paper sx={{ p: 3 }} elevation={3}>
            <Typography variant='h6' fontWeight='semibold' color='text.secondary' mb={2}>
                {t('tally.chart.title')}
            </Typography>
            <BarChart
                xAxis={[
                    {
                        data: props.candidates.map((c) => c.candidateName ?? t('tally.fields.unknownCandidate')),
                        scaleType: 'band'
                    }
                ]}
                series={[
                    {
                        data: props.candidates.map((c) => c.dbRevealCount),
                        label: t('tally.table.dbReveal')
                    }
                ]}
                height={280}
                sx={{ width: '100%' }}
            />
        </Paper>
    )
}

export default VoteShareChart
