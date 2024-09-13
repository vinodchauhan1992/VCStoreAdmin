// ** React Imports
import { useEffect, useState } from 'react'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Grid from '@mui/material/Grid'
import CustomisedErrorEmpty from 'src/@core/components/customised-error-empty/CustomisedErrorEmpty'
import { FileFoldersModel } from 'src/models/FileFoldersModel'
import { FileFoldersReducer, useAppDispatch, useAppSelector } from 'src/redux/reducers'

const TabFileFolderByFolderName = () => {
  const dispatch = useAppDispatch()

  // @ts-ignore
  const allFileFoldersDataResult = useAppSelector(FileFoldersReducer.selectAllFileFoldersDataResult)

  // ** States
  const [selectedFileFolderData, setSelectedFileFolderData] = useState<FileFoldersModel | null>(null)

  const callAllFileFoldersApi = async () => {
    dispatch({ type: 'FETCH_ALL_FILE_FOLDERS' })
  }

  useEffect(() => {
    callAllFileFoldersApi()
  }, [])

  const renderDetailsFields = () => {
    return (
      <>
        <Grid item xs={12} sm={6}>
          <TextField
            disabled
            fullWidth
            label='File Folder ID'
            placeholder='File Folder ID'
            value={selectedFileFolderData?.id ?? ''}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            disabled
            fullWidth
            label='File Folder added on'
            placeholder='File Folder added on'
            value={selectedFileFolderData?.dateAdded ?? 'N/A'}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            disabled
            fullWidth
            label='File Folder updated on'
            placeholder='File Folder updated on'
            value={selectedFileFolderData?.dateModified ?? 'N/A'}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            disabled
            fullWidth
            label='File Folder description'
            placeholder='File Folder description'
            value={selectedFileFolderData?.description ?? 'N/A'}
            multiline
            minRows={3}
            sx={{ '& .MuiOutlinedInput-root': { alignItems: 'baseline' } }}
          />
        </Grid>
      </>
    )
  }

  const renderEmpty = () => {
    return (
      <CustomisedErrorEmpty
        title='Select file folder name!'
        type='empty'
        message='Please select a file folder name from drop down.'
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
    if (!selectedFileFolderData) {
      return renderEmpty()
    }

    return renderDetailsFields()
  }

  return (
    <div>
      <CardContent>
        <form>
          <Grid container spacing={7}>
            <Grid item xs={12} sm={selectedFileFolderData ? 6 : 12}>
              <FormControl fullWidth>
                <InputLabel>User role</InputLabel>
                <Select label='User role'>
                  {allFileFoldersDataResult?.dataArray?.map(fileFolder => {
                    return (
                      <MenuItem
                        value={fileFolder?.folderName ?? ''}
                        key={`${fileFolder.id}`}
                        onClick={() => {
                          setSelectedFileFolderData(fileFolder)
                        }}
                      >
                        {fileFolder.folderName}
                      </MenuItem>
                    )
                  })}
                </Select>
              </FormControl>
            </Grid>

            {renderData()}
          </Grid>
        </form>
      </CardContent>
    </div>
  )
}
export default TabFileFolderByFolderName
