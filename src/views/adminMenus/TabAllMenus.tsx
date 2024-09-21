// ** React Imports
import { useState, useEffect } from 'react'

// ** MUI Imports
import CardContent from '@mui/material/CardContent'
import CustomisedErrorEmpty from 'src/@core/components/customised-error-empty/CustomisedErrorEmpty'
import CustomisedAlertDialog from 'src/@core/components/customised-alert-dialog/CustomisedAlertDialog'
import { AdminMenusReducer, LoginReducer, useAppDispatch, useAppSelector } from 'src/redux/reducers'
import { AdminMenusModel } from 'src/models/AdminMenusModel'
import EnhancedTable from 'src/@core/components/enhanced-table-view/EnhancedTable'

const TabAllMenus = () => {
  // ** State
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
  const [selectedAdminMenu, setSelectedAdminMenu] = useState<AdminMenusModel | null>(null)

  const dispatch = useAppDispatch()

  // @ts-ignore
  const allAdminMenusDataResult = useAppSelector(AdminMenusReducer.selectAllAdminMenusDataResult)
  // @ts-ignore
  const deletedAdminMenuResponse = useAppSelector(AdminMenusReducer.selectDeletedAdminMenuResponse)
  // @ts-ignore
  const loggedInUserRole = useAppSelector(LoginReducer.selectLoggedInUserRole)

  const callAllMenusApi = () => {
    dispatch({ type: 'FETCH_ALL_ADMIN_MENUS' })
  }

  useEffect(() => {
    callAllMenusApi()
  }, [])

  const resetSelectedAdminMenu = () => {
    setSelectedAdminMenu(null)
    setIsDialogOpen(false)
  }

  useEffect(() => {
    if (deletedAdminMenuResponse?.isCompleted) {
      resetSelectedAdminMenu()
      if (deletedAdminMenuResponse?.succeeded) {
        dispatch(AdminMenusReducer.resetDeletedAdminMenuResponse())
        callAllMenusApi()
      } else {
        dispatch(AdminMenusReducer.resetDeletedAdminMenuResponse())
      }
    }
  }, [deletedAdminMenuResponse])

  const deleteAdminMenu = async () => {
    dispatch({
      type: 'DELETE_ADMIN_MENU',
      payload: {
        adminMenuId: selectedAdminMenu?.id,
        panelType: loggedInUserRole && loggedInUserRole?.toLowerCase() === 'administrator' ? 'admin_panel' : 'others'
      }
    })
  }

  const onDeleteClick = async (adminMenuData: AdminMenusModel) => {
    if (adminMenuData) {
      setSelectedAdminMenu(adminMenuData)
      setIsDialogOpen(true)
    }
  }

  const onEditClick = async (adminMenuData: AdminMenusModel) => {
    if (adminMenuData) {
      setSelectedAdminMenu(adminMenuData)
    }
  }

  const handleDialogOpen = () => {
    setIsDialogOpen(!isDialogOpen)
  }

  const renderDataTable = () => {
    if (allAdminMenusDataResult?.dataArray && allAdminMenusDataResult.dataArray.length > 0) {
      return (
        <EnhancedTable
          tableDataArray={allAdminMenusDataResult.dataArray}
          onDeleteClick={(data: any) => onDeleteClick(data)}
          onEditClick={(data: any) => onEditClick(data)}
          deletionResponse={deletedAdminMenuResponse}
        ></EnhancedTable>
      )
    }
  }

  const renderEmpty = () => {
    return (
      <CustomisedErrorEmpty
        title='No admin menus found!'
        type='empty'
        message={allAdminMenusDataResult?.message ?? ''}
      ></CustomisedErrorEmpty>
    )
  }

  const renderError = () => {
    return (
      <CustomisedErrorEmpty
        title='Error!'
        type='empty'
        message={allAdminMenusDataResult?.message ?? ''}
      ></CustomisedErrorEmpty>
    )
  }

  const renderData = () => {
    if (allAdminMenusDataResult?.isCompleted && !allAdminMenusDataResult?.succeeded) {
      return renderError()
    }
    if (!allAdminMenusDataResult?.dataArray || allAdminMenusDataResult.dataArray.length <= 0) {
      return renderEmpty()
    }

    return renderDataTable()
  }

  const renderAlertDialog = () => {
    return (
      <CustomisedAlertDialog
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={handleDialogOpen}
        dialogTitle='Delete admin menu!'
        dialogMessage={`Are you sure you want to delete ${selectedAdminMenu?.menuTitle} menu?`}
        dialogButtons={[
          {
            title: 'Yes',
            onClick: () => {
              deleteAdminMenu()
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

export default TabAllMenus
