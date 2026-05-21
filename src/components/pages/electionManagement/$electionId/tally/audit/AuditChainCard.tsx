import { useTranslation } from 'react-i18next'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import type { IAuditResponse } from '../../../../../../types/revealVote'

interface Props {
    chain: IAuditResponse['chain']
    chainError: string | null
}

const AuditChainCard: React.FC<Props> = (props) => {
    const { t } = useTranslation('$electionId')

    if (!props.chain) {
        return (
            <Paper variant='outlined' sx={{ p: 2, flex: 1 }}>
                <Stack spacing={1.5}>
                    <Typography variant='subtitle1' fontWeight='semibold'>
                        {t('tally.audit.chain.title')}
                    </Typography>
                    <Alert severity='warning'>
                        {props.chainError
                            ? t('tally.alerts.chainError', { error: props.chainError })
                            : t('tally.audit.chain.unavailable')}
                    </Alert>
                </Stack>
            </Paper>
        )
    }

    const revealVoteMatch = props.chain.voteCount === props.chain.revealCount

    return (
        <Paper variant='outlined' sx={{ p: 2, flex: 1 }}>
            <Stack spacing={1.5}>
                <Typography variant='subtitle1' fontWeight='semibold'>
                    {t('tally.audit.chain.title')}
                </Typography>
                <Box>
                    <Typography variant='body2' color='text.secondary'>
                        {t('tally.audit.chain.voteCount')}
                    </Typography>
                    <Typography variant='h5'>{props.chain.voteCount}</Typography>
                </Box>
                <Box>
                    <Typography variant='body2' color='text.secondary'>
                        {t('tally.audit.chain.revealCount')}
                    </Typography>
                    <Typography variant='h5'>{props.chain.revealCount}</Typography>
                </Box>
                <Stack direction='row' spacing={1} flexWrap='wrap' useFlexGap>
                    <Chip
                        label={
                            props.chain.rootCommitted
                                ? t('tally.audit.chain.rootCommitted')
                                : t('tally.audit.chain.rootNotCommitted')
                        }
                        color={props.chain.rootCommitted ? 'success' : 'error'}
                        size='small'
                    />
                    <Chip
                        label={
                            revealVoteMatch
                                ? t('tally.audit.chain.revealVoteMatch')
                                : t('tally.audit.chain.revealVoteMismatch')
                        }
                        color={revealVoteMatch ? 'success' : 'warning'}
                        size='small'
                    />
                </Stack>
            </Stack>
        </Paper>
    )
}

export default AuditChainCard
