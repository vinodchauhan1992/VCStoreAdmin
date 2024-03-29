import { ElementType, forwardRef, useEffect, useState, ChangeEvent } from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Slide from '@mui/material/Slide'
import { TransitionProps } from '@mui/material/transitions'
import TextField from '@mui/material/TextField'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import { CategoryModel } from 'src/models/CategoryModel'
import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import { ButtonProps } from '@mui/material/Button'
import { AlertValuesModel } from 'src/models/AlertValuesModel'
import CustomisedLoader from 'src/@core/components/customised-loader/CustomisedLoader'
import { httpMultipartUpdateRequest } from 'src/services/AxiosApi'
import apiPathsConfig from 'src/configs/apiPathsConfig'
import Alert from '@mui/material/Alert'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'

interface Props {
  selectedCategoryData?: CategoryModel | null
  openEditCategory?: boolean | null
  onCloseModal?: () => void
  setOpenEditCategory?: (openEditCategory: boolean) => void
  setSelectedCategory: (selectedCategoryData: CategoryModel) => void
}

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

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction='up' ref={ref} {...props} />
})

const EditCategory = (props: Props) => {
  const {
    selectedCategoryData,
    openEditCategory = false,
    onCloseModal,
    setOpenEditCategory,
    setSelectedCategory
  } = props

  const defaultAlertValues: AlertValuesModel = {
    severity: 'info',
    message: '',
    isVisible: false
  }

  const defaultValues: CategoryModel = {
    title: '',
    description: '',
    imageData: null,
    id: '',
    code: '',
    dateAdded: new Date()
  }

  // ** State
  const [values, setValues] = useState<CategoryModel>(defaultValues)
  const [alertVaues, setAlertValues] = useState<AlertValuesModel>(defaultAlertValues)
  const [isLoaderVisible, setIsLoaderVisible] = useState<boolean>(false)
  const [imageFileData, setImageFileData] = useState<string>('/images/avatars/9.jpeg')
  const [file, setFile] = useState<any>(null)

  const resetFile = () => {
    setFile(null)
  }

  const resetImage = () => {
    if (selectedCategoryData?.imageData?.imageUrl && selectedCategoryData.imageData.imageUrl !== '') {
      setImageFileData(selectedCategoryData.imageData.imageUrl)
    } else {
      setImageFileData('/images/avatars/9.jpeg')
    }
  }

  const resetForm = () => {
    setValues({
      title: selectedCategoryData?.title ?? '',
      description: selectedCategoryData?.description ?? '',
      imageData: selectedCategoryData?.imageData ?? null,
      id: selectedCategoryData?.id ?? '',
      code: selectedCategoryData?.code ?? '',
      dateAdded: selectedCategoryData?.dateAdded,
      dateModified: selectedCategoryData?.dateModified
    })
    resetImage()
    resetFile()
    setAlertValues(defaultAlertValues)
  }

  useEffect(() => {
    if (selectedCategoryData) {
      resetForm()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategoryData])

  const onChange = (file: ChangeEvent) => {
    const reader = new FileReader()
    const { files } = file.target as HTMLInputElement

    if (files && files.length !== 0) {
      reader.onload = () => {
        setImageFileData(reader.result as string)
        setFile(files[0])
      }

      reader.readAsDataURL(files[0])
    }
  }

  const onClose = () => {
    if (onCloseModal) {
      onCloseModal()
    }

    setOpenEditCategory?.(false)
  }

  const handleTitleChange = (prop: keyof CategoryModel) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleDescriptionChange = (prop: keyof CategoryModel) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const renderDetailsFields = () => {
    return (
      <>
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
              <ResetButtonStyled color='error' variant='outlined' onClick={() => resetImage()}>
                Reset
              </ResetButtonStyled>
              <Typography variant='body2' sx={{ marginTop: 5 }}>
                Allowed PNG or JPEG. Max size of 800K.
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField disabled fullWidth label='Category id' placeholder='Category id' value={values?.id ?? ''} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label='Category title'
            placeholder='Category title'
            value={values?.title ?? ''}
            onChange={handleTitleChange('title')}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField disabled fullWidth label='Category code' placeholder='Category code' value={values?.code ?? ''} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            disabled
            fullWidth
            label='Category added on'
            placeholder='Category added on'
            value={values?.dateAdded ?? 'N/A'}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            disabled
            fullWidth
            label='Category updated on'
            placeholder='Category updated on'
            value={values?.dateModified ?? 'N/A'}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            fullWidth
            label='Category description'
            placeholder='Category description'
            value={values?.description ?? 'N/A'}
            multiline
            minRows={3}
            sx={{ '& .MuiOutlinedInput-root': { alignItems: 'baseline' } }}
            onChange={handleDescriptionChange('description')}
          />
        </Grid>
      </>
    )
  }

  const renderForm = () => {
    if (selectedCategoryData) {
      return (
        <form>
          <Grid container spacing={7}>
            {renderDetailsFields()}
          </Grid>
          <Grid item xs={12} sx={{ marginTop: 4.8, marginBottom: 3 }}>
            <Box>
              <ButtonStyled component='label' variant='contained' onClick={onEditCategoryClick}>
                Update category
              </ButtonStyled>
              <ResetButtonStyled color='error' variant='outlined' onClick={onResetClick}>
                Reset
              </ResetButtonStyled>
            </Box>
          </Grid>
        </form>
      )
    }

    return null
  }

  const onResetClick = () => {
    resetForm()
  }

  const onEditCategoryClick = async () => {
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

    setIsLoaderVisible(true)
    const formData = new FormData()
    formData.append('title', values.title)
    formData.append('description', values.description)
    formData.append('imageData', values?.imageData ? JSON.stringify(JSON.stringify(values.imageData)) : '')
    formData.append('id', values?.id ?? '')
    formData.append('code', values?.code ?? '')
    formData.append('dateAdded', `${values?.dateAdded ?? new Date()}`)
    if (file) {
      formData.append('file', file)
    }

    const response = await httpMultipartUpdateRequest({
      apiUrlPath: `${apiPathsConfig.updatedCategoryApiPath}/${values.id}`,
      jsonBody: formData
    })
    if (response.isSucceded && response?.responseData?.data && Object.keys(response.responseData.data).length > 0) {
      setSelectedCategory(response.responseData.data)
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
    <>
      <Dialog
        fullScreen
        open={openEditCategory ? openEditCategory : false}
        onClose={onClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <Typography sx={{ ml: 2, flex: 1, color: 'white' }} variant='h6' component='div'>
              Update category
            </Typography>
            <Button autoFocus color='inherit' onClick={onClose}>
              Close
            </Button>
          </Toolbar>
        </AppBar>
        <div>
          <CardContent>
            {renderAlert()}
            {renderForm()}
            <CustomisedLoader visible={isLoaderVisible} />
          </CardContent>
        </div>
      </Dialog>
    </>
  )
}

export default EditCategory
