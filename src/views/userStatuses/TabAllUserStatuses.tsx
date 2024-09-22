// ** React Imports
import { useState, useEffect } from 'react'

// ** MUI Imports
import CardContent from '@mui/material/CardContent'
import Button, { ButtonProps } from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import CustomisedErrorEmpty from 'src/@core/components/customised-error-empty/CustomisedErrorEmpty'
import CustomisedAlertDialog from 'src/@core/components/customised-alert-dialog/CustomisedAlertDialog'
import { UserStatusModel } from 'src/models/UserStatusModel'
import { UserStatusesReducer, useAppDispatch, useAppSelector } from 'src/redux/reducers'
import EnhancedTable from 'src/@core/components/enhanced-table-view/EnhancedTable'

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
