import Stack from '@mui/material/Stack'
import SvgLoading from '../../../assets/svg/icons/loading.svg?react'

const SuspendComponent: React.FC = () => {
    return (
        <Stack minHeight='100vh' alignItems='center' justifyContent='center' gap={1}>
            <SvgLoading width={40} />
        </Stack>
    )
}

export default SuspendComponent
