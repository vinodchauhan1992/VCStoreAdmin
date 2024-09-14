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
import { FileFoldersModel } from 'src/models/FileFoldersModel'
import { FileFoldersReducer, useAppDispatch, useAppSelector } from 'src/redux/reducers'
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

const TabAllFileFolders = () => {
  const dispatch = useAppDispatch()

  // @ts-ignore
  const allFileFoldersDataResult = useAppSelector(FileFoldersReducer.selectAllFileFoldersDataResult)
  // @ts-ignore
  const deletedFileFolderResponse = useAppSelector(FileFoldersReducer.selectDeletedFileFolderResponse)

  // ** State
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
  const [selectedFileFolder, setSelectedFileFolder] = useState<FileFoldersModel | null>(null)

  const callAllFileFoldersApi = async () => {
    dispatch({ type: 'FETCH_ALL_FILE_FOLDERS' })
  }

  useEffect(() => {
    callAllFileFoldersApi()
  }, [])

  const resetSelectedFileFolder = () => {
    setSelectedFileFolder(null)
    setIsDialogOpen(false)
  }

  const deleteFileFolder = async () => {
    dispatch({ type: 'DELETE_FILE_FOLDER', payload: { fileFolderId: selectedFileFolder?.id } })
  }

  useEffect(() => {
    if (deletedFileFolderResponse?.isCompleted) {
      resetSelectedFileFolder()
      if (deletedFileFolderResponse?.succeeded) {
        dispatch(FileFoldersReducer.resetDeletedFileFolderResponse())
        callAllFileFoldersApi()
      } else {
        dispatch(FileFoldersReducer.resetDeletedFileFolderResponse())
      }
    }
  }, [deletedFileFolderResponse])

  const onDeleteClick = async (fileFolderData: FileFoldersModel) => {
    setSelectedFileFolder(fileFolderData)
    setIsDialogOpen(true)
  }

  const onEditClick = async (fileFolderData: FileFoldersModel) => {}

  const onViewClick = async (fileFolderData: FileFoldersModel) => {}

  const handleDialogOpen = () => {
    setIsDialogOpen(!isDialogOpen)
  }

  const renderDataTable = () => {
    if (allFileFoldersDataResult?.dataArray && allFileFoldersDataResult.dataArray.length > 0) {
      return (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label='table in dashboard'>
            <TableHead>
              <TableRow>
                <StyledTableCell>ID</StyledTableCell>
                <StyledTableCell>Folder Name</StyledTableCell>
                <StyledTableCell>Dates</StyledTableCell>
                <StyledTableCell>Manage</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allFileFoldersDataResult.dataArray.map((fileFolderData: FileFoldersModel) => (
                <StyledTableRow
                  hover
                  key={fileFolderData?.folderName}
                  sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}
                >
                  <StyledTableCell>{fileFolderData?.id}</StyledTableCell>
                  <StyledTableCell sx={{ py: theme => `${theme.spacing(0.5)} !important` }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>
                        {fileFolderData?.folderName}
                      </Typography>
                    </Box>
                  </StyledTableCell>
                  <StyledTableCell sx={{ py: theme => `${theme.spacing(0.5)} !important` }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>
                        {`Added On: ${convertDateIntoReadableFormat(fileFolderData?.dateAdded)}`}
                      </Typography>
                      <Typography variant='caption'>{`Modified On: ${convertDateIntoReadableFormat(
                        fileFolderData?.dateModified
                      )}`}</Typography>
                    </Box>
                  </StyledTableCell>
                  <StyledTableCell>
                    <ButtonStyled color='error' variant='outlined' onClick={() => onDeleteClick(fileFolderData)}>
                      <Typography color='error' sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>
                        Delete
                      </Typography>
                    </ButtonStyled>
                    <ButtonStyled color='info' variant='outlined' onClick={() => onEditClick(fileFolderData)}>
                      <Typography color='info' sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>
                        Edit
                      </Typography>
                    </ButtonStyled>
                    <ButtonStyled color='success' variant='outlined' onClick={() => onViewClick(fileFolderData)}>
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
        title='No user statuses found!'
        type='empty'
        message={allFileFoldersDataResult?.message ?? ''}
      ></CustomisedErrorEmpty>
    )
  }

  const renderError = () => {
    return (
      <CustomisedErrorEmpty
        title='Error!'
        type='empty'
        message={allFileFoldersDataResult?.message ?? ''}
      ></CustomisedErrorEmpty>
    )
  }

  const renderData = () => {
    if (allFileFoldersDataResult?.isCompleted && !allFileFoldersDataResult?.succeeded) {
      return renderError()
    }
    if (!allFileFoldersDataResult?.dataArray || allFileFoldersDataResult.dataArray.length <= 0) {
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
        dialogMessage={`Are you sure you want to delete ${selectedFileFolder?.folderName} user status?`}
        dialogButtons={[
          {
            title: 'Yes',
            onClick: () => {
              deleteFileFolder()
            },
            autoFocus: true,
            color: 'error'
          },
          {
            title: 'No',
            onClick: () => {
              setIsDialogOpen(false)
              resetSelectedFileFolder()
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

export default TabAllFileFolders
