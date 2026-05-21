import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'

interface Props {
    value?: string
}

const LongText: React.FC<Props> = (props) => {
    if (!props.value) return '-'
    return (
        <Tooltip title={props.value}>
            <Typography sx={{ maxWidth: 240, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {props.value}
            </Typography>
        </Tooltip>
    )
}

export default LongText
