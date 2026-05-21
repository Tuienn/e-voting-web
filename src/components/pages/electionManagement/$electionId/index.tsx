import { useParams } from '@tanstack/react-router'

const ElectionDetailPage: React.FC = () => {
    const { electionId } = useParams({ from: '/_layout/election-management/$electionId' })
    return <div>Election ID: {electionId}</div>
}

export default ElectionDetailPage
