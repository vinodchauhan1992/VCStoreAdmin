import React from 'react'
import {
  CommonEnhancedTableDataObjectModel,
  DataArrayProps,
  HeadCellModel,
  KeysOfProps,
  Order
} from 'src/models/CommonEnhancedTableModel'

export function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

export function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (a: { [key in Key]: string }, b: { [key in Key]: string }) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
export function stableSort<T>(array: DataArrayProps, comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number])
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) {
      return order
    }
    return a[1] - b[1]
  })
  return stabilizedThis.map(el => el[0])
}

export const handleRequestSort = ({
  event,
  property,
  orderBy,
  order,
  setOrder,
  setOrderBy
}: {
  event: React.MouseEvent<unknown>
  property: KeysOfProps
  orderBy: KeysOfProps
  order: Order
  setOrder: (order: Order) => void
  setOrderBy: (orderBy: KeysOfProps) => void
}) => {
  const isAsc = orderBy === property && order === 'asc'
  setOrder(isAsc ? 'desc' : 'asc')
  setOrderBy(property)
}

export const handleSelectAllClick = ({
  event,
  setSelected,
  tableDataArray
}: {
  event: React.ChangeEvent<HTMLInputElement>
  setSelected: (selected: string[] | []) => void
  tableDataArray: DataArrayProps
}) => {
  if (event.target.checked) {
    const newSelected: string[] = []
    setSelected(newSelected)
    return
  }
  setSelected([])
}

export const handleClick = ({
  event,
  id,
  selected,
  setSelected
}: {
  event: React.MouseEvent<unknown>
  id: string
  selected: string[] | []
  setSelected: (selected: string[] | []) => void
}) => {
  const selectedIndex = selected.findIndex(dataString => dataString === id)
  let newSelected: string[] = []
  if (selectedIndex === -1) {
    newSelected.push(id)
  } else {
    newSelected = []
  }
  // if (selectedIndex === -1) {
  //   newSelected = newSelected.concat(selected, id)
  // } else if (selectedIndex === 0) {
  //   newSelected = newSelected.concat(selected.slice(1))
  // } else if (selectedIndex === selected.length - 1) {
  //   newSelected = newSelected.concat(selected.slice(0, -1))
  // } else if (selectedIndex > 0) {
  //   newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1))
  // }
  setSelected(newSelected)
}

export const handleChangePage = ({
  event,
  newPage,
  setPage
}: {
  event: unknown
  newPage: number
  setPage: (newPage: number) => void
}) => {
  setPage(newPage)
}

export const handleChangeRowsPerPage = ({
  event,
  setRowsPerPage,
  setPage
}: {
  event: React.ChangeEvent<HTMLInputElement>
  setRowsPerPage: (rowsPerPage: number) => void
  setPage: (page: number) => void
}) => {
  setRowsPerPage(parseInt(event.target.value, 10))
  setPage(0)
}

export const handleChangeDense = ({
  event,
  setDense
}: {
  event: React.ChangeEvent<HTMLInputElement>
  setDense: (isDense: boolean) => void
}) => {
  setDense(event.target.checked)
}

export const isSelected = ({ id, selected }: { id: string; selected: string[] }): boolean => {
  return selected.indexOf(id) != -1 ? true : false
}

// Avoid a layout jump when reaching the last page with empty rows.
export const isEmptyRows = ({
  page,
  rowsPerPage,
  tableDataArray
}: {
  page: number
  rowsPerPage: number
  tableDataArray: DataArrayProps
}) => {
  return page > 0 ? Math.max(0, (1 + page) * rowsPerPage - tableDataArray.length) : 0
}

export const getHeadCellsDataArray = (tableDataArray: DataArrayProps) => {
  const tableHeadDataArray: HeadCellModel[] = []
  if (tableDataArray && tableDataArray.length > 0) {
    const tableDataObject = tableDataArray[0]
    Object.keys(tableDataObject).map(key => {
      if (key !== '__v') {
        tableHeadDataArray.push({
          id: key.toLowerCase() as KeysOfProps,
          numeric: false,
          disablePadding: false,
          label: key
        })
      }
    })
  }
  return tableHeadDataArray
}

export const getSelectedAdminMenuDataArrayById = ({
  selected,
  tableDataArray
}: {
  selected: string[]
  tableDataArray: DataArrayProps
}) => {
  const selectedAdminMenuDataArray: DataArrayProps = []
  if (selected && selected.length > 0) {
    selected.map(selectedAdminId => {
      const foundData = tableDataArray.find(
        (tableData: CommonEnhancedTableDataObjectModel) => tableData?.id === selectedAdminId
      )
      if (foundData && Object.keys(foundData).length > 0) {
        // @ts-ignore
        selectedAdminMenuDataArray.push(foundData)
      }
    })
  }
  return selectedAdminMenuDataArray
}
