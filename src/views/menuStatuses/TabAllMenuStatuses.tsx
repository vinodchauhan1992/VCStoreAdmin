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

  const onViewClick = async (adminMenuStatusData: AdminMenuStatusesModel) => {
    setSelectedAdminMenuStatus(adminMenuStatusData)
  }

  const handleDialogOpen = () => {
    setIsDialogOpen(!isDialogOpen)
  }

  const renderDataTable = () => {
    if (allAdminMenuStatusesDataResult?.dataArray && allAdminMenuStatusesDataResult.dataArray.length > 0) {
      return (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label='table in dashboard'>
            <TableHead>
              <TableRow>
                <StyledTableCell>ID</StyledTableCell>
                <StyledTableCell>Menu Status Title</StyledTableCell>
                <StyledTableCell>Dates</StyledTableCell>
                <StyledTableCell>Manage</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allAdminMenuStatusesDataResult.dataArray.map((adminMenuStatusData: AdminMenuStatusesModel) => (
                <StyledTableRow
                  hover
                  key={adminMenuStatusData?.id}
                  sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}
                >
                  <StyledTableCell>{adminMenuStatusData?.id}</StyledTableCell>
                  <StyledTableCell sx={{ py: theme => `${theme.spacing(0.5)} !important` }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>
                        {`${adminMenuStatusData?.menuStatusTitle ?? 'N/A'}`}
                      </Typography>
                    </Box>
                  </StyledTableCell>
                  <StyledTableCell sx={{ py: theme => `${theme.spacing(0.5)} !important` }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>
                        {`Added On: ${convertDateIntoReadableFormat(adminMenuStatusData?.dateAdded)}`}
                      </Typography>
                      <Typography variant='caption'>{`Modified On: ${convertDateIntoReadableFormat(
                        adminMenuStatusData?.dateModified
                      )}`}</Typography>
                    </Box>
                  </StyledTableCell>
                  <StyledTableCell>
                    <ButtonStyled color='error' variant='outlined' onClick={() => onDeleteClick(adminMenuStatusData)}>
                      <Typography color='error' sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>
                        Delete
                      </Typography>
                    </ButtonStyled>
                    <ButtonStyled color='info' variant='outlined' onClick={() => onEditClick(adminMenuStatusData)}>
                      <Typography color='info' sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>
                        Edit
                      </Typography>
                    </ButtonStyled>
                    <ButtonStyled color='success' variant='outlined' onClick={() => onViewClick(adminMenuStatusData)}>
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
