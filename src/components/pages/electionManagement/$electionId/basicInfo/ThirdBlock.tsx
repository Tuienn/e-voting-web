import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import AddIcon from '@mui/icons-material/Add'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Paper from '@mui/material/Paper'
import ElectionService from '../../../../../services/bff/election.service'
import { useNotify } from '../../../../../stores/notification/notification.selector'
import type { ElectionAllInfo } from '../../../../../types/election'
import CustomTable from '../../../../ui/mui/CustomTable'
import CustomHeader from '../../../../ui/layout/PageHeader'
import AlertDialog from '../../../../ui/mui/AlertDialog'
import ResponsiveButton from '../../../../ui/mui/ResponsiveButton'
import UserRoleAutocomplete from '../../UserRoleAutocomplete'

interface Props {
    electionId: string
    data: ElectionAllInfo | undefined
}

const ThirdBlock: React.FC<Props> = (props) => {
    const { t } = useTranslation('$electionId')
    const notify = useNotify()
    const [selectedVoterIds, setSelectedVoterIds] = useState<string[]>([])
    const [addVoterOpen, setAddVoterOpen] = useState(false)
    const [newVoterIds, setNewVoterIds] = useState<string[]>([])
    const queryClient = useQueryClient()

    const mutateAddVoters = useMutation({
        mutationFn: (voterIds: string[]) => ElectionService.addVotersToElection(props.electionId, voterIds),
        onSuccess: () => {
            notify(t('basicInfo.success.votersAdded'), 'success')
            handleCloseAddVoter()
            queryClient.invalidateQueries({ queryKey: ['electionAllInfo', props.electionId] })
        },
        onError: (error: Error) => notify(error.message || t('basicInfo.error.votersFailed'), 'error')
    })

    const mutateDeleteVoters = useMutation({
        mutationFn: (voterIds: string[]) => ElectionService.deleteVotersFromElection(props.electionId, voterIds),
        onSuccess: () => {
            notify(t('basicInfo.success.votersDeleted'), 'success')
            setSelectedVoterIds([])
            queryClient.invalidateQueries({ queryKey: ['electionAllInfo', props.electionId] })
        },
        onError: (error: Error) => notify(error.message || t('basicInfo.error.votersFailed'), 'error')
    })

    const handleCloseAddVoter = () => {
        setAddVoterOpen(false)
        setNewVoterIds([])
    }

    const voters = props.data?.voters
    if (!voters) return null

    return (
        <Paper sx={{ p: 3 }} elevation={3}>
            <CustomHeader
                title={t('basicInfo.votersTitle')}
                actions={[
                    <ResponsiveButton icon={<AddIcon />} onClick={() => setAddVoterOpen(true)}>
                        {t('basicInfo.actions.addVoter')}
                    </ResponsiveButton>
                ]}
            />
            <Divider sx={{ my: 1.5 }} />
            {selectedVoterIds.length > 0 && (
                <Alert
                    severity='warning'
                    action={
                        <Button
                            color='inherit'
                            loading={mutateDeleteVoters.isPending}
                            onClick={() => mutateDeleteVoters.mutate(selectedVoterIds)}
                        >
                            {t('basicInfo.actions.deleteSelected')}
                        </Button>
                    }
                >
                    <AlertTitle>{t('basicInfo.table.selectedVoters', { count: selectedVoterIds.length })}</AlertTitle>
                </Alert>
            )}
            <CustomTable
                items={[
                    { header: t('basicInfo.table.email'), name: 'email' },
                    { header: t('basicInfo.table.name'), name: 'name' }
                ]}
                data={voters}
                checkbox={{
                    name: 'id',
                    selectedCheckboxIds: selectedVoterIds,
                    onSetSelectedCheckboxIds: setSelectedVoterIds
                }}
            />
            <AlertDialog
                open={addVoterOpen}
                title={t('basicInfo.actions.addVoterDialogTitle')}
                onClose={handleCloseAddVoter}
                onOk={() => mutateAddVoters.mutate(newVoterIds)}
                loading={mutateAddVoters.isPending}
                okDisabled={newVoterIds.length === 0}
                minWidth={600}
            >
                <UserRoleAutocomplete
                    autoFetch={addVoterOpen}
                    onChange={setNewVoterIds}
                    role='VOTER'
                    skips={props.data?.voters?.map((v) => v.id)}
                />
            </AlertDialog>
        </Paper>
    )
}

export default ThirdBlock
