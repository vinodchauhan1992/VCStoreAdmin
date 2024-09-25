// ** React Imports
import { useState, useEffect } from 'react'

// ** MUI Imports
import CardContent from '@mui/material/CardContent'
import CustomisedErrorEmpty from 'src/@core/components/customised-error-empty/CustomisedErrorEmpty'
import CustomisedAlertDialog from 'src/@core/components/customised-alert-dialog/CustomisedAlertDialog'
import { UserRoleModel } from 'src/models/UserRoleModel'
import { UserRolesReducer, useAppDispatch, useAppSelector } from 'src/redux/reducers'
import EnhancedTable from 'src/@core/components/enhanced-table-view/EnhancedTable'

const TabAllUserRoles = () => {
  // ** State
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
  const [selectedUserRole, setSelectedUserRole] = useState<UserRoleModel | null>(null)

  const dispatch = useAppDispatch()

  // @ts-ignore
  const allUserRolesDataResult = useAppSelector(UserRolesReducer.selectAllUserRolesDataResult)
  // @ts-ignore
  const deletedUserRoleResponse = useAppSelector(UserRolesReducer.selectDeletedUserRoleResponse)

  const callAllUserRolesApi = () => {
    dispatch({ type: 'FETCH_ALL_USER_ROLES' })
  }

  useEffect(() => {
    callAllUserRolesApi()
  }, [])

  const resetSelectedUserRole = () => {
    setSelectedUserRole(null)
    setIsDialogOpen(false)
  }

  useEffect(() => {
    if (deletedUserRoleResponse?.isCompleted) {
      resetSelectedUserRole()
      if (deletedUserRoleResponse?.succeeded) {
        dispatch(UserRolesReducer.resetDeletedUserRoleResponse())
        callAllUserRolesApi()
      } else {
        dispatch(UserRolesReducer.resetDeletedUserRoleResponse())
      }
    }
  }, [deletedUserRoleResponse])

  const deleteUserRole = async () => {
    dispatch({ type: 'DELETE_USER_ROLE', payload: { userRoleId: selectedUserRole?.id } })
  }

  const onDeleteClick = async (userRoleData: UserRoleModel) => {
    setSelectedUserRole(userRoleData)
    setIsDialogOpen(true)
  }

  const handleDialogOpen = () => {
    setIsDialogOpen(!isDialogOpen)
  }

  const renderDataTable = () => {
    if (allUserRolesDataResult?.dataArray && allUserRolesDataResult.dataArray.length > 0) {
      return (
        <EnhancedTable
          tableDataArray={allUserRolesDataResult.dataArray}
          onDeleteClick={(data: any) => {
            onDeleteClick(data)
          }}
          deletionResponse={deletedUserRoleResponse}
        ></EnhancedTable>
      )
    }
  }

  const renderEmpty = () => {
    return (
      <CustomisedErrorEmpty
        title='No user roles found!'
        type='empty'
        message={allUserRolesDataResult?.message ?? ''}
      ></CustomisedErrorEmpty>
    )
  }

  const renderError = () => {
    return (
      <CustomisedErrorEmpty
        title='Error!'
        type='empty'
        message={allUserRolesDataResult?.message ?? ''}
      ></CustomisedErrorEmpty>
    )
  }

  const renderData = () => {
    if (allUserRolesDataResult?.isCompleted && !allUserRolesDataResult?.succeeded) {
      return renderError()
    }
    if (!allUserRolesDataResult?.dataArray || allUserRolesDataResult.dataArray.length <= 0) {
      return renderEmpty()
    }

    return renderDataTable()
  }

  const renderAlertDialog = () => {
    return (
      <CustomisedAlertDialog
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={handleDialogOpen}
        dialogTitle='Delete user role!'
        dialogMessage={`Are you sure you want to delete ${selectedUserRole?.role} user role?`}
        dialogButtons={[
          {
            title: 'Yes',
            onClick: () => {
              deleteUserRole()
            },
            autoFocus: true,
            color: 'error'
          },
          {
            title: 'No',
            onClick: () => {
              setIsDialogOpen(false)
              resetSelectedUserRole()
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

export default TabAllUserRoles
