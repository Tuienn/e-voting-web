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
    } else if (
        data.dbRevealedBallots === data.chainRevealedBallots &&
        data.dbTotalSelections === data.chainTotalSelections
    ) {
        status = 'match'
    } else {
        status = 'mismatch'
    }

    return (
        <Paper sx={{ p: 3 }} elevation={3}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} flexWrap='wrap' useFlexGap>
                <Box flex={1} minWidth={140}>
                    <Typography variant='body2' color='text.secondary'>
                        {t('tally.fields.dbRevealedBallots')}
                    </Typography>
                    <Typography variant='h4'>{data.dbRevealedBallots}</Typography>
                </Box>
                <Box flex={1} minWidth={140}>
                    <Typography variant='body2' color='text.secondary'>
                        {t('tally.fields.chainRevealedBallots')}
                    </Typography>
                    <Typography variant='h4'>{data.chainError ? '-' : data.chainRevealedBallots}</Typography>
                </Box>
                <Box flex={1} minWidth={140}>
                    <Typography variant='body2' color='text.secondary'>
                        {t('tally.fields.dbTotalSelections')}
                    </Typography>
                    <Typography variant='h4'>{data.dbTotalSelections}</Typography>
                </Box>
                <Box flex={1} minWidth={140}>
                    <Typography variant='body2' color='text.secondary'>
                        {t('tally.fields.chainTotalSelections')}
                    </Typography>
                    <Typography variant='h4'>{data.chainError ? '-' : data.chainTotalSelections}</Typography>
                </Box>
                <Box flex={1} minWidth={140}>
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
