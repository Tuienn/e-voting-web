import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import DoneIcon from '@mui/icons-material/Done'
import { useState } from 'react'

interface Props {
    value: string
}

const CopyButton: React.FC<Props> = ({ value }) => {
    const [copied, setCopied] = useState(false)

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(value)
            setCopied(true)
            setTimeout(() => setCopied(false), 1000) // sau 1000ms quay lại icon copy
        } catch (err) {
            console.error('Copy failed:', err)
        }
    }

    return copied ? (
        <DoneIcon fontSize={'small'} color='success' />
    ) : (
        <ContentCopyIcon fontSize={'small'} sx={{ cursor: 'pointer' }} onClick={handleCopy} />
    )
}

export default CopyButton
