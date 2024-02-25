// ** React Imports
import { useState, ElementType, ChangeEvent } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import CardContent from '@mui/material/CardContent'
import Button, { ButtonProps } from '@mui/material/Button'

// ** Icons Imports
import { httpPostRequest } from 'src/services/AxiosApi'
import apiPathsConfig from 'src/configs/apiPathsConfig'
import CustomisedLoader from 'src/@core/components/customised-loader/CustomisedLoader'
import { FileFoldersModel } from 'src/models/FileFoldersModel'
import { AlertValuesModel } from 'src/models/AlertValuesModel'
import Alert from '@mui/material/Alert'

const ButtonStyled = styled(Button)<ButtonProps & { component?: ElementType; htmlFor?: string }>(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    textAlign: 'center'
  }
}))

const ResetButtonStyled = styled(Button)<ButtonProps>(({ theme }) => ({
  marginLeft: theme.spacing(4.5),
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    marginLeft: 0,
    textAlign: 'center',
    marginTop: theme.spacing(4)
  }
}))

const TabAddFileFolder = () => {
  const defaultAlertValues: AlertValuesModel = {
    severity: 'info',
    message: '',
    isVisible: false
  }

  // ** State
  const [values, setValues] = useState<FileFoldersModel>({
    folderName: '',
    description: ''
  })
  const [isLoaderVisible, setIsLoaderVisible] = useState<boolean>(false)
  const [alertVaues, setAlertValues] = useState<AlertValuesModel>(defaultAlertValues)

  const handleFolderNameChange = (prop: keyof FileFoldersModel) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleDescriptionChange = (prop: keyof FileFoldersModel) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const resetForm = () => {
    setValues({
      folderName: '',
      description: ''
    })
    setAlertValues(defaultAlertValues)
  }

  const onResetClick = () => {
    resetForm()
  }

  const onAddNewFileFolderClick = async () => {
    if (!values?.folderName || values.folderName === '') {
      setAlertValues({
        severity: 'error',
        message: 'Please enter folder name.',
        isVisible: true
      })

      return
    }
    if (!values?.description || values.description === '') {
      setAlertValues({
        severity: 'error',
        message: 'Please enter description.',
        isVisible: true
      })

      return
    }
    setIsLoaderVisible(true)
    const response = await httpPostRequest({ apiUrlPath: apiPathsConfig.addFileFolderApiPath, jsonBody: values })
    if (response.isSucceded) {
      resetForm()
    }
    setIsLoaderVisible(false)
  }

  const renderAlert = () => {
    if (alertVaues?.isVisible) {
      return (
        <Grid container spacing={7}>
          <Grid item xs={12} sm={12} sx={{ marginBottom: 4.8 }}>
            <Alert severity={alertVaues.severity} onClose={() => setAlertValues(defaultAlertValues)}>
              {alertVaues.message}
            </Alert>
          </Grid>
        </Grid>
      )
    }

    return null
  }

  return (
    <div>
      <CardContent>
        {renderAlert()}
        <form>
          <Grid container spacing={7}>
            <Grid item xs={12} sm={12}>
              <TextField
                fullWidth
                label='Folder name'
                placeholder='Folder name'
                value={values.folderName}
                onChange={handleFolderNameChange('folderName')}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                fullWidth
                label='File folder description'
                placeholder='File folder description'
                value={values.description}
                onChange={handleDescriptionChange('description')}
                multiline
                minRows={3}
                sx={{ '& .MuiOutlinedInput-root': { alignItems: 'baseline' } }}
              />
            </Grid>
          </Grid>
          <Grid item xs={12} sx={{ marginTop: 4.8, marginBottom: 3 }}>
            <Box>
              <ButtonStyled component='label' variant='contained' onClick={onAddNewFileFolderClick}>
                Add new file folder
              </ButtonStyled>
              <ResetButtonStyled color='error' variant='outlined' onClick={onResetClick}>
                Reset
              </ResetButtonStyled>
            </Box>
          </Grid>
        </form>
        <CustomisedLoader visible={isLoaderVisible} />
      </CardContent>
    </div>
  )
}

export default TabAddFileFolder
