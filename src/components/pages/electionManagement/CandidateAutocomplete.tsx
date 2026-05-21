import { useQuery } from '@tanstack/react-query'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import UserService from '../../../services/bff/user.service'

interface CandidateAutocompleteProps {
    autoFetch: boolean
    error?: boolean
    helperText?: string
    onChange: (ids: string[]) => void
}

const CandidateAutocomplete: React.FC<CandidateAutocompleteProps> = (props) => {
    const { t } = useTranslation(['electionManagement', 'common'])
    const [candidateSearch, setCandidateSearch] = useState('')

    const queryCandidates = useQuery({
        queryKey: ['searchCandidates'],
        queryFn: () =>
            UserService.filterUsers({
                name: candidateSearch,
                role: 'CANDIDATE',
                isActive: 'true',
                page: '0',
                pageSize: '20'
            }),
        enabled: props.autoFetch
    })

    useEffect(() => {
        const debounceTimeout = setTimeout(() => {
            if (candidateSearch.length > 2) {
                queryCandidates.refetch()
            }
        }, 500)

        return () => clearTimeout(debounceTimeout)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [candidateSearch])

    return (
        <Autocomplete
            multiple
            disableCloseOnSelect
            filterSelectedOptions
            options={queryCandidates.data?.data.data || []}
            loading={queryCandidates.isFetching}
            getOptionLabel={(option) => `${option.name} - ${option.email}`}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            onChange={(_, value) => props.onChange(value.map((candidate) => candidate.id))}
            onInputChange={(_, value) => setCandidateSearch(value)}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label={t('drawer.candidates')}
                    error={!!props.error}
                    helperText={props.helperText || ''}
                />
            )}
            noOptionsText={t('common:autocompleteNoOptions')}
        />
    )
}

export default CandidateAutocomplete
