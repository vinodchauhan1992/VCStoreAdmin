// ** React Imports
import { useState, ElementType, ChangeEvent, useEffect } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import CardContent from '@mui/material/CardContent'
import Button, { ButtonProps } from '@mui/material/Button'
import Typography from '@mui/material/Typography'

// ** Icons Imports
import Alert from '@mui/material/Alert'
import { AlertValuesModel } from 'src/models/AlertValuesModel'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import { BrandsReducer, useAppDispatch, useAppSelector } from 'src/redux/reducers'
import { AddBrandRequestModel } from 'src/models/BrandsModel'
import Radio from '@mui/material/Radio'
import FormLabel from '@mui/material/FormLabel'
import RadioGroup from '@mui/material/RadioGroup'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'

const defaultImage = '/images/avatars/9.jpeg'

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

const TabAddBrand = () => {
  const dispatch = useAppDispatch()

  const defaultAlertValues: AlertValuesModel = {
    severity: 'info',
    message: '',
    isVisible: false
  }

  const defaultValues: AddBrandRequestModel = {
    title: '',
    description: '',
    isActive: true,
    file: null
  }

  // @ts-ignore
  const addedBrandResponse = useAppSelector(BrandsReducer.selectAddedBrandResponse)

  // ** State
  const [values, setValues] = useState<AddBrandRequestModel>(defaultValues)
  const [alertVaues, setAlertValues] = useState<AlertValuesModel>(defaultAlertValues)
  const [imageFileData, setImageFileData] = useState<string>(defaultImage)

  const onChange = (file: ChangeEvent) => {
    const reader = new FileReader()
    const { files } = file.target as HTMLInputElement

    console.log('files', files?.[0])
    if (files && files.length !== 0) {
      reader.onload = () => {
        setImageFileData(reader.result as string)
        setValues({ ...values, file: files[0] })
      }

      reader.readAsDataURL(files[0])
    }
  }

  const handleTitleChange = (prop: keyof AddBrandRequestModel) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleDescriptionChange = (prop: keyof AddBrandRequestModel) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleIsBrandActiveChange = (newValue: string) => {
    setValues({ ...values, isActive: newValue === 'yes' ? true : false })
  }

  const resetForm = () => {
    setValues(defaultValues)
    setAlertValues(defaultAlertValues)
    setImageFileData(defaultImage)
  }

  const onResetClick = () => {
    resetForm()
  }

  const onAddNewBrandClick = async () => {
    if (!values?.title || values.title === '') {
      setAlertValues({
        severity: 'error',
        message: 'Please enter brand title.',
        isVisible: true
      })
      return
    }
    if (!values?.description || values.description === '') {
      setAlertValues({
        severity: 'error',
        message: 'Please enter brand description.',
        isVisible: true
      })
      return
    }
    if (!imageFileData || imageFileData === '' || imageFileData === defaultImage) {
      setAlertValues({
        severity: 'error',
        message: 'Please select an image.',
        isVisible: true
      })
      return
    }
    const formData = new FormData()
    formData.append('title', values.title)
    formData.append('description', values.description)
    formData.append('isActive', `${values?.isActive ?? false}`)
    formData.append('file', values.file)

    dispatch({ type: 'ADD_BRAND', payload: formData })
  }

  useEffect(() => {
    if (addedBrandResponse?.isCompleted) {
      if (addedBrandResponse?.succeeded) {
        resetForm()
        dispatch(BrandsReducer.resetAddedBrandResponse())
      } else {
        dispatch(BrandsReducer.resetAddedBrandResponse())
      }
    }
  }, [addedBrandResponse])

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
            <Grid item xs={12} sx={{ marginTop: 4.8, marginBottom: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Card sx={{ maxWidth: 120, border: '2px solid ActiveBorder', marginRight: 6.25 }}>
                  <CardMedia component='img' image={imageFileData} alt='Brand Logo' />
                </Card>
                <Box>
                  <ButtonStyled component='label' variant='contained' htmlFor='brand-logo-upload-image'>
                    Upload New brand logo
                    <input
                      hidden
                      type='file'
                      onChange={onChange}
                      accept='image/png, image/jpeg'
                      id='brand-logo-upload-image'
                    />
                  </ButtonStyled>
                  <ResetButtonStyled color='error' variant='outlined' onClick={() => setImageFileData(defaultImage)}>
                    Reset
                  </ResetButtonStyled>
                  <Typography variant='body2' sx={{ marginTop: 5 }}>
                    Allowed PNG or JPEG. Max size of 800K.
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={6} sm={6}>
              <FormControl>
                <FormLabel sx={{ fontSize: '0.875rem' }}>Is brand active?</FormLabel>
                <RadioGroup
                  row
                  defaultValue={values?.isActive ? 'yes' : 'no'}
                  aria-label='Is brand active?'
                  name='account-settings-info-radio'
                  value={values?.isActive ? 'yes' : 'no'}
                >
                  <FormControlLabel
                    value='no'
                    label='No'
                    control={<Radio onClick={() => handleIsBrandActiveChange('no')} />}
                  />
                  <FormControlLabel
                    value='yes'
                    label='Yes'
                    control={<Radio onClick={() => handleIsBrandActiveChange('yes')} />}
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={6} sm={6}>
              <TextField
                fullWidth
                label='Brand title'
                placeholder='Brand title'
                value={values.title}
                onChange={handleTitleChange('title')}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                fullWidth
                label='Brand description'
                placeholder='Brand description'
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
              <ButtonStyled component='label' variant='contained' onClick={onAddNewBrandClick}>
                Add new brand
              </ButtonStyled>
              <ResetButtonStyled color='error' variant='outlined' onClick={onResetClick}>
                Reset
              </ResetButtonStyled>
            </Box>
          </Grid>
        </form>
      </CardContent>
    </div>
  )
}

export default TabAddBrand
