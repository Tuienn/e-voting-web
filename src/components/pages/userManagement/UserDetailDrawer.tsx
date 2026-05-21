import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import { Controller, useForm } from 'react-hook-form'
import { useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { z } from 'zod'
import PasswordInput from '../../ui/mui/PasswordInput'
import CustomDrawer from '../../ui/mui/CustomDrawer'
import UserService from '../../../services/bff/user.service'
import { useNotify } from '../../../stores/notification/notification.selector'
import ReplayIcon from '@mui/icons-material/Replay'
import AddIcon from '@mui/icons-material/Add'
import ModeEditIcon from '@mui/icons-material/ModeEdit'
import Chip from '@mui/material/Chip'
import Tooltip from '@mui/material/Tooltip'
import type { CreateUserRole, UserRole } from '../../../types/user'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListSubheader from '@mui/material/ListSubheader'
import ListItemButton from '@mui/material/ListItemButton'
import Paper from '@mui/material/Paper'
import { Link } from '@tanstack/react-router'

interface Props {
    userId: string | null | undefined
    onSetUserId: (userId: string | null | undefined) => void
}

const FORM_ID = 'user-detail-form'
const DEFAULT_FORM_VALUES = {
    email: '',
    name: '',
    password: '',
    role: 'VOTER' as UserRole
}
const CREATE_ROLE_OPTIONS = ['VOTER', 'CANDIDATE'] as const
const EDIT_ROLE_OPTIONS = ['ADMIN', 'VOTER', 'CANDIDATE'] as const

const UserDetailDrawer: React.FC<Props> = (props) => {
    const { t } = useTranslation('userManagement')
    const notify = useNotify()
    const isOpen = props.userId !== undefined
    const isCreate = props.userId === null
    const isEdit = props.userId !== null && props.userId !== undefined
    const queryClient = useQueryClient()

    const roleLabels: Record<UserRole, string> = {
        ADMIN: t('filter.roleOptions.admin'),
        VOTER: t('filter.roleOptions.voter'),
        CANDIDATE: t('filter.roleOptions.candidate')
    }

    const formSchema = useMemo(() => {
        const baseSchema = {
            email: z.email(t('drawer.validation.emailInvalid')),
            name: z.string().trim().min(2, t('drawer.validation.nameMinLength')).max(100)
        }

        if (isEdit) {
            return z.object({
                ...baseSchema,
                password: z.string().optional(),
                role: z.enum(EDIT_ROLE_OPTIONS)
            })
        }

        return z.object({
            ...baseSchema,
            password: z
                .string()
                .trim()
                .min(1, t('drawer.validation.passwordRequired'))
                .min(6, t('drawer.validation.passwordMinLength')),
            role: z.enum(CREATE_ROLE_OPTIONS)
        })
    }, [isEdit, t])

    type UserFormData = z.infer<typeof formSchema>

    const form = useForm<UserFormData>({
        resolver: zodResolver(formSchema),
        defaultValues: DEFAULT_FORM_VALUES
    })

    const queryUser = useQuery({
        queryKey: ['userDetail', props.userId],
        queryFn: () => UserService.getAllInfoUserById(props.userId as string),
        enabled: isEdit
    })

    const resetForm = () => {
        const user = queryUser.data?.data

        if (isEdit && user) {
            form.reset({
                email: user.email || '',
                name: user.name || '',
                password: '',
                role: user.role || 'VOTER'
            })
            return
        }

        form.reset(DEFAULT_FORM_VALUES)
    }

    const mutateCreateUser = useMutation({
        mutationFn: (data: UserFormData) =>
            UserService.createUser({
                email: data.email,
                name: data.name,
                password: data.password || '',
                role: data.role as CreateUserRole
            }),
        onSuccess: () => {
            notify(t('mutate.createUserSuccess'), 'success')
            queryClient.invalidateQueries({ queryKey: ['filterUsers'] })
            props.onSetUserId(undefined)
        },
        onError: (error: Error) => {
            notify(error.message || t('mutate.createUserError'), 'error')
        }
    })

    const mutateUpdateUser = useMutation({
        mutationFn: (data: UserFormData) =>
            UserService.updateUserById(props.userId as string, {
                email: data.email,
                name: data.name
            }),
        onSuccess: () => {
            notify(t('mutate.updateUserSuccess'), 'success')
            queryClient.invalidateQueries({ queryKey: ['filterUsers'] })
            props.onSetUserId(undefined)
        },
        onError: (error: Error) => {
            notify(error.message || t('mutate.updateUserError'), 'error')
        }
    })

    const mutateDisableUser = useMutation({
        mutationFn: () => UserService.disableUserById(props.userId as string),
        onSuccess: () => {
            queryUser.refetch()
            notify(t('mutate.disableUserSuccess'), 'success')
            queryClient.invalidateQueries({ queryKey: ['filterUsers'] })
        },
        onError: (error: Error) => {
            notify(error.message || t('mutate.disableUserError'), 'error')
        }
    })

    const mutateEnableUser = useMutation({
        mutationFn: () => UserService.enableUserById(props.userId as string),
        onSuccess: () => {
            queryUser.refetch()
            notify(t('mutate.enableUserSuccess'), 'success')
            queryClient.invalidateQueries({ queryKey: ['filterUsers'] })
        },
        onError: (error: Error) => {
            notify(error.message || t('mutate.enableUserError'), 'error')
        }
    })

    useEffect(() => {
        if (!isOpen) return
        //NOTE - Mỗi khi mở drawer thì gọi API -> cập nhật form
        resetForm()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.userId, queryUser.data?.data])

    useEffect(() => {
        if (queryUser.isError) {
            notify(queryUser.error.message || t('query.fetchUserError'), 'error')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [queryUser.isError])

    const handleSubmit = (data: UserFormData) => {
        if (isEdit) {
            mutateUpdateUser.mutate(data)
            return
        }

        mutateCreateUser.mutate(data)
    }

    return (
        <CustomDrawer
            title={props.userId ? t('drawer.editUserTitle') : t('drawer.addUserTitle')}
            onClose={() => props.onSetUserId(undefined)}
            open={props.userId !== undefined}
            footer={
                <Stack direction='row' spacing={1} justifyContent='flex-end'>
                    <Button
                        variant='outlined'
                        color='error'
                        onClick={resetForm}
                        disabled={form.formState.isSubmitting || queryUser.isFetching}
                        startIcon={<ReplayIcon />}
                    >
                        {t('drawer.reset')}
                    </Button>
                    {/* NOTE - FORM_ID để dùng khi button bên ngoài form */}
                    <Button
                        type='submit'
                        form={FORM_ID}
                        variant='contained'
                        loading={form.formState.isSubmitting}
                        disabled={queryUser.data?.data.role === 'ADMIN' || queryUser.isFetching}
                        startIcon={isEdit ? <ModeEditIcon /> : <AddIcon />}
                    >
                        {isEdit ? t('drawer.update') : t('drawer.create')}
                    </Button>
                </Stack>
            }
        >
            <Stack id={FORM_ID} component='form' spacing={2} pt={1} pb={6} onSubmit={form.handleSubmit(handleSubmit)}>
                <Controller
                    name='email'
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <TextField
                            {...field}
                            label={t('drawer.email')}
                            error={!!fieldState.error}
                            helperText={fieldState.error?.message || ''}
                            fullWidth
                            autoComplete='email'
                            autoFocus
                            required
                        />
                    )}
                />

                <Controller
                    name='name'
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <TextField
                            {...field}
                            label={t('drawer.name')}
                            error={!!fieldState.error}
                            helperText={fieldState.error?.message || ''}
                            fullWidth
                            autoComplete='name'
                            required
                        />
                    )}
                />

                {isCreate && (
                    <Controller
                        name='password'
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <PasswordInput
                                {...field}
                                label={t('drawer.password')}
                                error={!!fieldState.error}
                                helperText={fieldState.error?.message || ''}
                                fullWidth
                                autoComplete='new-password'
                                required
                            />
                        )}
                    />
                )}

                <Controller
                    name='role'
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <TextField
                            {...field}
                            value={field.value || ''}
                            select
                            label={t('drawer.role')}
                            error={!!fieldState.error}
                            helperText={fieldState.error?.message || ''}
                            fullWidth
                            required
                        >
                            {(isEdit ? EDIT_ROLE_OPTIONS : CREATE_ROLE_OPTIONS).map((role) => (
                                <MenuItem key={role} value={role}>
                                    {roleLabels[role]}
                                </MenuItem>
                            ))}
                        </TextField>
                    )}
                />

                {isEdit &&
                    (queryUser.data?.data.isActive ? (
                        <Tooltip title={t('table.chip.disable')}>
                            <Chip
                                label={t('filter.statusOptions.active')}
                                color='success'
                                clickable
                                onClick={() => mutateDisableUser.mutate()}
                            />
                        </Tooltip>
                    ) : (
                        <Tooltip title={t('table.chip.enable')}>
                            <Chip
                                label={t('filter.statusOptions.inactive')}
                                color='error'
                                clickable
                                onClick={() => mutateEnableUser.mutate()}
                            />
                        </Tooltip>
                    ))}

                {queryUser.isSuccess && ['VOTER', 'CANDIDATE'].includes(queryUser.data.data.role) && (
                    <>
                        <Divider />{' '}
                        <Paper elevation={3} sx={{ p: 1 }}>
                            <List subheader={<ListSubheader>{t('drawer.electionList')}</ListSubheader>}>
                                {queryUser.data.data.elections!.map((election) => (
                                    <ListItem key={election.id} disablePadding>
                                        <ListItemButton>
                                            <Link
                                                to={`/election-management/$electionId`}
                                                params={{ electionId: election.id }}
                                            >
                                                <ListItemText primary={election.name} />
                                            </Link>
                                        </ListItemButton>
                                    </ListItem>
                                ))}
                            </List>
                        </Paper>
                    </>
                )}
            </Stack>
        </CustomDrawer>
    )
}

export default UserDetailDrawer
