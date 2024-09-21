// ** React Imports
import { useState, useEffect } from 'react'

// ** MUI Imports
import CardContent from '@mui/material/CardContent'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import Typography from '@mui/material/Typography'
import TableContainer from '@mui/material/TableContainer'
import Box from '@mui/material/Box'
import Button, { ButtonProps } from '@mui/material/Button'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { StyledTableCell } from 'src/@core/components/customised-table/styled-table-cell/StyledTableCell'
import { StyledTableRow } from 'src/@core/components/customised-table/styled-table-row/StyledTableRow'
import { styled } from '@mui/material/styles'
import CustomisedErrorEmpty from 'src/@core/components/customised-error-empty/CustomisedErrorEmpty'
import CustomisedAlertDialog from 'src/@core/components/customised-alert-dialog/CustomisedAlertDialog'
import { AdminMenuStatusesReducer, useAppDispatch, useAppSelector } from 'src/redux/reducers'
import { AdminMenuStatusesModel } from 'src/models/AdminMenuStatusesModel'
import { convertDateIntoReadableFormat } from 'src/utils/CommonUtils'
import EnhancedTable from 'src/@core/components/enhanced-table-view/EnhancedTable'

const ButtonStyled = styled(Button)<ButtonProps>(({ theme }) => ({
  marginRight: theme.spacing(4.5),
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    marginLeft: 0,
    textAlign: 'center',
    marginTop: theme.spacing(4)
  }
}))

const TabAllMenuStatuses = () => {
  // ** State
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
  const [selectedAdminMenuStatus, setSelectedAdminMenuStatus] = useState<AdminMenuStatusesModel | null>(null)

  const dispatch = useAppDispatch()

  // @ts-ignore
  const allAdminMenuStatusesDataResult = useAppSelector(AdminMenuStatusesReducer.selectAllAdminMenuStatusesDataResult)
  // @ts-ignore
  const deletedAdminMenuStatusResponse = useAppSelector(AdminMenuStatusesReducer.selectDeletedAdminMenuStatusResponse)

  const callAllMenuStatusesApi = () => {
    dispatch({ type: 'FETCH_ALL_ADMIN_MENU_STATUSES' })
  }

  useEffect(() => {
    callAllMenuStatusesApi()
  }, [])

  const resetSelectedAdminMenu = () => {
    setSelectedAdminMenuStatus(null)
    setIsDialogOpen(false)
  }

  useEffect(() => {
    if (deletedAdminMenuStatusResponse?.isCompleted) {
      resetSelectedAdminMenu()
      if (deletedAdminMenuStatusResponse?.succeeded) {
        dispatch(AdminMenuStatusesReducer.resetDeletedAdminMenuStatusResponse())
        callAllMenuStatusesApi()
      } else {
        dispatch(AdminMenuStatusesReducer.resetDeletedAdminMenuStatusResponse())
      }
    }
  }, [deletedAdminMenuStatusResponse])

  const deleteMenuStatus = async () => {
    dispatch({
      type: 'DELETE_ADMIN_MENU_STATUS',
      payload: {
        adminMenuStatusId: selectedAdminMenuStatus?.id
      }
    })
  }

  const onDeleteClick = async (adminMenuStatusData: AdminMenuStatusesModel) => {
    setSelectedAdminMenuStatus(adminMenuStatusData)
    setIsDialogOpen(true)
  }

  const onEditClick = async (adminMenuStatusData: AdminMenuStatusesModel) => {
    setSelectedAdminMenuStatus(adminMenuStatusData)
  }

  const handleDialogOpen = () => {
    setIsDialogOpen(!isDialogOpen)
  }

  const renderDataTable = () => {
    if (allAdminMenuStatusesDataResult?.dataArray && allAdminMenuStatusesDataResult.dataArray.length > 0) {
      return (
        <EnhancedTable
          tableDataArray={allAdminMenuStatusesDataResult.dataArray}
          onDeleteClick={(data: any) => onDeleteClick(data)}
          onEditClick={(data: any) => onEditClick(data)}
          deletionResponse={deletedAdminMenuStatusResponse}
        ></EnhancedTable>
      )
    }
  }

  const renderEmpty = () => {
    return (
      <CustomisedErrorEmpty
        title='No admin menus found!'
        type='empty'
        message={allAdminMenuStatusesDataResult?.message ?? ''}
      ></CustomisedErrorEmpty>
    )
  }

  const renderError = () => {
    return (
      <CustomisedErrorEmpty
        title='Error!'
        type='empty'
        message={allAdminMenuStatusesDataResult?.message ?? ''}
      ></CustomisedErrorEmpty>
    )
  }

  const renderData = () => {
    if (allAdminMenuStatusesDataResult?.isCompleted && !allAdminMenuStatusesDataResult?.succeeded) {
      return renderError()
    }
    if (!allAdminMenuStatusesDataResult?.dataArray || allAdminMenuStatusesDataResult.dataArray.length <= 0) {
      return renderEmpty()
    }

    return renderDataTable()
  }

  const renderAlertDialog = () => {
    return (
      <CustomisedAlertDialog
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={handleDialogOpen}
        dialogTitle='Delete menu status!'
        dialogMessage={`Are you sure you want to delete ${selectedAdminMenuStatus?.menuStatusTitle} menu status?`}
        dialogButtons={[
          {
            title: 'Yes',
            onClick: () => {
              deleteMenuStatus()
            },
            autoFocus: true,
            color: 'error'
          },
          {
            title: 'No',
            onClick: () => {
              setIsDialogOpen(false)
              resetSelectedAdminMenu()
            },
            autoFocus: false,
            color: 'success'
          }
        ]}
      />
    )
  }

  return (
    <div>
      <CardContent>
        {renderAlertDialog()}
        {renderData()}
      </CardContent>
    </div>
  )
}

export default TabAllMenuStatuses
