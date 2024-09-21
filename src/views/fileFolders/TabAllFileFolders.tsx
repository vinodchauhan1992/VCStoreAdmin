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

  const handleDialogOpen = () => {
    setIsDialogOpen(!isDialogOpen)
  }

  const renderDataTable = () => {
    if (allFileFoldersDataResult?.dataArray && allFileFoldersDataResult.dataArray.length > 0) {
      return (
        <EnhancedTable
          tableDataArray={allFileFoldersDataResult.dataArray}
          onDeleteClick={(data: any) => onDeleteClick(data)}
          deletionResponse={deletedFileFolderResponse}
        ></EnhancedTable>
      )
    }
  }

  const renderEmpty = () => {
    return (
      <CustomisedErrorEmpty
        title='No file folders found!'
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
        dialogTitle='Delete file folder!'
        dialogMessage={`Are you sure you want to delete ${selectedFileFolder?.folderName} file folder?`}
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
