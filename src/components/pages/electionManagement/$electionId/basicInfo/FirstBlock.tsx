import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import type { ChipProps } from '@mui/material/Chip'
import Divider from '@mui/material/Divider'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import ElectionService from '../../../../../services/bff/election.service'
import { useNotify } from '../../../../../stores/notification/notification.selector'
import type { ElectionAllInfo, ElectionStatus } from '../../../../../types/election'
import { formatDateTime } from '../../../../../lib/utils'
import DescriptionView from '../../../../ui/mui/DescriptionView'
import CopyButton from '../../../../ui/mui/CopyButton'

const STATUS_COLOR: Record<ElectionStatus, ChipProps['color']> = {
    PENDING: 'warning',
    ACTIVE: 'success',
    CLOSED: 'default',
    COMPLETED: 'info'
}

interface Props {
    electionId: string
    data: ElectionAllInfo | undefined
}

const FirstBlock: React.FC<Props> = (props) => {
    const { t } = useTranslation(['$electionId', 'common'])
    const notify = useNotify()
    const queryClient = useQueryClient()

    const mutateStartElection = useMutation({
        mutationFn: () => ElectionService.startElection(props.electionId),
        onSuccess: () => {
            notify(t('basicInfo.success.statusUpdated'), 'success')
            queryClient.invalidateQueries({ queryKey: ['electionAllInfo', props.electionId] })
        },
        onError: (error: Error) => notify(error.message || t('basicInfo.error.statusUpdateFailed'), 'error')
    })

    const mutateCloseElection = useMutation({
        mutationFn: () => ElectionService.closeElection(props.electionId),
        onSuccess: () => {
            notify(t('basicInfo.success.statusUpdated'), 'success')
            queryClient.invalidateQueries({ queryKey: ['electionAllInfo', props.electionId] })
        },
        onError: (error: Error) => notify(error.message || t('basicInfo.error.statusUpdateFailed'), 'error')
    })

    const handleStatusChipClick = () => {
        const status = props.data?.status

        if (status === 'PENDING') {
            mutateStartElection.mutate()
        } else if (status === 'ACTIVE') {
            mutateCloseElection.mutate()
        }
    }

    const data = props.data
    if (!data) return null

    const isStatusClickable = data.status === 'PENDING' || data.status === 'ACTIVE'

    return (
        <Paper sx={{ p: 3 }} elevation={3}>
            <Typography variant='h6' fontWeight='semibold' color='text.secondary'>
                {t('basicInfo.blockTitle')}
            </Typography>
            <Divider sx={{ my: 1.5 }} />
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
                <Box flex={1}>
                    <DescriptionView
                        items={[
                            { label: `${t('basicInfo.fields.name')}:`, value: data.name },
                            {
                                label: `${t('basicInfo.fields.status')}:`,
                                value: (
                                    <Chip
                                        label={t(`common:electionStatus.${data.status}`)}
                                        color={STATUS_COLOR[data.status]}
                                        size='small'
                                        onClick={isStatusClickable ? handleStatusChipClick : undefined}
                                        disabled={mutateStartElection.isPending || mutateCloseElection.isPending}
                                        sx={{ cursor: isStatusClickable ? 'pointer' : 'default' }}
                                    />
                                )
                            },
                            {
                                label: `${t('basicInfo.fields.startDate')}:`,
                                value: formatDateTime(data.startDate)
                            },
                            {
                                label: `${t('basicInfo.fields.endDate')}:`,
                                value: formatDateTime(data.endDate)
                            },
                            {
                                label: `${t('basicInfo.fields.createdAt')}:`,
                                value: formatDateTime(data.createdAt)
                            },
                            {
                                label: `${t('basicInfo.fields.updatedAt')}:`,
                                value: formatDateTime(data.updatedAt)
                            }
                        ]}
                    />
                </Box>
                <Box flex={1}>
                    <DescriptionView
                        items={[
                            {
                                label: `${t('basicInfo.fields.merkleRoot')}:`,
                                value: (
                                    <Stack direction='row' spacing={1} alignItems='center'>
                                        <Typography
                                            sx={{ maxWidth: '20ch', overflow: 'hidden', textOverflow: 'ellipsis' }}
                                        >
                                            {data.merkleRoot ?? '-'}
                                        </Typography>
                                        {data.merkleRoot && <CopyButton value={data.merkleRoot} />}
                                    </Stack>
                                )
                            },
                            {
                                label: `${t('basicInfo.fields.blockchainTxId')}:`,
                                value: (
                                    <Typography sx={{ maxWidth: '20ch', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                        {data.blockchainRef ?? '-'}
                                    </Typography>
                                )
                            },
                            {
                                label: `${t('basicInfo.fields.publicKey')}:`,
                                value: (
                                    <Stack direction='row' spacing={1} alignItems='center'>
                                        <Typography
                                            sx={{ maxWidth: '20ch', overflow: 'hidden', textOverflow: 'ellipsis' }}
                                        >
                                            {data.collectivePublicKey ?? '-'}
                                        </Typography>
                                        {data.collectivePublicKey && <CopyButton value={data.collectivePublicKey} />}
                                    </Stack>
                                )
                            }
                        ]}
                    />
                </Box>
            </Stack>
        </Paper>
    )
}

export default FirstBlock
