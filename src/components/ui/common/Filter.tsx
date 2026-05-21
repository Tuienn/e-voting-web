import Paper from '@mui/material/Paper'
import { useTranslation } from 'react-i18next'
import ResponsiveButton from '../mui/ResponsiveButton'
import ReplayIcon from '@mui/icons-material/Replay'
import SearchIcon from '@mui/icons-material/Search'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import z from 'zod'
import dayjs from 'dayjs'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate, useSearch } from '@tanstack/react-router'
import { removeEmptyValues } from '../../../lib/utils'
import { useEffect } from 'react'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import CustomHeader from '../layout/PageHeader'

interface ItemFilter {
    type: 'input' | 'select' | 'datetime'
    name: string
    label: string
    setting?: {
        select?: {
            options: { label: string; value: string }[]
        }
    }
}

interface Props {
    searchFullPath: any
    navigateFullPath: any
    items: ItemFilter[]
}

const Filter: React.FC<Props> = (props) => {
    const { t } = useTranslation('common')

    const searchParams = useSearch({ from: props.searchFullPath })
    const navigate = useNavigate({ from: props.navigateFullPath })

    const formSchema = z.object(
        props.items.reduce(
            (acc, item) => {
                acc[item.name] = z.string().optional()
                return acc
            },
            {} as Record<string, z.ZodTypeAny>
        )
    )

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: props.items.reduce(
            (acc, item) => {
                acc[item.name] = (searchParams[item.name] as string) || ''
                return acc
            },
            {} as Record<string, string>
        )
    })

    //NOTE - Đồng bộ form state với searchParams thay vì remount cả Paper bằng key
    //NOTE - Nếu ko có useEffect này thì có lỗi khi sửa 1 vài truờng dữ liệu -> bấm search(cập nhật url)->bấm reset(cập nhật đc url)->nhưng không thể edit truờng dữ liệu nào ngoài trường dữ liệu đã đc sửa ở trên
    useEffect(() => {
        const values = props.items.reduce(
            (acc, item) => {
                acc[item.name] = (searchParams[item.name] as string) || ''
                return acc
            },
            {} as Record<string, string>
        )
        form.reset(values)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams])

    const onSubmit = (data: z.infer<typeof formSchema>) => {
        //NOTE - Khi form submit thì sẽ đẩy toàn bộ value form vào searchParams
        navigate({
            search: removeEmptyValues({
                ...searchParams,
                ...data
            }) as any //NOTE - Loại bỏ những trường có value là rỗng để tránh việc url bị dài thêm những trường ko cần thiết
        })
    }

    const onReset = () => {
        navigate({
            search: {} as any
        })
    }

    return (
        <Paper elevation={3} sx={{ p: 2 }} component='form' onSubmit={form.handleSubmit(onSubmit)}>
            <CustomHeader
                title={t('filter.title')}
                actions={[
                    <ResponsiveButton icon={<ReplayIcon />} color='error' type='button' onClick={onReset}>
                        {t('filter.reset')}
                    </ResponsiveButton>,
                    <ResponsiveButton icon={<SearchIcon />} color='primary' type='submit'>
                        {t('filter.search')}
                    </ResponsiveButton>
                ]}
            />
            <Divider sx={{ my: 1.5 }} />
            <Grid container spacing={2}>
                {props.items.map((item, index) => (
                    <Grid
                        key={index}
                        size={{
                            xs: 12,
                            sm: 6,
                            md: 4,
                            lg: 3
                        }}
                    >
                        <Controller
                            name={item.name}
                            control={form.control}
                            render={({ field: { ref, ...field } }) => {
                                if (item.type === 'datetime') {
                                    const value = typeof field.value === 'string' ? field.value : ''

                                    return (
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DateTimePicker
                                                label={item.label}
                                                value={value ? dayjs(value) : null}
                                                onChange={(value) =>
                                                    field.onChange(value?.isValid() ? value.toISOString() : '')
                                                }
                                                slotProps={{
                                                    textField: {
                                                        fullWidth: true,
                                                        inputRef: ref
                                                    }
                                                }}
                                            />
                                        </LocalizationProvider>
                                    )
                                }

                                return (
                                    <TextField
                                        {...field}
                                        inputRef={ref}
                                        value={field.value ?? ''}
                                        fullWidth
                                        label={item.label}
                                        select={item.type === 'select'}
                                    >
                                        {item.type === 'select' &&
                                            item.setting?.select?.options.map((option, index) => (
                                                <MenuItem key={index} value={option.value}>
                                                    {option.label}
                                                </MenuItem>
                                            ))}
                                    </TextField>
                                )
                            }}
                        />
                    </Grid>
                ))}
            </Grid>
        </Paper>
    )
}

export default Filter
