import { useQuery } from '@tanstack/react-query'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import UserService from '../../../services/bff/user.service'
import type { CreateUserRole } from '../../../types/user'

interface UserRoleAutocompleteProps {
    autoFetch: boolean
    error?: boolean
    helperText?: string
    onChange: (ids: string[]) => void
    role: CreateUserRole
    skips?: string[]
}

const UserRoleAutocomplete: React.FC<UserRoleAutocompleteProps> = (props) => {
    const { t } = useTranslation(['electionManagement', 'common'])
    const [search, setSearch] = useState('')

    const queryUsers = useQuery({
        queryKey: ['searchElectionUsers', props.role],
        queryFn: () =>
            UserService.filterUsers({
                name: search,
                role: props.role,
                isActive: 'true',
                page: '0',
                pageSize: '20'
            }),
        enabled: props.autoFetch
    })

    useEffect(() => {
        const debounceTimeout = setTimeout(() => {
            if (search.length > 2) {
                queryUsers.refetch()
            }
        }, 500)

        return () => clearTimeout(debounceTimeout)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search])

    const label = props.role === 'CANDIDATE' ? t('drawer.candidates') : t('drawer.voters')

    return (
        <Autocomplete
            multiple
            disableCloseOnSelect
            filterSelectedOptions
            options={queryUsers.data?.data.data.filter((user) => !props.skips?.includes(user.id)) || []}
            loading={queryUsers.isFetching}
            getOptionLabel={(option) => `${option.name} - ${option.email}`}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            onChange={(_, value) => props.onChange(value.map((user) => user.id))}
            onInputChange={(_, value) => setSearch(value)}
            renderInput={(params) => (
                <TextField {...params} label={label} error={!!props.error} helperText={props.helperText || ''} />
            )}
            noOptionsText={t('common:autocompleteNoOptions')}
        />
    )
}

export default UserRoleAutocomplete
