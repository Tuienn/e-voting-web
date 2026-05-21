import AddIcon from '@mui/icons-material/Add'
import Chip from '@mui/material/Chip'
import Container from '@mui/material/Container'
import Tooltip from '@mui/material/Tooltip'
import type { ChipProps } from '@mui/material/Chip'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { Link, useSearch } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import ElectionService from '../../../services/bff/election.service'
import { useNotify } from '../../../stores/notification/notification.selector'
import type { Election, ElectionStatus } from '../../../types/election'
import Filter from '../../ui/mui/Filter'
import CustomTable from '../../ui/mui/CustomTable'
import CustomHeader from '../../ui/layout/PageHeader'
import ResponsiveButton from '../../ui/mui/ResponsiveButton'
import CreateElectionDrawer from './CreateElectionDrawer'
import { formatDateTime } from '../../../lib/utils'
import CustomTablePagination from '../../ui/mui/CustomTablePagination'
import LongText from '../../ui/mui/LongText'

const STATUS_COLOR_CHIP: Record<ElectionStatus, ChipProps['color']> = {
    PENDING: 'warning',
    ACTIVE: 'success',
    CLOSED: 'info',
    COMPLETED: 'default'
}

const ElectionManagementPage: React.FC = () => {
    const { t } = useTranslation(['electionManagement', 'common'])
    const searchParams = useSearch({ from: '/_layout/election-management/' })
    const notify = useNotify()
    const [isCreateDrawerOpen, setIsCreateDrawerOpen] = useState(false)

    const queryFilterElections = useQuery({
        queryKey: ['filterElections', searchParams],
        queryFn: () => ElectionService.filterElections(searchParams),
        placeholderData: keepPreviousData
    })

    useEffect(() => {
        if (queryFilterElections.isError) {
            notify(queryFilterElections.error.message || t('query.fetchElectionsError'), 'error')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [queryFilterElections.isError])

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
                    <Tooltip title={t('headerActions.createElection')}>
                        <ResponsiveButton icon={<AddIcon />} onClick={() => setIsCreateDrawerOpen(true)}>
                            {t('headerActions.createElection')}
                        </ResponsiveButton>
                    </Tooltip>
                ]}
                isPageHeader
            />

            <Filter
                searchFullPath={'/_layout/election-management/'}
                navigateFullPath={'/election-management'}
                items={[
                    {
                        label: t('filter.name'),
                        type: 'input',
                        name: 'name'
                    },
                    {
                        label: t('filter.status'),
                        type: 'select',
                        name: 'status',
                        setting: {
                            select: {
                                options: [
                                    { label: t('common:electionStatus.PENDING'), value: 'PENDING' },
                                    { label: t('common:electionStatus.ACTIVE'), value: 'ACTIVE' },
                                    { label: t('common:electionStatus.CLOSED'), value: 'CLOSED' },
                                    { label: t('common:electionStatus.COMPLETED'), value: 'COMPLETED' }
                                ]
                            }
                        }
                    },
                    {
                        label: t('filter.startDate'),
                        type: 'datetime',
                        name: 'startDate'
                    },
                    {
                        label: t('filter.endDate'),
                        type: 'datetime',
                        name: 'endDate'
                    }
                ]}
            />

            <CustomTable
                isLoading={queryFilterElections.isLoading}
                pagination={
                    <CustomTablePagination
                        count={queryFilterElections.data?.data.total || 0}
                        searchFullPath={'/_layout/election-management/'}
                        navigateFullPath={'/election-management'}
                    />
                }
                items={[
                    {
                        header: t('table.name'),
                        name: 'name',

                        render: (item: Election) => (
                            <Link
                                to={`/election-management/$electionId`}
                                params={{ electionId: item.id }}
                                search={{
                                    tab: 0
                                }}
                            >
                                <LongText value={item.name} />
                            </Link>
                        )
                    },
                    {
                        header: t('table.status'),
                        name: 'status',
                        render: (item: Election) => (
                            <Chip
                                label={t(`common:electionStatus.${item.status}`)}
                                color={STATUS_COLOR_CHIP[item.status]}
                            />
                        )
                    },
                    {
                        header: t('table.startDate'),
                        name: 'startDate',
                        render: (item: Election) => formatDateTime(item.startDate)
                    },
                    {
                        header: t('table.endDate'),
                        name: 'endDate',
                        render: (item: Election) => formatDateTime(item.endDate)
                    }
                ]}
                data={queryFilterElections.data?.data.data || []}
            />

            <CreateElectionDrawer open={isCreateDrawerOpen} onClose={() => setIsCreateDrawerOpen(false)} />
        </Container>
    )
}

export default ElectionManagementPage
