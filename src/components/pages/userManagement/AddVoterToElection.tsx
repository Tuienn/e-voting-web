import { useMutation, useQuery } from '@tanstack/react-query'
import AlertDialog from '../../ui/mui/AlertDialog'
import ElectionService from '../../../services/bff/election.service'
import { useTranslation } from 'react-i18next'
import { useNotify } from '../../../stores/notification/notification.selector'
import { useEffect, useState } from 'react'
import Stack from '@mui/material/Stack'
import Alert from '@mui/material/Alert'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import type { Election } from '../../../types/election'

interface Props {
    open: boolean
    onClose: () => void
    selectedCheckboxIds: string[]
    hasInvalidVisibleSelection: boolean
}

const AddVoterToElection: React.FC<Props> = (props) => {
    const { t } = useTranslation('userManagement')
    const notify = useNotify()
    const [selectedElectionId, setSelectedElectionId] = useState<string>('')
    const [electionSearch, setElectionSearch] = useState('')

    const queryPendingElections = useQuery({
        queryKey: ['filterElections', 'pendingAddVoters'],
        queryFn: () =>
            ElectionService.filterElections({
                name: electionSearch,
                status: 'PENDING',
                page: '0',
                pageSize: '20'
            }),
        enabled: props.open
    })

    const mutateAddVotersToElection = useMutation({
        mutationFn: () => ElectionService.addVotersToElection(selectedElectionId!, props.selectedCheckboxIds),
        onSuccess: () => {
            notify(t('mutate.addToElectionSuccess'), 'success')
            props.onClose()
            setSelectedElectionId('')
            setElectionSearch('')
        },
        onError: (error: Error) => {
            notify(error.message || t('mutate.addToElectionError'), 'error')
        }
    })

    useEffect(() => {
        if (!props.open) {
            return
        }

        //NOTE - Debounce search cho tìm kiếm elections
        const debounceTimeout = setTimeout(() => {
            if (electionSearch.length > 2) {
                queryPendingElections.refetch()
            }
        }, 500)

        return () => clearTimeout(debounceTimeout)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.open, electionSearch])

    return (
        <AlertDialog
            open={props.open}
            onClose={() => props.onClose()}
            onOk={() => mutateAddVotersToElection.mutate()}
            title={t('addToElectionDialog.title')}
            okText={t('addToElectionDialog.confirm')}
            loading={mutateAddVotersToElection.isPending}
            okDisabled={!selectedElectionId || props.selectedCheckboxIds.length === 0}
            minWidth={600}
        >
            <Stack spacing={2}>
                {props.hasInvalidVisibleSelection && (
                    <Alert severity='warning'>{t('addToElectionDialog.invalidSelectionWarning')}</Alert>
                )}
                <Autocomplete
                    options={
                        queryPendingElections.data?.data.data.map((election: Election) => ({
                            id: election.id,
                            name: election.name
                        })) || []
                    }
                    loading={queryPendingElections.isFetching}
                    getOptionLabel={(option) => option.name}
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    onChange={(_, value) => setSelectedElectionId(value?.id || '')}
                    onInputChange={(_, value) => setElectionSearch(value)}
                    renderInput={(params) => (
                        <TextField {...params} label={t('addToElectionDialog.election')} required fullWidth />
                    )}
                />
            </Stack>
        </AlertDialog>
    )
}

export default AddVoterToElection
