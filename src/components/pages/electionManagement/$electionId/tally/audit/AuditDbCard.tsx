import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import LinearProgress from '@mui/material/LinearProgress'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import type { IAuditResponse } from '../../../../../../types/revealVote'

interface Props {
    db: IAuditResponse['db']
}

const AuditDbCard: React.FC<Props> = (props) => {
    const { t } = useTranslation('$electionId')
    const progress = props.db.voteCount === 0 ? 0 : (props.db.revealCount / props.db.voteCount) * 100

    return (
        <Paper variant='outlined' sx={{ p: 2, flex: 1 }}>
            <Stack spacing={1.5}>
                <Typography variant='subtitle1' fontWeight='semibold'>
                    {t('tally.audit.db.title')}
                </Typography>
                <Box>
                    <Typography variant='body2' color='text.secondary'>
                        {t('tally.audit.db.voteCount')}
                    </Typography>
                    <Typography variant='h5'>{props.db.voteCount}</Typography>
                </Box>
                <Box>
                    <Typography variant='body2' color='text.secondary'>
                        {t('tally.audit.db.revealCount')}
                    </Typography>
                    <Typography variant='h5'>{props.db.revealCount}</Typography>
                </Box>
                <Box>
                    <Stack direction='row' justifyContent='space-between' alignItems='center' mb={0.5}>
                        <Typography variant='body2' color='text.secondary'>
                            {t('tally.audit.db.progress')}
                        </Typography>
                        <Typography variant='body2'>{progress.toFixed(1)}%</Typography>
                    </Stack>
                    <LinearProgress variant='determinate' value={Math.min(progress, 100)} />
                </Box>
            </Stack>
        </Paper>
    )
}

export default AuditDbCard
