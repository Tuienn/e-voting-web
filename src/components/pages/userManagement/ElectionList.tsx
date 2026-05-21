import { useQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import ElectionService from '../../../services/bff/election.service'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListSubheader from '@mui/material/ListSubheader'
import Progress from '@mui/material/LinearProgress'
import ListItemButton from '@mui/material/ListItemButton'
import Paper from '@mui/material/Paper'
import type { UserRole } from '../../../types/user'

interface Props {
    userId: string
    role: Omit<UserRole, 'ADMIN'> // Only VOTER and CANDIDATE have elections
}

const ElectionList: React.FC<Props> = (props) => {
    const { t } = useTranslation('userManagement')
    const queryElectionsByVoterId = useQuery({
        queryKey: ['electionsByVoterId', props.userId],
        queryFn: () =>
            props.role === 'VOTER'
                ? ElectionService.getElectionsByVoterId(props.userId)
                : ElectionService.getElectionsByCandidateId(props.userId)
    })

    return (
        <Paper elevation={3} sx={{ p: 1 }}>
            <List subheader={<ListSubheader>{t('drawer.electionList')}</ListSubheader>}>
                {queryElectionsByVoterId.isLoading && <Progress />}
                {queryElectionsByVoterId.data?.data.map((election) => (
                    <ListItem key={election.id} disablePadding>
                        <ListItemButton>
                            <ListItemText primary={election.name} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Paper>
    )
}

export default ElectionList
