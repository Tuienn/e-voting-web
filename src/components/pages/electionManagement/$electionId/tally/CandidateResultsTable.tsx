import { useTranslation } from 'react-i18next'
import Chip from '@mui/material/Chip'
import type { ChipProps } from '@mui/material/Chip'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import type { ICandidateTally, ITallyResponse } from '../../../../../types/revealVote'

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
        <TableContainer component={Paper}>
            <Table size='small'>
                <TableHead>
                    <TableRow>
                        <TableCell>{t('tally.table.candidate')}</TableCell>
                        <TableCell>{t('tally.table.candidateId')}</TableCell>
                        <TableCell align='right'>{t('tally.table.dbReveal')}</TableCell>
                        <TableCell align='right'>{t('tally.table.chainReveal')}</TableCell>
                        <TableCell>{t('tally.table.status')}</TableCell>
                        <TableCell align='right'>{t('tally.table.percent')}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.tallyResult.map((candidate) => {
                        const status = getRowStatus(candidate, data.chainError)
                        const percent =
                            data.dbRevealTotal === 0
                                ? '-'
                                : `${((candidate.dbRevealCount / data.dbRevealTotal) * 100).toFixed(1)}%`

                        return (
                            <TableRow key={candidate.candidateId}>
                                <TableCell>
                                    {candidate.candidateName === null ? (
                                        <Stack direction='row' spacing={1} alignItems='center'>
                                            <Chip
                                                label={t('tally.alerts.candidateNameNull')}
                                                color='warning'
                                                size='small'
                                            />
                                        </Stack>
                                    ) : (
                                        candidate.candidateName
                                    )}
                                </TableCell>
                                <TableCell>
                                    <Typography
                                        sx={{
                                            maxWidth: '20ch',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap'
                                        }}
                                    >
                                        {candidate.candidateId}
                                    </Typography>
                                </TableCell>
                                <TableCell align='right'>{candidate.dbRevealCount}</TableCell>
                                <TableCell align='right'>
                                    {data.chainError ? '-' : candidate.chainRevealCount}
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        label={t(`tally.status.${status}`)}
                                        color={STATUS_COLOR[status]}
                                        size='small'
                                    />
                                </TableCell>
                                <TableCell align='right'>{percent}</TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default CandidateResultsTable
