import { useParams } from '@tanstack/react-router'
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import { useState } from 'react'
import Container from '@mui/material/Container'
import Tabs from '@mui/material/Tabs'
import TabPanel, { a11yProps } from '../../../ui/mui/TabPanel'
import { useTranslation } from 'react-i18next'
import BasicInfoElectionDetail from './basicInfo'
import PageHeader from '../../../ui/layout/PageHeader'
import AppBar from '@mui/material/AppBar'

const ElectionDetailPage: React.FC = () => {
    const { electionId } = useParams({ from: '/_layout/election-management/$electionId' })
    const { t } = useTranslation('$electionId')
    const [value, setValue] = useState(0)

    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue)
    }

    return (
        <>
            <AppBar position='sticky' sx={{ backgroundColor: 'background.paper' }}>
                <Container>
                    <PageHeader title={t('title')} hasBackButton />
                </Container>
            </AppBar>
            <Container>
                <Box>
                    <Tabs value={value} onChange={handleChange} aria-label='election detail tabs'>
                        <Tab label={t('tabs.basicInfo')} {...a11yProps(0)} />
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    <BasicInfoElectionDetail electionId={electionId} />
                </TabPanel>
            </Container>
        </>
    )
}

export default ElectionDetailPage
