import Container from '@mui/material/Container'
import CustomHeader from '../../ui/layout/PageHeader'
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
import Chip, { type ChipProps } from '@mui/material/Chip'
import { useNotify } from '../../../stores/notification/notification.selector'
import { useEffect, useState } from 'react'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import UserDetailDrawer from './UserDetailDrawer'
import AlertTitle from '@mui/material/AlertTitle'
import AddVoterToElection from './AddVoterToElection'
import type { User, UserRole } from '../../../types/user'
import Link from '@mui/material/Link'
import CustomTablePagination from '../../ui/common/CustomTablePagination'

const ROLE_COLOR_CHIP: Record<UserRole, ChipProps['color']> = {
    ADMIN: 'primary',
    CANDIDATE: 'default',
    VOTER: 'secondary'
}

const UserManagementPage: React.FC = () => {
    const { t } = useTranslation('userManagement')
    const searchParams = useSearch({ from: '/_layout/user-management' })
    const notify = useNotify()
    const [selectedCheckboxIds, setSelectedCheckboxIds] = useState<string[]>([])
    const [userId, setUserId] = useState<string | null | undefined>(undefined)
    const [isAddToElectionDialogOpen, setIsAddToElectionDialogOpen] = useState(false)

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

    const hasInvalidVisibleSelection = (queryFilterUsers.data?.data.data || []).some(
        (user) => selectedCheckboxIds.includes(user.id) && (user.role !== 'VOTER' || !user.isActive)
    )

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
            <CustomHeader
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
                isPageHeader
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
                                    { label: t('filter.roleOptions.ADMIN'), value: 'ADMIN' },
                                    { label: t('filter.roleOptions.VOTER'), value: 'VOTER' },
                                    { label: t('filter.roleOptions.CANDIDATE'), value: 'CANDIDATE' }
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
                <Alert
                    severity={hasInvalidVisibleSelection ? 'warning' : 'info'}
                    action={
                        <Button color='inherit' onClick={() => setIsAddToElectionDialogOpen(true)} sx={{ my: 'auto' }}>
                            {t('table.addToElection')}
                        </Button>
                    }
                >
                    <AlertTitle>{t('table.selectedUsers', { count: selectedCheckboxIds.length })}</AlertTitle>
                    {hasInvalidVisibleSelection && <span>{t('table.selectedUsersInvalidWarning')}</span>}
                </Alert>
            )}
            <CustomTable
                isLoading={queryFilterUsers.isLoading}
                checkbox={{
                    name: 'id',
                    selectedCheckboxIds,
                    onSetSelectedCheckboxIds: setSelectedCheckboxIds
                }}
                pagination={
                    <CustomTablePagination
                        count={queryFilterUsers.data?.data.total || 0}
                        searchFullPath={'/_layout/user-management'}
                        navigateFullPath={'/user-management'}
                    />
                }
                items={[
                    {
                        header: t('table.email'),
                        name: 'email',
                        render: (item) => (
                            <Link
                                sx={{
                                    cursor: 'pointer'
                                }}
                                onClick={() => setUserId(item.id)}
                            >
                                {item.email}
                            </Link>
                        )
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
                        render: (item: User) => (
                            <Chip label={t(`filter.roleOptions.${item.role}`)} color={ROLE_COLOR_CHIP[item.role]} />
                        )
                    },
                    {
                        header: t('table.status'),
                        name: 'isActive',
                        render: (item: User) =>
                            item.isActive ? (
                                <Tooltip title={t('table.chip.disable')}>
                                    <Chip
                                        label={t('filter.statusOptions.active')}
                                        color='success'
                                        clickable
                                        onClick={() => mutateDisableUser.mutate(item.id)}
                                        disabled={item.role === 'ADMIN'} // Không cho phép disable admin
                                    />
                                </Tooltip>
                            ) : (
                                <Tooltip title={t('table.chip.enable')}>
                                    <Chip
                                        label={t('filter.statusOptions.inactive')}
                                        color='error'
                                        clickable
                                        onClick={() => mutateEnableUser.mutate(item.id)}
                                        disabled={item.role === 'ADMIN'} // Không cho phép enable admin
                                    />
                                </Tooltip>
                            )
                    }
                ]}
                data={queryFilterUsers.data?.data.data || []}
            />

            <UserDetailDrawer userId={userId} onSetUserId={setUserId} />
            <AddVoterToElection
                open={isAddToElectionDialogOpen}
                onClose={() => {
                    setIsAddToElectionDialogOpen(false)
                    setSelectedCheckboxIds([])
                }}
                selectedCheckboxIds={selectedCheckboxIds}
                hasInvalidVisibleSelection={hasInvalidVisibleSelection}
            />
        </Container>
    )
}

export default UserManagementPage
