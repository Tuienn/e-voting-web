import { useQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'
import Alert from '@mui/material/Alert'
import Stack from '@mui/material/Stack'
import Skeleton from '@mui/material/Skeleton'
import Paper from '@mui/material/Paper'
import RevealVoteService from '../../../../../services/revealVote/revealVote.service'
import { useNotify } from '../../../../../stores/notification/notification.selector'
import ChainErrorAlert from './ChainErrorAlert'
import WinnerCard from './WinnerCard'
import TotalsSummaryCard from './TotalsSummaryCard'
import VoteShareChart from './VoteShareChart'
import CandidateResultsTable from './CandidateResultsTable'
import AuditSection from './audit/AuditSection'

interface Props {
    electionId: string
}

const TallyPage: React.FC<Props> = (props) => {
    const { t } = useTranslation('$electionId')
    const notify = useNotify()

    const queryTally = useQuery({
        queryKey: ['tally', props.electionId],
        queryFn: () => RevealVoteService.getTally(props.electionId)
    })

    useEffect(() => {
        if (queryTally.isError) {
            const message = queryTally.error?.message || t('tally.error.loadFailed')
            notify(message, 'error')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [queryTally.isError])

    if (queryTally.isPending) {
        return (
            <Stack spacing={2} mt={2}>
                <Paper sx={{ p: 3 }}>
                    <Stack spacing={1}>
                        <Skeleton width='40%' height={32} />
                        <Skeleton width='100%' height={28} />
                        <Skeleton width='100%' height={28} />
                    </Stack>
                </Paper>
                <Paper sx={{ p: 3 }}>
                    <Skeleton variant='rectangular' width='100%' height={280} />
                </Paper>
                <Paper sx={{ p: 3 }}>
                    <Skeleton variant='rectangular' width='100%' height={200} />
                </Paper>
            </Stack>
        )
    }

    if (queryTally.isError || !queryTally.data) {
        return <Alert severity='error'>{t('tally.error.loadFailed')}</Alert>
    }

    const data = queryTally.data

    return (
        <Stack spacing={2} mt={2}>
            <ChainErrorAlert error={data.chainError} />
            <WinnerCard data={data} />
            <TotalsSummaryCard data={data} />
            <VoteShareChart candidates={data.tallyResult} total={data.dbRevealTotal} />
            <CandidateResultsTable data={data} />
            <AuditSection electionId={props.electionId} />
        </Stack>
    )
}

export default TallyPage
