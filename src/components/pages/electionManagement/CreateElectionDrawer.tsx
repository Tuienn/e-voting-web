import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import AddIcon from '@mui/icons-material/Add'
import ReplayIcon from '@mui/icons-material/Replay'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import { Controller, useForm } from 'react-hook-form'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { z } from 'zod'
import CustomDrawer from '../../ui/mui/CustomDrawer'
import ElectionService from '../../../services/bff/election.service'
import { useNotify } from '../../../stores/notification/notification.selector'
import CandidateAutocomplete from './CandidateAutocomplete'
import VoterAutocomplete from './VoterAutocomplete'

interface Props {
    open: boolean
    onClose: () => void
}

const FORM_ID = 'create-election-form'

const CreateElectionDrawer: React.FC<Props> = (props) => {
    const { t } = useTranslation('electionManagement')
    const notify = useNotify()
    const queryClient = useQueryClient()

    const formSchema = useMemo(
        () =>
            z.object({
                name: z.string().trim().min(3, t('drawer.validation.nameMinLength')).max(100),
                candidateIds: z.array(z.string()).min(2, t('drawer.validation.candidatesRequired')),
                voterIds: z.array(z.string()).min(3, t('drawer.validation.votersRequired'))
            }),
        [t]
    )

    type CreateElectionFormData = z.infer<typeof formSchema>

    const form = useForm<CreateElectionFormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            candidateIds: [],
            voterIds: []
        }
    })

    const resetForm = () => {
        form.reset()
    }

    const mutateAddVotersToElection = useMutation({
        mutationFn: (electionId: string) => ElectionService.addVotersToElection(electionId, form.getValues('voterIds')),
        onSuccess: () => {
            notify(t('mutate.addToElectionSuccess'), 'success')
            queryClient.invalidateQueries({ queryKey: ['filterElections'] })
            resetForm()
            props.onClose()
        },
        onError: (error: Error) => {
            notify(error.message || t('mutate.addToElectionError'), 'error')
        }
    })

    const mutateCreateElection = useMutation({
        mutationFn: async (data: CreateElectionFormData) =>
            ElectionService.createElection({
                name: data.name.trim(),
                candidateIds: data.candidateIds
            }),
        onSuccess: (data) => {
            notify(t('mutate.createElectionSuccess'), 'success')
            queryClient.invalidateQueries({ queryKey: ['filterElections'] })
            mutateAddVotersToElection.mutate(data.data.id)
        },
        onError: (error: Error) => {
            notify(error.message || t('mutate.createElectionError'), 'error')
        }
    })

    const handleSubmit = (data: CreateElectionFormData) => {
        mutateCreateElection.mutate(data)
    }

    return (
        <CustomDrawer
            title={t('drawer.title')}
            open={props.open}
            onClose={() => {
                resetForm()
                props.onClose()
            }}
            footer={
                <Stack direction='row' spacing={1} justifyContent='flex-end'>
                    <Button
                        variant='outlined'
                        color='error'
                        onClick={resetForm}
                        disabled={mutateCreateElection.isPending}
                        startIcon={<ReplayIcon />}
                    >
                        {t('drawer.reset')}
                    </Button>
                    <Button
                        type='submit'
                        form={FORM_ID}
                        variant='contained'
                        loading={mutateCreateElection.isPending}
                        startIcon={<AddIcon />}
                    >
                        {t('drawer.create')}
                    </Button>
                </Stack>
            }
        >
            <Stack id={FORM_ID} component='form' spacing={2} pt={1} pb={6} onSubmit={form.handleSubmit(handleSubmit)}>
                <Controller
                    name='name'
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <TextField
                            {...field}
                            label={t('drawer.name')}
                            error={!!fieldState.error}
                            helperText={fieldState.error?.message || ''}
                            fullWidth
                            autoFocus
                            required
                        />
                    )}
                />

                <Controller
                    name='candidateIds'
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <CandidateAutocomplete
                            autoFetch={props.open}
                            onChange={field.onChange}
                            error={!!fieldState.error}
                            helperText={fieldState.error?.message || ''}
                        />
                    )}
                />

                <Controller
                    name='voterIds'
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <VoterAutocomplete
                            autoFetch={props.open}
                            onChange={field.onChange}
                            error={!!fieldState.error}
                            helperText={fieldState.error?.message || ''}
                        />
                    )}
                />
            </Stack>
        </CustomDrawer>
    )
}

export default CreateElectionDrawer
