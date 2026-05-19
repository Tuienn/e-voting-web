import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import { useTranslation } from 'react-i18next'
import type { SelectChangeEvent } from '@mui/material/Select'

const LanguageSelector: React.FC = () => {
    const { i18n, t } = useTranslation('personal')

    const handleChange = (event: SelectChangeEvent<string>) => {
        const language = event.target.value
        i18n.changeLanguage(language)
    }

    return (
        <Select
            value={i18n.language}
            onChange={handleChange}
            size='small'
            sx={{
                minWidth: 120,
                '& .MuiOutlinedInput-notchedOutline': {
                    border: 'none'
                }
            }}
        >
            <MenuItem value='en'>{t('settings.language.en')}</MenuItem>
            <MenuItem value='vi'>{t('settings.language.vi')}</MenuItem>
        </Select>
    )
}

export default LanguageSelector
