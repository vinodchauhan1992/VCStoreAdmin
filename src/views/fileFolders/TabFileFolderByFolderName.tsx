// ** React Imports
import { useEffect, useState } from 'react'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Grid from '@mui/material/Grid'
import { httpGetRequest } from 'src/services/AxiosApi'
import apiPathsConfig from 'src/configs/apiPathsConfig'
import CustomisedErrorEmpty from 'src/@core/components/customised-error-empty/CustomisedErrorEmpty'
import CustomisedLoader from 'src/@core/components/customised-loader/CustomisedLoader'
import { FileFoldersModel } from 'src/models/FileFoldersModel'

const TabFileFolderByFolderName = () => {
  // ** States
  const [allFileFoldersData, setAllFileFoldersData] = useState<FileFoldersModel[]>([])
  const [selectedFileFolderData, setSelectedFileFolderData] = useState<FileFoldersModel | null>(null)
  const [isErrored, setIsErrored] = useState<boolean>(false)
  const [message, setMessage] = useState<string | null>(null)
  const [isLoaderVisible, setIsLoaderVisible] = useState<boolean>(false)

  const callAllFileFoldersApi = async () => {
    setIsLoaderVisible(true)
    const response = await httpGetRequest({ apiUrlPath: apiPathsConfig.getAllFileFoldersApiPath })
    if (response.isSucceded) {
      setAllFileFoldersData(response?.responseData?.data ?? [])
      setMessage(response?.responseData?.message ?? null)
    } else {
      setIsErrored(true)
      setMessage(response?.responseData?.message ?? null)
    }
    setIsLoaderVisible(false)
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
    return <CustomisedErrorEmpty title='Error!' type='empty' message={message ?? ''}></CustomisedErrorEmpty>
  }

  const renderData = () => {
    if (isErrored) {
      return renderError()
    }
    if (!selectedFileFolderData) {
      return renderEmpty()
    }

    return renderDetailsFields()
  }

  return (
    <div>
      <CustomisedLoader visible={isLoaderVisible} />
      <CardContent>
        <form>
          <Grid container spacing={7}>
            <Grid item xs={12} sm={selectedFileFolderData ? 6 : 12}>
              <FormControl fullWidth>
                <InputLabel>User role</InputLabel>
                <Select label='User role'>
                  {allFileFoldersData?.map(fileFolder => {
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
