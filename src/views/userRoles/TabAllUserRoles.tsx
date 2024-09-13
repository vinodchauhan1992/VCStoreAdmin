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
import apiPathsConfig from '../../configs/apiPathsConfig'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { httpDeleteRequest, httpGetRequest } from 'src/services/AxiosApi'
import { StyledTableCell } from 'src/@core/components/customised-table/styled-table-cell/StyledTableCell'
import { StyledTableRow } from 'src/@core/components/customised-table/styled-table-row/StyledTableRow'
import { styled } from '@mui/material/styles'
import CustomisedErrorEmpty from 'src/@core/components/customised-error-empty/CustomisedErrorEmpty'
import CustomisedAlertDialog from 'src/@core/components/customised-alert-dialog/CustomisedAlertDialog'
import { UserRoleModel } from 'src/models/UserRoleModel'
import { UserRolesReducer, useAppDispatch, useAppSelector } from 'src/redux/reducers'

const ButtonStyled = styled(Button)<ButtonProps>(({ theme }) => ({
  marginRight: theme.spacing(4.5),
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    marginLeft: 0,
    textAlign: 'center',
    marginTop: theme.spacing(4)
  }
}))

const TabAllUserRoles = () => {
  // ** State
  const [allUserRoles, setAllUserRolesData] = useState<UserRoleModel[]>([])
  const [isErrored, setIsErrored] = useState<boolean>(false)
  const [message, setMessage] = useState<string | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
  const [selectedUserRole, setSelectedUserRole] = useState<UserRoleModel | null>(null)
  const [isLoaderVisible, setIsLoaderVisible] = useState<boolean>(false)

  const dispatch = useAppDispatch()

  // @ts-ignore
  const allUserRolesDataResult = useAppSelector(UserRolesReducer.selectAllUserRolesDataResult)

  useEffect(() => {
    dispatch({ type: 'FETCH_ALL_USER_ROLES' })
  }, [])

  const resetSelectedUserRole = () => {
    setSelectedUserRole(null)
    setIsDialogOpen(false)
  }

  const deleteUserRole = async () => {
    resetSelectedUserRole()
    setIsLoaderVisible(true)
    const response = await httpDeleteRequest({
      apiUrlPath: `${apiPathsConfig.deleteUserRoleApiPath}/${selectedUserRole?.id}`
    })
    if (response.isSucceded) {
      dispatch({ type: 'FETCH_ALL_USER_ROLES' })
    }
    setIsLoaderVisible(false)
  }

  const onDeleteClick = async (userRoleData: UserRoleModel) => {
    setSelectedUserRole(userRoleData)
    setIsDialogOpen(true)
  }

  const onEditClick = async (userRoleData: UserRoleModel) => {}

  const onViewClick = async (userRoleData: UserRoleModel) => {}

  const handleDialogOpen = () => {
    setIsDialogOpen(!isDialogOpen)
  }

  const renderDataTable = () => {
    if (allUserRolesDataResult?.dataArray && allUserRolesDataResult.dataArray.length > 0) {
      return (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label='table in dashboard'>
            <TableHead>
              <TableRow>
                <StyledTableCell>ID</StyledTableCell>
                <StyledTableCell>Role</StyledTableCell>
                <StyledTableCell>Dates</StyledTableCell>
                <StyledTableCell>Manage</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allUserRolesDataResult.dataArray.map((userRoleData: UserRoleModel) => (
                <StyledTableRow
                  hover
                  key={userRoleData?.role}
                  sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}
                >
                  <StyledTableCell>{userRoleData?.id}</StyledTableCell>
                  <StyledTableCell sx={{ py: theme => `${theme.spacing(0.5)} !important` }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>
                        {userRoleData?.role}
                      </Typography>
                    </Box>
                  </StyledTableCell>
                  <StyledTableCell sx={{ py: theme => `${theme.spacing(0.5)} !important` }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>
                        {`Added On: ${userRoleData?.dateAdded ?? 'N/A'}`}
                      </Typography>
                      <Typography variant='caption'>{`Modified On: ${userRoleData?.dateModified ?? 'N/A'}`}</Typography>
                    </Box>
                  </StyledTableCell>
                  <StyledTableCell>
                    <ButtonStyled color='error' variant='outlined' onClick={() => onDeleteClick(userRoleData)}>
                      <Typography color='error' sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>
                        Delete
                      </Typography>
                    </ButtonStyled>
                    <ButtonStyled color='info' variant='outlined' onClick={() => onEditClick(userRoleData)}>
                      <Typography color='info' sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>
                        Edit
                      </Typography>
                    </ButtonStyled>
                    <ButtonStyled color='success' variant='outlined' onClick={() => onViewClick(userRoleData)}>
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
      <CustomisedErrorEmpty title='No user roles found!' type='empty' message={message ?? ''}></CustomisedErrorEmpty>
    )
  }

  const renderError = () => {
    return <CustomisedErrorEmpty title='Error!' type='empty' message={message ?? ''}></CustomisedErrorEmpty>
  }

  const renderData = () => {
    if (isErrored) {
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
