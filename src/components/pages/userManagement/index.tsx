import Container from '@mui/material/Container'
import PageHeader from '../../common/layout/PageHeader'
import { useTranslation } from 'react-i18next'
import ResponsiveButton from '../../common/mui/ResponsiveButton'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import Tooltip from '@mui/material/Tooltip'

const UserManagementPage: React.FC = () => {
    const { t } = useTranslation('userManagement')

    return (
        <Container>
            <PageHeader
                title={t('title')}
                actions={[
                    <Tooltip title={t('headerActions.addUser')}>
                        <ResponsiveButton icon={<PersonAddIcon />} color='primary' variant='outlined'>
                            {t('headerActions.addUser')}
                        </ResponsiveButton>
                    </Tooltip>,
                    <Tooltip title={t('headerActions.importExcelTooltip')}>
                        <ResponsiveButton icon={<CloudUploadIcon />}>{t('headerActions.importExcel')}</ResponsiveButton>
                    </Tooltip>
                ]}
            />
        </Container>
    )
}

export default UserManagementPage
