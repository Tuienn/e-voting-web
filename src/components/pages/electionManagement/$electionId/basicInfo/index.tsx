import { useQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import Paper from '@mui/material/Paper'
import Skeleton from '@mui/material/Skeleton'
import Stack from '@mui/material/Stack'
import ElectionService from '../../../../../services/bff/election.service'
import FirstBlock from './FirstBlock'
import SecondBlock from './SecondBlock'
import ThirdBlock from './ThirdBlock'
import { useEffect } from 'react'
import { useNotify } from '../../../../../stores/notification/notification.selector'
import Alert from '@mui/material/Alert'

interface Props {
    electionId: string
}

const BasicInfoElectionDetail: React.FC<Props> = (props) => {
    const { t } = useTranslation('$electionId')
    const notify = useNotify()

    const queryElection = useQuery({
        queryKey: ['electionAllInfo', props.electionId],
        queryFn: () => ElectionService.getElectionAllInfo(props.electionId)
    })

    useEffect(() => {
        if (queryElection.isError) {
            const message = queryElection.error ? queryElection.error.message : t('basicInfo.error.loadFailed')

            notify(message, 'error')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [queryElection.isError])

    if (queryElection.isPending) {
        return (
            <Stack spacing={2}>
                <Paper sx={{ p: 3 }}>
                    <Stack spacing={1}>
                        <Skeleton width='30%' height={32} />
                        <Skeleton width='60%' height={28} />
                        <Skeleton width='50%' height={28} />
                        <Skeleton width='70%' height={28} />
                        <Skeleton width='55%' height={28} />
                    </Stack>
                </Paper>
                <Paper sx={{ p: 3 }}>
                    <Stack spacing={1}>
                        <Skeleton width='20%' height={32} />
                        <Skeleton variant='rectangular' width='100%' height={120} />
                    </Stack>
                </Paper>
                <Paper sx={{ p: 3 }}>
                    <Stack spacing={1}>
                        <Skeleton width='20%' height={32} />
                        <Skeleton variant='rectangular' width='100%' height={120} />
                    </Stack>
                </Paper>
            </Stack>
        )
    }

    return (
        <Stack spacing={2} mt={2}>
            {queryElection.data?.data.blockchainRef && (
                <Alert severity='success'>{t('basicInfo.alertBlockchainRef')}</Alert>
            )}
            <FirstBlock electionId={props.electionId} data={queryElection.data?.data} />
            <SecondBlock electionId={props.electionId} data={queryElection.data?.data} />
            <ThirdBlock electionId={props.electionId} data={queryElection.data?.data} />
        </Stack>
    )
}

export default BasicInfoElectionDetail
