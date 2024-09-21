import * as React from 'react'
import Box from '@mui/material/Box'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableSortLabel from '@mui/material/TableSortLabel'
import Checkbox from '@mui/material/Checkbox'
import { visuallyHidden } from '@mui/utils'
import { DataArrayProps, KeysOfProps, Order } from 'src/models/CommonEnhancedTableModel'
import { getHeadCellsDataArray } from './Utils/utils'
import { styled } from '@mui/material/styles'
import { amber, green } from '@mui/material/colors'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16
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

export interface EnhancedTableHeadProps {
  tableDataArray: DataArrayProps
  numSelected: number
  onRequestSort: (event: React.MouseEvent<unknown>, property: KeysOfProps) => void
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void
  order: Order
  orderBy: string
  rowCount: number
}

const EnhancedTableHead = (props: EnhancedTableHeadProps) => {
  const { tableDataArray, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props
  const createSortHandler = (property: KeysOfProps) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property)
  }

  return (
    <TableHead>
      <StyledTableRow>
        <StyledTableCell padding='checkbox'>
          {numSelected ? (
            <Checkbox
              color='primary'
              indeterminate={numSelected > 0}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{
                'aria-label': 'select all menus'
              }}
            />
          ) : null}
        </StyledTableCell>
        {getHeadCellsDataArray(tableDataArray).map((headCell, index) => (
          <StyledTableCell
            key={headCell.id}
            align='left'
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
            style={{ padding: 20 }}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
              sx={{
                '&.MuiTableSortLabel-root': {
                  color: 'white'
                },
                '&.MuiTableSortLabel-root:hover': {
                  color: amber[800]
                },
                '&.Mui-active': {
                  color: green[800]
                },
                '& .MuiTableSortLabel-icon': {
                  color: `${green[800]} !important`
                }
              }}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component='span' sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </StyledTableCell>
        ))}
      </StyledTableRow>
    </TableHead>
  )
}

export default EnhancedTableHead
