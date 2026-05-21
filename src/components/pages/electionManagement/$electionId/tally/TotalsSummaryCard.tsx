import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import type { ChipProps } from '@mui/material/Chip'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import type { ITallyResponse } from '../../../../../types/revealVote'

type StatusKey = 'match' | 'mismatch' | 'unknown'

const STATUS_COLOR: Record<StatusKey, ChipProps['color']> = {
    match: 'success',
    mismatch: 'error',
    unknown: 'default'
}

interface Props {
    data: ITallyResponse
}

const TotalsSummaryCard: React.FC<Props> = (props) => {
    const { t } = useTranslation('$electionId')
    const data = props.data

    let status: StatusKey
    if (data.chainError) {
        status = 'unknown'
    } else if (data.dbRevealTotal === data.chainRevealTotal) {
        status = 'match'
    } else {
        status = 'mismatch'
    }

    return (
        <Paper sx={{ p: 3 }} elevation={3}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3}>
                <Box flex={1}>
                    <Typography variant='body2' color='text.secondary'>
                        {t('tally.fields.dbRevealTotal')}
                    </Typography>
                    <Typography variant='h4'>{data.dbRevealTotal}</Typography>
                </Box>
                <Box flex={1}>
                    <Typography variant='body2' color='text.secondary'>
                        {t('tally.fields.chainRevealTotal')}
                    </Typography>
                    <Typography variant='h4'>{data.chainError ? '-' : data.chainRevealTotal}</Typography>
                </Box>
                <Box flex={1}>
                    <Typography variant='body2' color='text.secondary'>
                        {t('tally.fields.overallStatus')}
                    </Typography>
                    <Box mt={1}>
                        <Chip label={t(`tally.status.${status}`)} color={STATUS_COLOR[status]} size='small' />
                    </Box>
                </Box>
            </Stack>
        </Paper>
    )
}

export default TotalsSummaryCard
