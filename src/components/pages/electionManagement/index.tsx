import AddIcon from '@mui/icons-material/Add'
import Chip from '@mui/material/Chip'
import Container from '@mui/material/Container'
import Tooltip from '@mui/material/Tooltip'
import type { ChipProps } from '@mui/material/Chip'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { useSearch } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import ElectionService from '../../../services/bff/election.service'
import { useNotify } from '../../../stores/notification/notification.selector'
import type { Election, ElectionStatus } from '../../../types/election'
import Filter from '../../ui/common/Filter'
import CustomTable from '../../ui/common/CustomTable'
import PageHeader from '../../ui/layout/PageHeader'
import ResponsiveButton from '../../ui/mui/ResponsiveButton'
import CreateElectionDrawer from './CreateElectionDrawer'

const STATUS_COLOR_CHIP: Record<ElectionStatus, ChipProps['color']> = {
    PENDING: 'warning',
    ACTIVE: 'success',
    CLOSED: 'info',
    COMPLETED: 'default'
}

const ElectionManagementPage: React.FC = () => {
    const { t, i18n } = useTranslation('electionManagement')
    const searchParams = useSearch({ from: '/_layout/election-management' })
    const notify = useNotify()
    const [isCreateDrawerOpen, setIsCreateDrawerOpen] = useState(false)

    const STATUS_LABEL_CHIP: Record<ElectionStatus, string> = {
        PENDING: t('status.pending'),
        ACTIVE: t('status.active'),
        CLOSED: t('status.closed'),
        COMPLETED: t('status.completed')
    }

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

    const formatDateTime = (value?: string | null) => {
        if (!value) return '-'

        const date = new Date(value)
        if (Number.isNaN(date.getTime())) return '-'

        return new Intl.DateTimeFormat(i18n.language, {
            dateStyle: 'medium',
            timeStyle: 'short'
        }).format(date)
    }

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
                    <Tooltip title={t('headerActions.createElection')}>
                        <ResponsiveButton icon={<AddIcon />} onClick={() => setIsCreateDrawerOpen(true)}>
                            {t('headerActions.createElection')}
                        </ResponsiveButton>
                    </Tooltip>
                ]}
            />

            <Filter
                searchFullPath={'/_layout/election-management'}
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
                                    { label: t('status.pending'), value: 'PENDING' },
                                    { label: t('status.active'), value: 'ACTIVE' },
                                    { label: t('status.closed'), value: 'CLOSED' },
                                    { label: t('status.completed'), value: 'COMPLETED' }
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
                searchFullPath={'/_layout/election-management'}
                navigateFullPath={'/election-management'}
                items={[
                    {
                        header: t('table.name'),
                        name: 'name',
                        sx: {
                            maxWidth: 280,
                            textOverflow: 'ellipsis',
                            overflow: 'hidden',
                            whiteSpace: 'nowrap'
                        },
                        render: (item: Election) => (
                            <Tooltip title={item.name}>
                                <span>{item.name}</span>
                            </Tooltip>
                        )
                    },
                    {
                        header: t('table.status'),
                        name: 'status',
                        render: (item: Election) => (
                            <Chip label={STATUS_LABEL_CHIP[item.status]} color={STATUS_COLOR_CHIP[item.status]} />
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
