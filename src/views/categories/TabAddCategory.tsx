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
import { AddCategoryRequestModel } from 'src/models/CategoryModel'
import Alert from '@mui/material/Alert'
import { AlertValuesModel } from 'src/models/AlertValuesModel'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import { CategoriesReducer, useAppDispatch, useAppSelector } from 'src/redux/reducers'
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

const TabAddCategory = () => {
  const dispatch = useAppDispatch()

  const defaultAlertValues: AlertValuesModel = {
    severity: 'info',
    message: '',
    isVisible: false
  }

  const defaultValues: AddCategoryRequestModel = {
    title: '',
    description: '',
    isActive: true,
    file: null
  }

  // @ts-ignore
  const addedCategoryResponse = useAppSelector(CategoriesReducer.selectAddedCategoryResponse)

  // ** State
  const [values, setValues] = useState<AddCategoryRequestModel>(defaultValues)
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

  const handleTitleChange = (prop: keyof AddCategoryRequestModel) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleDescriptionChange = (prop: keyof AddCategoryRequestModel) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleIsCategoryActiveChange = (newValue: string) => {
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

  const onAddNewCategoryClick = async () => {
    if (!values?.title || values.title === '') {
      setAlertValues({
        severity: 'error',
        message: 'Please enter category title.',
        isVisible: true
      })
      return
    }
    if (!values?.description || values.description === '') {
      setAlertValues({
        severity: 'error',
        message: 'Please enter category description.',
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
    formData.append('isActive', `${values.isActive}`)
    formData.append('file', values.file)

    dispatch({ type: 'ADD_CATEGORY', payload: formData })
  }

  useEffect(() => {
    if (addedCategoryResponse?.isCompleted) {
      if (addedCategoryResponse?.succeeded) {
        resetForm()
        dispatch(CategoriesReducer.resetAddedCategoryResponse())
      } else {
        dispatch(CategoriesReducer.resetAddedCategoryResponse())
      }
    }
  }, [addedCategoryResponse])

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
                  <CardMedia component='img' image={imageFileData} alt='Category Image' />
                </Card>
                <Box>
                  <ButtonStyled component='label' variant='contained' htmlFor='categories-upload-image'>
                    Upload New category image
                    <input
                      hidden
                      type='file'
                      onChange={onChange}
                      accept='image/png, image/jpeg'
                      id='categories-upload-image'
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
                <FormLabel sx={{ fontSize: '0.875rem' }}>Is category active?</FormLabel>
                <RadioGroup
                  row
                  defaultValue={values?.isActive ? 'yes' : 'no'}
                  aria-label='Is category active?'
                  name='account-settings-info-radio'
                >
                  <FormControlLabel
                    value='no'
                    label='No'
                    control={<Radio onClick={() => handleIsCategoryActiveChange('no')} />}
                  />
                  <FormControlLabel
                    value='yes'
                    label='Yes'
                    control={<Radio onClick={() => handleIsCategoryActiveChange('yes')} />}
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={6} sm={6}>
              <TextField
                fullWidth
                label='Category title'
                placeholder='Category title'
                value={values.title}
                onChange={handleTitleChange('title')}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                fullWidth
                label='Category description'
                placeholder='Category description'
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
              <ButtonStyled component='label' variant='contained' onClick={onAddNewCategoryClick}>
                Add new category
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

export default TabAddCategory
