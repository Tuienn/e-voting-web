interface Props {
    electionId: string
}

const TallyPage: React.FC<Props> = (props) => {
    return <div>Tally Page - Election ID: {props.electionId}</div>
}

export default TallyPage
