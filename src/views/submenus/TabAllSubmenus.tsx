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
import {
  AdminMenusReducer,
  AdminSubmenusReducer,
  LoginReducer,
  useAppDispatch,
  useAppSelector
} from 'src/redux/reducers'
import { AdminMenusModel } from 'src/models/AdminMenusModel'
import { convertDateIntoReadableFormat } from 'src/utils/CommonUtils'
import { AdminSubmenusModel } from 'src/models/AdminSubmenusModel'
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

const TabAllSubmenus = () => {
  // ** State
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
  const [selectedAdminSubmenu, setSelectedAdminSubmenu] = useState<AdminSubmenusModel | null>(null)

  const dispatch = useAppDispatch()

  // @ts-ignore
  const allAdminSubmenusDataResult = useAppSelector(AdminSubmenusReducer.selectAllAdminSubmenusDataResult)
  // @ts-ignore
  const deletedAdminSubmenuResponse = useAppSelector(AdminSubmenusReducer.selectDeletedAdminSubmenuResponse)
  // @ts-ignore
  const loggedInUserRole = useAppSelector(LoginReducer.selectLoggedInUserRole)

  const callAllSubmenusApi = () => {
    dispatch({ type: 'FETCH_ALL_ADMIN_SUBMENUS' })
  }

  useEffect(() => {
    callAllSubmenusApi()
  }, [])

  const resetSelectedAdminMenu = () => {
    setSelectedAdminSubmenu(null)
    setIsDialogOpen(false)
  }

  useEffect(() => {
    if (deletedAdminSubmenuResponse?.isCompleted) {
      resetSelectedAdminMenu()
      if (deletedAdminSubmenuResponse?.succeeded) {
        dispatch(AdminSubmenusReducer.resetDeletedAdminSubmenuResponse())
        callAllSubmenusApi()
      } else {
        dispatch(AdminSubmenusReducer.resetDeletedAdminSubmenuResponse())
      }
    }
  }, [deletedAdminSubmenuResponse])

  const deleteAdminSubmenu = async () => {
    dispatch({
      type: 'DELETE_ADMIN_SUBMENU',
      payload: {
        adminSubmenuId: selectedAdminSubmenu?.id,
        panelType: loggedInUserRole && loggedInUserRole?.toLowerCase() === 'administrator' ? 'admin_panel' : 'others'
      }
    })
  }

  const onDeleteClick = async (submenuData: AdminSubmenusModel) => {
    setSelectedAdminSubmenu(submenuData)
    setIsDialogOpen(true)
  }

  const onEditClick = async (submenuData: AdminSubmenusModel) => {
    setSelectedAdminSubmenu(submenuData)
  }

  const handleDialogOpen = () => {
    setIsDialogOpen(!isDialogOpen)
  }

  const renderDataTable = () => {
    if (allAdminSubmenusDataResult?.dataArray && allAdminSubmenusDataResult.dataArray.length > 0) {
      return (
        <EnhancedTable
          tableDataArray={allAdminSubmenusDataResult.dataArray}
          onDeleteClick={(data: any) => onDeleteClick(data)}
          deletionResponse={deletedAdminSubmenuResponse}
        ></EnhancedTable>
      )
    }
  }

  const renderEmpty = () => {
    return (
      <CustomisedErrorEmpty
        title='No submenus found!'
        type='empty'
        message={allAdminSubmenusDataResult?.message ?? ''}
      ></CustomisedErrorEmpty>
    )
  }

  const renderError = () => {
    return (
      <CustomisedErrorEmpty
        title='Error!'
        type='empty'
        message={allAdminSubmenusDataResult?.message ?? ''}
      ></CustomisedErrorEmpty>
    )
  }

  const renderData = () => {
    if (allAdminSubmenusDataResult?.isCompleted && !allAdminSubmenusDataResult?.succeeded) {
      return renderError()
    }
    if (!allAdminSubmenusDataResult?.dataArray || allAdminSubmenusDataResult.dataArray.length <= 0) {
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
        dialogMessage={`Are you sure you want to delete ${selectedAdminSubmenu?.submenuTitle} submenu?`}
        dialogButtons={[
          {
            title: 'Yes',
            onClick: () => {
              deleteAdminSubmenu()
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

export default TabAllSubmenus
