import { useTranslation } from 'react-i18next'
import Chip from '@mui/material/Chip'
import type { ChipProps } from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import type { ICandidateTally, ITallyResponse } from '../../../../../types/revealVote'
import CustomTable from '../../../../../components/ui/mui/CustomTable'
import LongText from '../../../../ui/mui/LongText'

type StatusKey = 'match' | 'mismatch' | 'unknown'

const STATUS_COLOR: Record<StatusKey, ChipProps['color']> = {
    match: 'success',
    mismatch: 'error',
    unknown: 'default'
}

interface Props {
    data: ITallyResponse
}

const getRowStatus = (candidate: ICandidateTally, chainError: string | null): StatusKey => {
    if (chainError) return 'unknown'
    if (candidate.dbRevealCount === candidate.chainRevealCount) return 'match'
    return 'mismatch'
}

const CandidateResultsTable: React.FC<Props> = (props) => {
    const { t } = useTranslation('$electionId')
    const data = props.data

    return (
        <CustomTable
            items={[
                {
                    header: t('tally.table.candidate'),
                    name: 'candidateName',
                    render: (row: ICandidateTally) =>
                        row.candidateName === null ? (
                            <Stack direction='row' spacing={1} alignItems='center'>
                                <Chip label={t('tally.alerts.candidateNameNull')} color='warning' size='small' />
                            </Stack>
                        ) : (
                            row.candidateName
                        )
                },
                {
                    header: t('tally.table.candidateId'),
                    name: 'candidateId',
                    render: (row: ICandidateTally) => <LongText value={row.candidateId} />
                },
                {
                    header: t('tally.table.dbReveal'),
                    name: 'dbRevealCount'
                },
                {
                    header: t('tally.table.chainReveal'),
                    name: 'chainRevealCount',
                    render: (row: ICandidateTally) => (data.chainError ? '-' : row.chainRevealCount)
                },
                {
                    header: t('tally.table.status'),
                    name: 'status',
                    render: (row: ICandidateTally) => {
                        const status = getRowStatus(row, data.chainError)
                        return <Chip label={t(`tally.status.${status}`)} color={STATUS_COLOR[status]} size='small' />
                    }
                },
                {
                    header: t('tally.table.percent'),
                    name: 'percent',
                    render: (row: ICandidateTally) =>
                        data.dbTotalSelections === 0
                            ? '-'
                            : `${((row.dbRevealCount / data.dbTotalSelections) * 100).toFixed(1)}%`
                }
            ]}
            data={data.tallyResult}
        />
    )
}

export default CandidateResultsTable
