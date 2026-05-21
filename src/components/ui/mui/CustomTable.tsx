import Checkbox from '@mui/material/Checkbox'
import Paper from '@mui/material/Paper'
import Progress from '@mui/material/LinearProgress'
import type { SxProps } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'

interface Props {
    items: {
        header: string
        name: string
        render?: (item?: any) => React.ReactNode
        sx?: SxProps
        align?: 'left' | 'center' | 'right'
    }[]
    data: any[]
    isLoading?: boolean

    checkbox?: {
        name: string
        selectedCheckboxIds: string[]
        onSetSelectedCheckboxIds: (selectedIds: string[]) => void
    }
    pagination?: React.ReactNode
}

const CustomTable: React.FC<Props> = (props) => {
    const selectedCheckboxIds = props.checkbox?.selectedCheckboxIds || []

    const getCheckboxValue = (row: any) => {
        if (!props.checkbox) return ''

        const value = row?.[props.checkbox.name]
        if (value === null || value === undefined) return ''

        return String(value)
    }

    const selectableCheckboxIds = props.checkbox
        ? Array.from(new Set(props.data.map(getCheckboxValue).filter(Boolean)))
        : []
    const selectedRowsCount = selectableCheckboxIds.filter((id) => selectedCheckboxIds.includes(id)).length
    const isAllRowsSelected = selectableCheckboxIds.length > 0 && selectedRowsCount === selectableCheckboxIds.length
    const isSomeRowsSelected = selectedRowsCount > 0 && selectedRowsCount < selectableCheckboxIds.length

    const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!props.checkbox) return

        if (event.target.checked) {
            props.checkbox.onSetSelectedCheckboxIds(
                Array.from(new Set([...selectedCheckboxIds, ...selectableCheckboxIds]))
            )
            return
        }

        props.checkbox.onSetSelectedCheckboxIds(selectedCheckboxIds.filter((id) => !selectableCheckboxIds.includes(id)))
    }

    const handleSelectRow = (checkboxValue: string) => {
        if (!props.checkbox) return

        props.checkbox.onSetSelectedCheckboxIds(
            selectedCheckboxIds.includes(checkboxValue)
                ? selectedCheckboxIds.filter((id) => id !== checkboxValue)
                : [...selectedCheckboxIds, checkboxValue]
        )
    }

    return (
        <Paper>
            {props.isLoading && <Progress />}

            <TableContainer sx={{ maxHeight: 650 }}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            {props.checkbox && (
                                <TableCell padding='checkbox'>
                                    <Checkbox
                                        indeterminate={isSomeRowsSelected}
                                        checked={isAllRowsSelected}
                                        disabled={!selectableCheckboxIds.length}
                                        onChange={handleSelectAll}
                                        slotProps={{
                                            input: {
                                                'aria-label': 'select all rows'
                                            }
                                        }}
                                    />
                                </TableCell>
                            )}
                            {props.items.map((item) => (
                                <TableCell
                                    key={item.name}
                                    sx={{
                                        minWidth: 100,
                                        ...item.sx
                                    }}
                                    align={item.align}
                                >
                                    {item.header}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.data.map((row, rowIndex) => {
                            const checkboxValue = getCheckboxValue(row)
                            const isRowSelected = checkboxValue ? selectedCheckboxIds.includes(checkboxValue) : false

                            return (
                                <TableRow key={rowIndex} selected={isRowSelected}>
                                    {props.checkbox && (
                                        <TableCell padding='checkbox'>
                                            <Checkbox
                                                checked={isRowSelected}
                                                disabled={!checkboxValue}
                                                onChange={() => handleSelectRow(checkboxValue)}
                                                slotProps={{
                                                    input: {
                                                        'aria-label': 'select row'
                                                    }
                                                }}
                                            />
                                        </TableCell>
                                    )}
                                    {props.items.map((item) => (
                                        <TableCell
                                            key={item.name}
                                            sx={{
                                                minWidth: 100,
                                                ...item.sx
                                            }}
                                            align={item.align}
                                        >
                                            {item.render ? item.render(row) : row[item.name]}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            {props.pagination}
        </Paper>
    )
}

export default CustomTable
