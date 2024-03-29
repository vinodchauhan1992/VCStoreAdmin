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
import CustomisedLoader from 'src/@core/components/customised-loader/CustomisedLoader'
import { UserStatusModel } from 'src/models/UserStatusModel'

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
  // ** State
  const [allUserStatuses, setAllUserStatusesData] = useState<UserStatusModel[]>([])
  const [isErrored, setIsErrored] = useState<boolean>(false)
  const [message, setMessage] = useState<string | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
  const [selectedUserStatus, setSelectedUserStatus] = useState<UserStatusModel | null>(null)
  const [isLoaderVisible, setIsLoaderVisible] = useState<boolean>(false)

  const callAllUserStatusesApi = async () => {
    setIsLoaderVisible(true)
    const response = await httpGetRequest({ apiUrlPath: apiPathsConfig.getAllUserStatusesApiPath })
    if (response.isSucceded) {
      setAllUserStatusesData(response?.responseData?.data ?? [])
      setMessage(response?.responseData?.message ?? null)
    } else {
      setIsErrored(true)
      setMessage(response?.responseData?.message ?? null)
    }
    setIsLoaderVisible(false)
  }

  useEffect(() => {
    callAllUserStatusesApi()
  }, [])

  const resetSelectedUserStatus = () => {
    setSelectedUserStatus(null)
    setIsDialogOpen(false)
  }

  const deleteUserStatus = async () => {
    resetSelectedUserStatus()
    setIsLoaderVisible(true)
    const response = await httpDeleteRequest({
      apiUrlPath: `${apiPathsConfig.deleteUserStatusApiPath}/${selectedUserStatus?.id}`
    })
    if (response.isSucceded) {
      await callAllUserStatusesApi()
    }
    setIsLoaderVisible(false)
  }

  const onDeleteClick = async (userStatusData: UserStatusModel) => {
    setSelectedUserStatus(userStatusData)
    setIsDialogOpen(true)
  }

  const onEditClick = async (userStatusData: UserStatusModel) => {}

  const onViewClick = async (userStatusData: UserStatusModel) => {}

  const handleDialogOpen = () => {
    setIsDialogOpen(!isDialogOpen)
  }

  const renderDataTable = () => {
    if (allUserStatuses && allUserStatuses.length > 0) {
      return (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label='table in dashboard'>
            <TableHead>
              <TableRow>
                <StyledTableCell>ID</StyledTableCell>
                <StyledTableCell>Status</StyledTableCell>
                <StyledTableCell>Dates</StyledTableCell>
                <StyledTableCell>Manage</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allUserStatuses.map((userStatusData: UserStatusModel) => (
                <StyledTableRow
                  hover
                  key={userStatusData?.status}
                  sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}
                >
                  <StyledTableCell>{userStatusData?.id}</StyledTableCell>
                  <StyledTableCell sx={{ py: theme => `${theme.spacing(0.5)} !important` }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>
                        {userStatusData?.status}
                      </Typography>
                    </Box>
                  </StyledTableCell>
                  <StyledTableCell sx={{ py: theme => `${theme.spacing(0.5)} !important` }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>
                        {`Added On: ${userStatusData?.dateAdded ?? 'N/A'}`}
                      </Typography>
                      <Typography variant='caption'>{`Modified On: ${
                        userStatusData?.dateModified ?? 'N/A'
                      }`}</Typography>
                    </Box>
                  </StyledTableCell>
                  <StyledTableCell>
                    <ButtonStyled color='error' variant='outlined' onClick={() => onDeleteClick(userStatusData)}>
                      <Typography color='error' sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>
                        Delete
                      </Typography>
                    </ButtonStyled>
                    <ButtonStyled color='info' variant='outlined' onClick={() => onEditClick(userStatusData)}>
                      <Typography color='info' sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>
                        Edit
                      </Typography>
                    </ButtonStyled>
                    <ButtonStyled color='success' variant='outlined' onClick={() => onViewClick(userStatusData)}>
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
      <CustomisedErrorEmpty title='No user statuses found!' type='empty' message={message ?? ''}></CustomisedErrorEmpty>
    )
  }

  const renderError = () => {
    return <CustomisedErrorEmpty title='Error!' type='empty' message={message ?? ''}></CustomisedErrorEmpty>
  }

  const renderData = () => {
    if (isErrored) {
      return renderError()
    }
    if (!allUserStatuses || allUserStatuses.length <= 0) {
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
      <CustomisedLoader visible={isLoaderVisible} />
      <CardContent>
        {renderAlertDialog()}
        {renderData()}
      </CardContent>
    </div>
  )
}

export default TabAllUserStatuses
