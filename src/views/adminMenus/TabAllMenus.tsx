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
import { AdminMenusReducer, LoginReducer, useAppDispatch, useAppSelector } from 'src/redux/reducers'
import { AdminMenusModel } from 'src/models/AdminMenusModel'
import { convertDateIntoReadableFormat } from 'src/utils/CommonUtils'

const ButtonStyled = styled(Button)<ButtonProps>(({ theme }) => ({
  marginRight: theme.spacing(4.5),
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    marginLeft: 0,
    textAlign: 'center',
    marginTop: theme.spacing(4)
  }
}))

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
    setSelectedAdminMenu(adminMenuData)
    setIsDialogOpen(true)
  }

  const onEditClick = async (adminMenuData: AdminMenusModel) => {
    setSelectedAdminMenu(adminMenuData)
  }

  const onViewClick = async (adminMenuData: AdminMenusModel) => {
    setSelectedAdminMenu(adminMenuData)
  }

  const handleDialogOpen = () => {
    setIsDialogOpen(!isDialogOpen)
  }

  const renderDataTable = () => {
    if (allAdminMenusDataResult?.dataArray && allAdminMenusDataResult.dataArray.length > 0) {
      return (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label='table in dashboard'>
            <TableHead>
              <TableRow>
                <StyledTableCell>ID</StyledTableCell>
                <StyledTableCell>Details</StyledTableCell>
                <StyledTableCell>Dates</StyledTableCell>
                <StyledTableCell>Manage</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allAdminMenusDataResult.dataArray.map((adminMenuData: AdminMenusModel) => (
                <StyledTableRow
                  hover
                  key={adminMenuData?.id}
                  sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}
                >
                  <StyledTableCell>{adminMenuData?.id}</StyledTableCell>
                  <StyledTableCell sx={{ py: theme => `${theme.spacing(0.5)} !important` }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>
                        {`Title: ${adminMenuData?.menuTitle ?? 'N/A'}`}
                      </Typography>
                      <Typography
                        variant='caption'
                        color={
                          adminMenuData?.adminMenuStatus && adminMenuData.adminMenuStatus.toLowerCase() === 'active'
                            ? 'success.dark'
                            : 'error.dark'
                        }
                      >{`Status: ${adminMenuData?.adminMenuStatus ?? 'N/A'}`}</Typography>
                      <Typography
                        variant='caption'
                        color={adminMenuData?.isDeleteable ? 'success.dark' : 'error.dark'}
                      >{`Can be deleted: ${adminMenuData?.isDeleteable ? 'Yes' : 'No'}`}</Typography>
                      <Typography
                        variant='caption'
                        color={adminMenuData?.isAdminDeleteable ? 'success.dark' : 'error.dark'}
                      >{`Can be deleted by admin: ${adminMenuData?.isAdminDeleteable ? 'Yes' : 'No'}`}</Typography>
                    </Box>
                  </StyledTableCell>
                  <StyledTableCell sx={{ py: theme => `${theme.spacing(0.5)} !important` }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>
                        {`Added On: ${convertDateIntoReadableFormat(adminMenuData?.dateAdded)}`}
                      </Typography>
                      <Typography variant='caption'>{`Modified On: ${convertDateIntoReadableFormat(
                        adminMenuData?.dateModified
                      )}`}</Typography>
                    </Box>
                  </StyledTableCell>
                  <StyledTableCell>
                    <ButtonStyled color='error' variant='outlined' onClick={() => onDeleteClick(adminMenuData)}>
                      <Typography color='error' sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>
                        Delete
                      </Typography>
                    </ButtonStyled>
                    <ButtonStyled color='info' variant='outlined' onClick={() => onEditClick(adminMenuData)}>
                      <Typography color='info' sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>
                        Edit
                      </Typography>
                    </ButtonStyled>
                    <ButtonStyled color='success' variant='outlined' onClick={() => onViewClick(adminMenuData)}>
                      <Typography color='success' sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>
                        View
                      </Typography>
                    </ButtonStyled>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
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
