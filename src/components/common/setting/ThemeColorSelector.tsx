import { useState } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Palette from '@mui/icons-material/Palette'
import Check from '@mui/icons-material/Check'
import { useTranslation } from 'react-i18next'
import { useThemeColor, useSetThemeColor } from '../../../stores/themeColor/themeColor.selector'

interface ColorOption {
    id: string
    name: string
    primary: string
}

const ThemeColorSelector: React.FC = () => {
    const { t } = useTranslation('personal')
    const [open, setOpen] = useState(false)
    const themeColor = useThemeColor()
    const setThemeColor = useSetThemeColor()

    const colorOptions: ColorOption[] = [
        {
            id: 'blue',
            name: t('settings.themeColor.colors.blue'),
            primary: '#1976d2'
        },
        {
            id: 'red',
            name: t('settings.themeColor.colors.red'),
            primary: '#f44336'
        },
        {
            id: 'green',
            name: t('settings.themeColor.colors.green'),
            primary: '#4caf50'
        },
        {
            id: 'orange',
            name: t('settings.themeColor.colors.orange'),
            primary: '#ff9800'
        }
    ]

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleSelectColor = (colorId: string) => {
        setThemeColor(colorId)
        handleClose()
    }

    return (
        <>
            <IconButton size='small' onClick={handleOpen}>
                <Palette />
            </IconButton>

            <Dialog open={open} keepMounted onClose={handleClose} maxWidth='xs' fullWidth>
                <DialogTitle>{t('settings.themeColor.dialogTitle')}</DialogTitle>

                <DialogContent>
                    <Stack spacing={2} sx={{ py: 1 }}>
                        {colorOptions.map((option) => (
                            <Box
                                key={option.id}
                                onClick={() => handleSelectColor(option.id)}
                                sx={{
                                    p: 2,
                                    borderRadius: 2,
                                    border: '2px solid',
                                    borderColor: themeColor === option.id ? option.primary : 'divider',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s',
                                    '&:hover': {
                                        borderColor: option.primary,
                                        bgcolor: 'action.hover',
                                        transform: 'scale(1.02)'
                                    }
                                }}
                            >
                                <Stack direction='row' spacing={2} alignItems='center'>
                                    {/* Color Preview */}
                                    <Box
                                        sx={{
                                            width: 40,
                                            height: 40,
                                            bgcolor: option.primary,
                                            borderRadius: 1,
                                            boxShadow: 1
                                        }}
                                    />

                                    {/* Color Name */}
                                    <Typography variant='body1' fontWeight={500} sx={{ flex: 1 }}>
                                        {option.name}
                                    </Typography>

                                    {/* Check Icon */}
                                    {themeColor === option.id && (
                                        <Check
                                            sx={{
                                                color: option.primary,
                                                fontSize: 28
                                            }}
                                        />
                                    )}
                                </Stack>
                            </Box>
                        ))}
                    </Stack>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default ThemeColorSelector
