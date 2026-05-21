import { useNavigate, useParams, useSearch } from '@tanstack/react-router'
import Tab from '@mui/material/Tab'
import Container from '@mui/material/Container'
import Tabs from '@mui/material/Tabs'
import TabPanel, { a11yProps } from '../../../ui/mui/TabPanel'
import { useTranslation } from 'react-i18next'
import BasicInfoElectionDetail from './basicInfo'
import CustomHeader from '../../../ui/layout/PageHeader'
import AppBar from '@mui/material/AppBar'
import VoteListPage from './voteList'

const ElectionDetailPage: React.FC = () => {
    const { electionId } = useParams({ from: '/_layout/election-management/$electionId' })
    const searchParams = useSearch({ from: '/_layout/election-management/$electionId' })
    const navigate = useNavigate({ from: '/election-management/$electionId' })

    const { t } = useTranslation('$electionId')

    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
        navigate({
            search: {
                ...searchParams,
                tab: newValue
            } as any,
            replace: true
        })
    }

    return (
        <>
            <AppBar position='sticky' sx={{ backgroundColor: 'background.paper' }}>
                <Container>
                    <CustomHeader title={t('title')} hasBackButton isPageHeader />
                </Container>
            </AppBar>
            <Container sx={{ my: 2 }}>
                <Tabs value={searchParams.tab || 0} onChange={handleChange} aria-label='election detail tabs'>
                    <Tab
                        label={t('tabs.basicInfo')}
                        {...a11yProps(0)}
                        sx={{
                            fontWeight: 'bold'
                        }}
                    />
                    <Tab
                        label={t('tabs.voteList')}
                        {...a11yProps(1)}
                        sx={{
                            fontWeight: 'bold'
                        }}
                    />
                    <Tab
                        label={t('tabs.tally')}
                        {...a11yProps(2)}
                        sx={{
                            fontWeight: 'bold'
                        }}
                    />
                </Tabs>
                <TabPanel value={searchParams.tab || 0} index={0}>
                    <BasicInfoElectionDetail electionId={electionId} />
                </TabPanel>
                <TabPanel value={searchParams.tab || 0} index={1}>
                    <VoteListPage electionId={electionId} />
                </TabPanel>
            </Container>
        </>
    )
}

export default ElectionDetailPage
