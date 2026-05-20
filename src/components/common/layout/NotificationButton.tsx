import IconButton from '@mui/material/IconButton'
import Badge from '@mui/material/Badge'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import NotificationsIcon from '@mui/icons-material/Notifications'
import Circle from '@mui/icons-material/Circle'
import CustomPopover from '../../common/mui/CustomPopover'

interface INotification {
    id: string
    title: string
    description: string
    time: string
    isRead: boolean
}

const NotificationButton: React.FC = () => {
    // Mock data
    const notifications: INotification[] = [
        {
            id: '1',
            title: 'New document uploaded',
            description: 'Your contract document has been successfully uploaded and is ready for notarization',
            time: '5 minutes ago',
            isRead: false
        },
        {
            id: '2',
            title: 'Document verified',
            description: 'The document "Property Agreement" has been verified by the notary public',
            time: '2 hours ago',
            isRead: false
        },
        {
            id: '3',
            title: 'Payment received',
            description: 'Payment for notarization service has been received and processed',
            time: '1 day ago',
            isRead: true
        },
        {
            id: '4',
            title: 'Document ready for pickup',
            description: 'Your notarized document is ready for pickup at our office',
            time: '2 days ago',
            isRead: true
        }
    ]

    const unreadCount = notifications.filter((n) => !n.isRead).length

    return (
        <CustomPopover
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right'
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
            }}
            openContent={(close) => (
                <Box sx={{ width: { xs: 320, sm: 400 }, maxHeight: 500 }}>
                    <List sx={{ p: 0 }}>
                        {notifications.map((notification, index) => (
                            <Box key={notification.id}>
                                <ListItem disablePadding>
                                    <ListItemButton
                                        onClick={close}
                                        sx={{
                                            py: 2,
                                            px: 2,
                                            bgcolor: notification.isRead ? 'transparent' : 'action.hover'
                                        }}
                                    >
                                        {/* Content */}
                                        <Stack spacing={0.5} flex={1}>
                                            <Stack direction='row' alignItems='center' spacing={1}>
                                                <Typography variant='subtitle2' fontWeight='bold'>
                                                    {notification.title}
                                                </Typography>
                                                <Circle
                                                    color='primary'
                                                    sx={{
                                                        fontSize: 10,
                                                        visibility: notification.isRead ? 'hidden' : 'visible'
                                                    }}
                                                />
                                            </Stack>

                                            <Typography
                                                variant='body2'
                                                color='text.secondary'
                                                sx={{
                                                    maxWidth: '80ch',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    display: '-webkit-box',
                                                    WebkitLineClamp: 2,
                                                    WebkitBoxOrient: 'vertical'
                                                }}
                                            >
                                                {notification.description}
                                            </Typography>

                                            <Typography variant='caption' color='text.disabled'>
                                                {notification.time}
                                            </Typography>
                                        </Stack>
                                    </ListItemButton>
                                </ListItem>

                                {index < notifications.length - 1 && <Divider />}
                            </Box>
                        ))}
                    </List>
                </Box>
            )}
        >
            <IconButton color='warning'>
                <Badge badgeContent={unreadCount} color='error'>
                    <NotificationsIcon />
                </Badge>
            </IconButton>
        </CustomPopover>
    )
}

export default NotificationButton
