import FormLabel from '@mui/material/FormLabel'
import Stack from '@mui/material/Stack'
import type { SxProps } from '@mui/material/styles'
import type { Theme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import type { ReactNode } from 'react'

interface Props {
    items: {
        label: string
        value: string | ReactNode
        sx?: SxProps<Theme>
    }[]
}

const DescriptionView: React.FC<Props> = (props) => {
    const maxLabelLength = Math.max(...props.items.map((item) => item.label.length))
    return (
        <Stack gap={1}>
            {props.items.map((item, idx) => (
                <Stack key={idx} direction='row' gap={1} alignItems='center'>
                    <FormLabel sx={{ width: `${maxLabelLength}ch` }}>{item.label}</FormLabel>
                    {typeof item.value === 'string' ? <Typography sx={item.sx}>{item.value}</Typography> : item.value}
                </Stack>
            ))}
        </Stack>
    )
}

export default DescriptionView
