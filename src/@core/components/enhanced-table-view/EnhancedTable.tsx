import * as React from 'react'
import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import EnhancedTableToolbar from './EnhancedTableToolbar'
import {
  CommonEnhancedTableDataObjectModel,
  DataArrayProps,
  KeysOfProps,
  Order
} from 'src/models/CommonEnhancedTableModel'
import EnhancedTableHead from './EnhancedTableHead'
import {
  getComparator,
  getSelectedAdminMenuDataArrayById,
  handleChangeDense,
  handleChangePage,
  handleChangeRowsPerPage,
  handleClick,
  handleRequestSort,
  handleSelectAllClick,
  isEmptyRows,
  isSelected,
  stableSort
} from './Utils/utils'
import { convertDateIntoReadableFormat } from 'src/utils/CommonUtils'
import { styled } from '@mui/material/styles'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14
  }
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0
  }
}))

export interface EnhancedTableProps {
  tableDataArray: DataArrayProps
  onDeleteClick?: (data: CommonEnhancedTableDataObjectModel) => void
  onEditClick?: (data: CommonEnhancedTableDataObjectModel) => void
  deletionResponse?: any
}

const EnhancedTable = (props: EnhancedTableProps) => {
  const { tableDataArray, onDeleteClick, onEditClick, deletionResponse } = props

  const [order, setOrder] = React.useState<Order>('asc')
  const [orderBy, setOrderBy] = React.useState<KeysOfProps>('priority')
  const [selected, setSelected] = React.useState<string[] | []>([])
  const [page, setPage] = React.useState(0)
  const [dense, setDense] = React.useState(false)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)

  const visibleRows = React.useMemo(
    () =>
      stableSort(tableDataArray, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage, tableDataArray]
  )

  React.useEffect(() => {
    if (deletionResponse?.isCompleted) {
      if (deletionResponse?.succeeded) {
        setSelected([])
      }
    }
  }, [deletionResponse])

  const renderTableCells = (row: CommonEnhancedTableDataObjectModel) => {
    return Object.entries(row).map(([key, value]) => {
      if (key?.toLowerCase() === 'dateadded' || key?.toLowerCase() === 'datemodified') {
        return (
          <StyledTableCell key={key} align='left'>
            {convertDateIntoReadableFormat(value)}
          </StyledTableCell>
        )
      }
      if (typeof value === 'boolean') {
        return (
          <StyledTableCell key={key} align='left'>
            {value === true ? 'Yes' : 'No'}
          </StyledTableCell>
        )
      }

      return (
        <StyledTableCell key={key} align='left'>
          {value}
        </StyledTableCell>
      )
    })
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          onDeleteClick={() => {
            onDeleteClick?.(getSelectedAdminMenuDataArrayById({ selected, tableDataArray })?.[0])
          }}
          onEditClick={() => onEditClick?.(getSelectedAdminMenuDataArrayById({ selected, tableDataArray })?.[0])}
        />
        <TableContainer>
          <Table
            stickyHeader={true}
            sx={{ minWidth: 750 }}
            aria-labelledby='tableTitle'
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              tableDataArray={tableDataArray}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={(event: React.ChangeEvent<HTMLInputElement>) =>
                handleSelectAllClick({ event, setSelected, tableDataArray })
              }
              onRequestSort={(event: React.MouseEvent<unknown>, property: KeysOfProps) =>
                handleRequestSort({ event, property, order, orderBy, setOrder, setOrderBy })
              }
              rowCount={tableDataArray.length}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = isSelected({ id: row.id, selected }) ? true : false
                const labelId = `enhanced-table-checkbox-${index}`

                return (
                  <StyledTableRow
                    hover
                    onClick={(event: React.MouseEvent<unknown>) =>
                      handleClick({ event, id: row.id, selected, setSelected })
                    }
                    role='checkbox'
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                    sx={{ cursor: 'pointer' }}
                  >
                    <StyledTableCell padding='checkbox'>
                      <Checkbox
                        color='primary'
                        checked={isItemSelected}
                        inputProps={{
                          'aria-labelledby': labelId
                        }}
                      />
                    </StyledTableCell>
                    {/*@ts-ignore*/}
                    {renderTableCells(row)}
                  </StyledTableRow>
                )
              })}
              {isEmptyRows({ page, rowsPerPage, tableDataArray }) > 0 && (
                <StyledTableRow
                  style={{
                    height: (dense ? 33 : 53) * isEmptyRows({ page, rowsPerPage, tableDataArray })
                  }}
                >
                  <StyledTableCell colSpan={6} />
                </StyledTableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component='div'
          count={tableDataArray.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(event: unknown, newPage: number) => handleChangePage({ event, newPage, setPage })}
          onRowsPerPageChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            handleChangeRowsPerPage({ event, setRowsPerPage, setPage })
          }
        />
      </Paper>
      <FormControlLabel
        control={
          <Switch
            checked={dense}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChangeDense({ event, setDense })}
          />
        }
        label='Dense table'
      />
    </Box>
  )
}

export default EnhancedTable
