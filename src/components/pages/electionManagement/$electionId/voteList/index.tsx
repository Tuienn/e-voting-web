import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { useSearch } from '@tanstack/react-router'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import Stack from '@mui/material/Stack'
import ElectionService from '../../../../../services/bff/election.service'
import { useNotify } from '../../../../../stores/notification/notification.selector'
import type { Vote } from '../../../../../types/election'
import { formatDateTime } from '../../../../../lib/utils'
import Filter from '../../../../ui/mui/Filter'
import CustomTable from '../../../../ui/mui/CustomTable'
import CustomTablePagination from '../../../../ui/mui/CustomTablePagination'
import LongText from '../../../../ui/mui/LongText'
import Alert from '@mui/material/Alert'

interface Props {
    electionId: string
}

const VoteListPage: React.FC<Props> = (props) => {
    const { t } = useTranslation('$electionId')
    const notify = useNotify()
    const searchParams = useSearch({ from: '/_layout/election-management/$electionId' })

    const queryFilterVotes = useQuery({
        queryKey: ['filterVotes', props.electionId, searchParams],
        queryFn: () => ElectionService.filterVotesByElectionId(props.electionId, searchParams),
        placeholderData: keepPreviousData
    })

    useEffect(() => {
        if (queryFilterVotes.isError) {
            const message = queryFilterVotes.error ? queryFilterVotes.error.message : t('voteList.error.loadFailed')

            notify(message, 'error')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [queryFilterVotes.isError])

    return (
        <Stack spacing={1} mt={2}>
            <Alert
                severity={
                    (queryFilterVotes.data?.data.total || 0) === (queryFilterVotes.data?.data.totalVoters || 0)
                        ? 'success'
                        : 'warning'
                }
            >
                {t('voteList.alert', {
                    voteCount: queryFilterVotes.data?.data.total || 0,
                    voterCount: queryFilterVotes.data?.data.totalVoters || 0
                })}
            </Alert>
            <Filter
                searchFullPath={'/_layout/election-management/$electionId'}
                navigateFullPath={'/election-management/$electionId'}
                preserveSearchKeys={['tab']}
                items={[
                    {
                        label: t('voteList.filter.voterEmail'),
                        type: 'input',
                        name: 'voterEmail'
                    },
                    {
                        label: t('voteList.filter.startDate'),
                        type: 'datetime',
                        name: 'startDate'
                    },
                    {
                        label: t('voteList.filter.endDate'),
                        type: 'datetime',
                        name: 'endDate'
                    }
                ]}
            />

            <CustomTable
                isLoading={queryFilterVotes.isLoading}
                pagination={
                    <CustomTablePagination
                        count={queryFilterVotes.data?.data.total || 0}
                        searchFullPath={'/_layout/election-management/$electionId'}
                        navigateFullPath={'/election-management/$electionId'}
                    />
                }
                items={[
                    {
                        header: t('voteList.table.voterEmail'),
                        name: 'voterEmail',
                        render: (item: Vote) => <LongText value={item.voter?.email} />
                    },
                    {
                        header: t('voteList.table.voterName'),
                        name: 'voterName',
                        render: (item: Vote) => <LongText value={item.voter?.name} />
                    },
                    {
                        header: t('voteList.table.blindedCommitment'),
                        name: 'blindedCommitment',
                        render: (item: Vote) => <LongText value={item.blindedCommitment} />
                    },
                    {
                        header: t('voteList.table.blockchainRef'),
                        name: 'blockchainRef',
                        render: (item: Vote) => <LongText value={item.blockchainRef} />
                    },
                    {
                        header: t('voteList.table.createdAt'),
                        name: 'createdAt',
                        render: (item: Vote) => formatDateTime(item.createdAt),
                        sx: {
                            wordBreak: 'keep-all',
                            whiteSpace: 'nowrap'
                        }
                    }
                ]}
                data={queryFilterVotes.data?.data.data || []}
            />
        </Stack>
    )
}

export default VoteListPage
