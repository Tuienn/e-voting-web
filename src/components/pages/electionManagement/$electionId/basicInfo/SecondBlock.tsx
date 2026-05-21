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

const SecondBlock: React.FC<Props> = (props) => {
    const { t } = useTranslation('$electionId')
    const notify = useNotify()
    const [selectedCandidateIds, setSelectedCandidateIds] = useState<string[]>([])
    const [addCandidateOpen, setAddCandidateOpen] = useState(false)
    const [newCandidateIds, setNewCandidateIds] = useState<string[]>([])
    const queryClient = useQueryClient()

    const mutateAddCandidates = useMutation({
        mutationFn: (candidateIds: string[]) => ElectionService.addCandidatesToElection(props.electionId, candidateIds),
        onSuccess: () => {
            notify(t('basicInfo.success.candidatesAdded'), 'success')
            handleCloseAddCandidate()
            queryClient.invalidateQueries({ queryKey: ['electionAllInfo', props.electionId] })
        },
        onError: (error: Error) => notify(error.message || t('basicInfo.error.candidatesFailed'), 'error')
    })

    const mutateDeleteCandidates = useMutation({
        mutationFn: (candidateIds: string[]) =>
            ElectionService.deleteCandidatesFromElection(props.electionId, candidateIds),
        onSuccess: () => {
            notify(t('basicInfo.success.candidatesDeleted'), 'success')
            setSelectedCandidateIds([])
            queryClient.invalidateQueries({ queryKey: ['electionAllInfo', props.electionId] })
        },
        onError: (error: Error) => notify(error.message || t('basicInfo.error.candidatesFailed'), 'error')
    })

    const handleCloseAddCandidate = () => {
        setAddCandidateOpen(false)
        setNewCandidateIds([])
    }

    const candidates = props.data?.candidates
    if (!candidates) return null

    return (
        <Paper sx={{ p: 3 }} elevation={3}>
            <CustomHeader
                title={t('basicInfo.candidatesTitle')}
                actions={[
                    <ResponsiveButton icon={<AddIcon />} onClick={() => setAddCandidateOpen(true)}>
                        {t('basicInfo.actions.addCandidate')}
                    </ResponsiveButton>
                ]}
            />
            <Divider sx={{ my: 1.5 }} />
            {selectedCandidateIds.length > 0 && (
                <Alert
                    severity='warning'
                    action={
                        <Button
                            color='inherit'
                            loading={mutateDeleteCandidates.isPending}
                            onClick={() => mutateDeleteCandidates.mutate(selectedCandidateIds)}
                        >
                            {t('basicInfo.actions.deleteSelected')}
                        </Button>
                    }
                >
                    <AlertTitle>
                        {t('basicInfo.table.selectedCandidates', { count: selectedCandidateIds.length })}
                    </AlertTitle>
                </Alert>
            )}
            <CustomTable
                items={[
                    { header: t('basicInfo.table.email'), name: 'email' },
                    { header: t('basicInfo.table.name'), name: 'name' }
                ]}
                data={candidates}
                checkbox={{
                    name: 'id',
                    selectedCheckboxIds: selectedCandidateIds,
                    onSetSelectedCheckboxIds: setSelectedCandidateIds
                }}
            />
            <AlertDialog
                open={addCandidateOpen}
                title={t('basicInfo.actions.addCandidateDialogTitle')}
                onClose={handleCloseAddCandidate}
                onOk={() => mutateAddCandidates.mutate(newCandidateIds)}
                loading={mutateAddCandidates.isPending}
                minWidth={600}
                okDisabled={newCandidateIds.length === 0}
            >
                <UserRoleAutocomplete
                    autoFetch={addCandidateOpen}
                    onChange={setNewCandidateIds}
                    role='CANDIDATE'
                    skips={props.data?.candidates?.map((c) => c.id)}
                />
            </AlertDialog>
        </Paper>
    )
}

export default SecondBlock
