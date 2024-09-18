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

  const onViewClick = async (submenuData: AdminSubmenusModel) => {
    setSelectedAdminSubmenu(submenuData)
  }

  const handleDialogOpen = () => {
    setIsDialogOpen(!isDialogOpen)
  }

  const renderDataTable = () => {
    if (allAdminSubmenusDataResult?.dataArray && allAdminSubmenusDataResult.dataArray.length > 0) {
      return (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label='table in submenu'>
            <TableHead>
              <TableRow>
                <StyledTableCell>ID</StyledTableCell>
                <StyledTableCell>Details</StyledTableCell>
                <StyledTableCell>Dates</StyledTableCell>
                <StyledTableCell>Manage</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allAdminSubmenusDataResult.dataArray.map((submenuData: AdminSubmenusModel) => (
                <StyledTableRow
                  hover
                  key={submenuData?.id}
                  sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}
                >
                  <StyledTableCell>{submenuData?.id}</StyledTableCell>
                  <StyledTableCell sx={{ py: theme => `${theme.spacing(0.5)} !important` }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>
                        {`Title: ${submenuData?.submenuTitle ?? 'N/A'}`}
                      </Typography>
                      <Typography variant='caption'>{`Priority: ${submenuData?.priority ?? 'N/A'}`}</Typography>
                      <Typography
                        variant='caption'
                        color={
                          submenuData?.status && submenuData.status.toLowerCase() === 'active'
                            ? 'success.dark'
                            : 'error.dark'
                        }
                      >{`Status: ${submenuData?.status ?? 'N/A'}`}</Typography>
                      <Typography
                        variant='caption'
                        color={submenuData?.isDeleteable ? 'success.dark' : 'error.dark'}
                      >{`Can be deleted: ${submenuData?.isDeleteable ? 'Yes' : 'No'}`}</Typography>
                      <Typography
                        variant='caption'
                        color={submenuData?.isAdminDeleteable ? 'success.dark' : 'error.dark'}
                      >{`Can be deleted by admin: ${submenuData?.isAdminDeleteable ? 'Yes' : 'No'}`}</Typography>
                    </Box>
                  </StyledTableCell>
                  <StyledTableCell sx={{ py: theme => `${theme.spacing(0.5)} !important` }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>
                        {`Added On: ${convertDateIntoReadableFormat(submenuData?.dateAdded)}`}
                      </Typography>
                      <Typography variant='caption'>{`Modified On: ${convertDateIntoReadableFormat(
                        submenuData?.dateModified
                      )}`}</Typography>
                    </Box>
                  </StyledTableCell>
                  <StyledTableCell>
                    <ButtonStyled color='error' variant='outlined' onClick={() => onDeleteClick(submenuData)}>
                      <Typography color='error' sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>
                        Delete
                      </Typography>
                    </ButtonStyled>
                    <ButtonStyled color='info' variant='outlined' onClick={() => onEditClick(submenuData)}>
                      <Typography color='info' sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>
                        Edit
                      </Typography>
                    </ButtonStyled>
                    <ButtonStyled color='success' variant='outlined' onClick={() => onViewClick(submenuData)}>
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