import { useQuery } from '@tanstack/react-query'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import UserService from '../../../services/bff/user.service'

interface VoterAutocompleteProps {
    autoFetch: boolean
    disabled?: boolean
    error?: boolean
    helperText?: string
    onChange: (ids: string[]) => void
}

const VoterAutocomplete: React.FC<VoterAutocompleteProps> = (props) => {
    const { t } = useTranslation(['electionManagement', 'common'])
    const [voterSearch, setVoterSearch] = useState('')

    const queryVoters = useQuery({
        queryKey: ['searchVoters'],
        queryFn: () =>
            UserService.filterUsers({
                name: voterSearch,
                role: 'VOTER',
                isActive: 'true',
                page: '0',
                pageSize: '20'
            }),
        enabled: props.autoFetch
    })

    useEffect(() => {
        const debounceTimeout = setTimeout(() => {
            if (voterSearch.length > 2) {
                queryVoters.refetch()
            }
        }, 500)

        return () => clearTimeout(debounceTimeout)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [voterSearch])

    return (
        <Autocomplete
            multiple
            disableCloseOnSelect
            filterSelectedOptions
            options={queryVoters.data?.data.data || []}
            loading={queryVoters.isFetching}
            getOptionLabel={(option) => `${option.name} - ${option.email}`}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            onChange={(_, value) => props.onChange(value.map((voter) => voter.id))}
            onInputChange={(_, value) => setVoterSearch(value)}
            disabled={props.disabled}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label={t('drawer.voters')}
                    error={!!props.error}
                    helperText={props.helperText || ''}
                />
            )}
            noOptionsText={t('common:autocompleteNoOptions')}
        />
    )
}

export default VoterAutocomplete
