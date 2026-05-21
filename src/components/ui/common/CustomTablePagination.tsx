import TablePagination from '@mui/material/TablePagination'
import { useTranslation } from 'react-i18next'
import { useEffect, useState } from 'react'
import { useNavigate, useSearch } from '@tanstack/react-router'

interface Props {
    count: number
    searchFullPath: any
    navigateFullPath: any
}

const CustomTablePagination: React.FC<Props> = (props) => {
    const searchParams = useSearch({ from: props.searchFullPath })
    const navigate = useNavigate({ from: props.navigateFullPath })

    const { t } = useTranslation('common')
    const [tablePage, setTablePage] = useState({
        page: 0,
        pageSize: 10
    })

    useEffect(() => {
        navigate({
            search: {
                ...searchParams,
                page: tablePage.page,
                pageSize: tablePage.pageSize
            } as any
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tablePage])

    const handleChangePage = (_event: unknown, newPage: number) => {
        setTablePage({ ...tablePage, page: newPage })
    }

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTablePage({ ...tablePage, pageSize: Number(event.target.value) })
    }

    return (
        <TablePagination
            component='div'
            rowsPerPageOptions={[10, 25, 50]}
            count={props.count}
            page={tablePage.page}
            rowsPerPage={tablePage.pageSize}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage={t('customTable.rowsPerPage')}
            align='right'
        />
    )
}

export default CustomTablePagination
