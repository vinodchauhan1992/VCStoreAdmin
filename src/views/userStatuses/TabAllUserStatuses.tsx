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
import { UserStatusModel } from 'src/models/UserStatusModel'
import { UserStatusesReducer, useAppDispatch, useAppSelector } from 'src/redux/reducers'
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

const TabAllUserStatuses = () => {
  const dispatch = useAppDispatch()

  // ** State
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
  const [selectedUserStatus, setSelectedUserStatus] = useState<UserStatusModel | null>(null)

  // @ts-ignore
  const allUserStatusesDataResult = useAppSelector(UserStatusesReducer.selectAllUserStatusesDataResult)
  // @ts-ignore
  const deletedUserStatusResponse = useAppSelector(UserStatusesReducer.selectDeletedUserStatusResponse)

  useEffect(() => {
    dispatch({ type: 'FETCH_ALL_USER_STATUSES' })
  }, [])

  const resetSelectedUserStatus = () => {
    setSelectedUserStatus(null)
    setIsDialogOpen(false)
  }

  useEffect(() => {
    if (deletedUserStatusResponse?.isCompleted) {
      resetSelectedUserStatus()
      if (deletedUserStatusResponse?.succeeded) {
        dispatch({ type: 'FETCH_ALL_USER_STATUSES' })
        dispatch(UserStatusesReducer.resetDeletedUserStatusResponse())
      }
    }
  }, [deletedUserStatusResponse])

  const deleteUserStatus = async () => {
    dispatch({ type: 'DELETE_USER_STATUS', payload: { userStatusId: selectedUserStatus?.id } })
  }

  const onDeleteClick = async (userStatusData: UserStatusModel) => {
    setSelectedUserStatus(userStatusData)
    setIsDialogOpen(true)
  }

  const onEditClick = async (userStatusData: UserStatusModel) => {
    setSelectedUserStatus(userStatusData)
  }

  const onViewClick = async (userStatusData: UserStatusModel) => {
    setSelectedUserStatus(userStatusData)
  }

  const handleDialogOpen = () => {
    setIsDialogOpen(!isDialogOpen)
  }

  const renderDataTable = () => {
    if (allUserStatusesDataResult?.dataArray && allUserStatusesDataResult.dataArray.length > 0) {
      return (
        <EnhancedTable
          tableDataArray={allUserStatusesDataResult.dataArray}
          onDeleteClick={(data: any) => onDeleteClick(data)}
          onEditClick={(data: any) => onEditClick(data)}
          deletionResponse={deletedUserStatusResponse}
        ></EnhancedTable>
      )
    }
  }

  const renderEmpty = () => {
    return (
      <CustomisedErrorEmpty
        title='No user statuses found!'
        type='empty'
        message={allUserStatusesDataResult?.message ?? ''}
      ></CustomisedErrorEmpty>
    )
  }

  const renderError = () => {
    return (
      <CustomisedErrorEmpty
        title='Error!'
        type='empty'
        message={allUserStatusesDataResult?.message ?? ''}
      ></CustomisedErrorEmpty>
    )
  }

  const renderData = () => {
    if (allUserStatusesDataResult?.isCompleted && !allUserStatusesDataResult?.succeeded) {
      return renderError()
    }
    if (!allUserStatusesDataResult?.dataArray || allUserStatusesDataResult.dataArray.length <= 0) {
      return renderEmpty()
    }

    return renderDataTable()
  }

  const renderAlertDialog = () => {
    return (
      <CustomisedAlertDialog
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={handleDialogOpen}
        dialogTitle='Delete user status!'
        dialogMessage={`Are you sure you want to delete ${selectedUserStatus?.status} user status?`}
        dialogButtons={[
          {
            title: 'Yes',
            onClick: () => {
              deleteUserStatus()
            },
            autoFocus: true,
            color: 'error'
          },
          {
            title: 'No',
            onClick: () => {
              setIsDialogOpen(false)
              resetSelectedUserStatus()
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

export default TabAllUserStatuses
