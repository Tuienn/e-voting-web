import { useNavigate, useParams, useSearch } from '@tanstack/react-router'
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import Container from '@mui/material/Container'
import Tabs from '@mui/material/Tabs'
import TabPanel, { a11yProps } from '../../../ui/mui/TabPanel'
import { useTranslation } from 'react-i18next'
import BasicInfoElectionDetail from './basicInfo'
import CustomHeader from '../../../ui/layout/PageHeader'
import AppBar from '@mui/material/AppBar'

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
            } as any
        })
    }

    return (
        <>
            <AppBar position='sticky' sx={{ backgroundColor: 'background.paper' }}>
                <Container>
                    <CustomHeader title={t('title')} hasBackButton isPageHeader />
                </Container>
            </AppBar>
            <Container>
                <Box>
                    <Tabs value={searchParams.tab || 0} onChange={handleChange} aria-label='election detail tabs'>
                        <Tab label={t('tabs.basicInfo')} {...a11yProps(0)} />
                    </Tabs>
                </Box>
                <TabPanel value={searchParams.tab || 0} index={0}>
                    <BasicInfoElectionDetail electionId={electionId} />
                </TabPanel>
            </Container>
        </>
    )
}

export default ElectionDetailPage
