import Container from '@mui/material/Container'
import PageHeader from '../../ui/layout/PageHeader'
import { useTranslation } from 'react-i18next'
import ResponsiveButton from '../../ui/mui/ResponsiveButton'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import Tooltip from '@mui/material/Tooltip'
import Filter from '../../ui/common/Filter'
import CustomTable from '../../ui/common/CustomTable'
import { useSearch } from '@tanstack/react-router'
import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query'
import UserService from '../../../services/bff/user.service'
import Chip from '@mui/material/Chip'
import { useNotify } from '../../../stores/notification/notification.selector'
import { useEffect, useState } from 'react'
import Alert from '@mui/material/Alert'
import IconButton from '@mui/material/IconButton'
import EditIcon from '@mui/icons-material/Edit'
import UserDetailDrawer from './UserDetailDrawer'

const UserManagementPage: React.FC = () => {
    const { t } = useTranslation('userManagement')
    const searchParams = useSearch({ from: '/_layout/user-management' })
    const notify = useNotify()
    const [selectedCheckboxIds, setSelectedCheckboxIds] = useState<string[]>([])
    const [userId, setUserId] = useState<string | null | undefined>(undefined)

    const queryFilterUsers = useQuery({
        queryKey: ['filterUsers', searchParams],
        queryFn: () => UserService.filterUsers(searchParams),
        placeholderData: keepPreviousData
    })

    useEffect(() => {
        if (queryFilterUsers.isError) {
            const message = queryFilterUsers.error ? queryFilterUsers.error.message : t('query.fetchUsersError')

            notify(message, 'error')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [queryFilterUsers.isError])

    const mutateDisableUser = useMutation({
        mutationFn: (id: string) => UserService.disableUserById(id),
        onSuccess: () => {
            notify(t('mutate.disableUserSuccess'), 'success')
            queryFilterUsers.refetch()
        },
        onError: (error: any) => {
            notify(error.message || t('mutate.disableUserError'), 'error')
        }
    })

    const mutateEnableUser = useMutation({
        mutationFn: (id: string) => UserService.enableUserById(id),
        onSuccess: () => {
            notify(t('mutate.enableUserSuccess'), 'success')
            queryFilterUsers.refetch()
        },
        onError: (error: any) => {
            notify(error.message || t('mutate.enableUserError'), 'error')
        }
    })

    return (
        <Container
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 1
            }}
        >
            <PageHeader
                title={t('title')}
                actions={[
                    <Tooltip title={t('headerActions.addUser')}>
                        <ResponsiveButton
                            icon={<PersonAddIcon />}
                            color='primary'
                            variant='outlined'
                            onClick={() => setUserId(null)}
                        >
                            {t('headerActions.addUser')}
                        </ResponsiveButton>
                    </Tooltip>,
                    <Tooltip title={t('headerActions.importExcelTooltip')}>
                        <ResponsiveButton icon={<CloudUploadIcon />}>{t('headerActions.importExcel')}</ResponsiveButton>
                    </Tooltip>
                ]}
            />

            <Filter
                searchFullPath={'/_layout/user-management'}
                navigateFullPath={'/user-management'}
                items={[
                    {
                        label: t('filter.email'),
                        type: 'input',
                        name: 'email'
                    },
                    {
                        label: t('filter.name'),
                        type: 'input',
                        name: 'name'
                    },
                    {
                        label: t('filter.role'),
                        type: 'select',
                        name: 'role',
                        setting: {
                            select: {
                                options: [
                                    { label: t('filter.roleOptions.admin'), value: 'ADMIN' },
                                    { label: t('filter.roleOptions.voter'), value: 'VOTER' },
                                    { label: t('filter.roleOptions.candidate'), value: 'CANDIDATE' }
                                ]
                            }
                        }
                    },
                    {
                        label: t('filter.status'),
                        type: 'select',
                        name: 'isActive',
                        setting: {
                            select: {
                                options: [
                                    { label: t('filter.statusOptions.active'), value: 'true' },
                                    { label: t('filter.statusOptions.inactive'), value: 'false' }
                                ]
                            }
                        }
                    }
                ]}
            />

            {selectedCheckboxIds.length > 0 && (
                <Alert severity='info' sx={{ borderRadius: 0 }}>
                    {t('table.selectedUsers', { count: selectedCheckboxIds.length })}
                </Alert>
            )}
            <CustomTable
                isLoading={queryFilterUsers.isLoading}
                checkbox={{
                    name: 'id',
                    selectedCheckboxIds,
                    onSetSelectedCheckboxIds: setSelectedCheckboxIds
                }}
                searchFullPath={'/_layout/user-management'}
                navigateFullPath={'/user-management'}
                items={[
                    {
                        header: t('table.email'),
                        name: 'email'
                    },
                    {
                        header: t('table.name'),
                        name: 'name',
                        sx: {
                            maxWidth: 200,
                            textOverflow: 'ellipsis',
                            overflow: 'hidden',
                            whiteSpace: 'nowrap'
                        },
                        render: (item) => <Tooltip title={item.name}>{item.name}</Tooltip>
                    },
                    {
                        header: t('table.role'),
                        name: 'role',
                        render: (item) => {
                            if (item.role === 'ADMIN')
                                return <Chip label={t('filter.roleOptions.admin')} color='primary' />
                            if (item.role === 'VOTER')
                                return <Chip label={t('filter.roleOptions.voter')} color='secondary' />
                            if (item.role === 'CANDIDATE')
                                return <Chip label={t('filter.roleOptions.candidate')} color='info' />
                            return <Chip label={item.role} />
                        }
                    },
                    {
                        header: t('table.status'),
                        name: 'isActive',
                        render: (item) =>
                            item.isActive ? (
                                <Tooltip title={t('table.chip.disable')}>
                                    <Chip
                                        label={t('filter.statusOptions.active')}
                                        color='success'
                                        clickable
                                        onClick={() => mutateDisableUser.mutate(item.id)}
                                    />
                                </Tooltip>
                            ) : (
                                <Tooltip title={t('table.chip.enable')}>
                                    <Chip
                                        label={t('filter.statusOptions.inactive')}
                                        color='error'
                                        clickable
                                        onClick={() => mutateEnableUser.mutate(item.id)}
                                    />
                                </Tooltip>
                            )
                    },
                    {
                        header: t('table.actions'),
                        name: 'actions',
                        sx: {
                            position: 'sticky',
                            right: 0,
                            borderLeft: '0.5px solid',
                            backgroundColor: 'background.paper'
                        },
                        align: 'center',
                        render: (item) => (
                            <IconButton onClick={() => setUserId(item.id)}>
                                <EditIcon />
                            </IconButton>
                        )
                    }
                ]}
                data={queryFilterUsers.data?.data.data || []}
            />

            <UserDetailDrawer userId={userId} onSetUserId={setUserId} />
        </Container>
    )
}

export default UserManagementPage
