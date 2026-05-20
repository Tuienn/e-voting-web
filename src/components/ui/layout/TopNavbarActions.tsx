import { Link } from '@tanstack/react-router'
import IconButton from '@mui/material/IconButton'
import SettingsIcon from '@mui/icons-material/Settings'

const TopNavbarActions = () => {
    return (
        <IconButton color='primary' component={Link} to='/personal'>
            <SettingsIcon />
        </IconButton>
    )
}

export default TopNavbarActions
