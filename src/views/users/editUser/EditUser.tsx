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
import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import { ButtonProps } from '@mui/material/Button'
import { AlertValuesModel } from 'src/models/AlertValuesModel'
import Alert from '@mui/material/Alert'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import { BrandsReducer, useAppDispatch, useAppSelector } from 'src/redux/reducers'
import { BrandsModel } from 'src/models/BrandsModel'

const defaultImage = '/images/avatars/9.jpeg'

interface Props {
  selectedBrandData?: BrandsModel | null
  openEditBrand?: boolean | null
  onCloseModal?: () => void
  setOpenEditBrand?: (openEditBrand: boolean) => void
  setSelectedBrand: (selectedBrandData: BrandsModel) => void
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

const EditUser = (props: Props) => {
  const dispatch = useAppDispatch()

  // @ts-ignore
  const updatedBrandResponse = useAppSelector(BrandsReducer.selectUpdatedBrandResponse)

  const { selectedBrandData, openEditBrand = false, onCloseModal, setOpenEditBrand, setSelectedBrand } = props

  const defaultAlertValues: AlertValuesModel = {
    severity: 'info',
    message: '',
    isVisible: false
  }

  const defaultValues: BrandsModel = {
    title: '',
    description: '',
    brandLogo: null,
    id: '',
    code: '',
    dateAdded: new Date()
  }

  // ** State
  const [values, setValues] = useState<BrandsModel>(defaultValues)
  const [alertVaues, setAlertValues] = useState<AlertValuesModel>(defaultAlertValues)
  const [imageFileData, setImageFileData] = useState<string>(defaultImage)
  const [file, setFile] = useState<any>(null)

  const resetFile = () => {
    setFile(null)
  }

  const resetImage = () => {
    if (selectedBrandData?.brandLogo?.imageUrl && selectedBrandData.brandLogo.imageUrl !== '') {
      setImageFileData(selectedBrandData.brandLogo.imageUrl)
    } else {
      setImageFileData(defaultImage)
    }
  }

  const resetForm = () => {
    setValues({
      title: selectedBrandData?.title ?? '',
      description: selectedBrandData?.description ?? '',
      brandLogo: selectedBrandData?.brandLogo ?? null,
      id: selectedBrandData?.id ?? '',
      code: selectedBrandData?.code ?? '',
      dateAdded: selectedBrandData?.dateAdded,
      dateModified: selectedBrandData?.dateModified
    })
    resetImage()
    resetFile()
    setAlertValues(defaultAlertValues)
  }

  useEffect(() => {
    if (selectedBrandData) {
      resetForm()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedBrandData])

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

    setOpenEditBrand?.(false)
  }

  const handleTitleChange = (prop: keyof BrandsModel) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleDescriptionChange = (prop: keyof BrandsModel) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const renderDetailsFields = () => {
    return (
      <>
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
          <TextField disabled fullWidth label='Brand id' placeholder='Brand id' value={values?.id ?? ''} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label='Brand title'
            placeholder='Brand title'
            value={values?.title ?? ''}
            onChange={handleTitleChange('title')}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField disabled fullWidth label='Brand code' placeholder='Brand code' value={values?.code ?? ''} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            disabled
            fullWidth
            label='Brand added on'
            placeholder='Brand added on'
            value={values?.dateAdded ?? 'N/A'}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            disabled
            fullWidth
            label='Brand updated on'
            placeholder='Brand updated on'
            value={values?.dateModified ?? 'N/A'}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            fullWidth
            label='Brand description'
            placeholder='Brand description'
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
    if (selectedBrandData) {
      return (
        <form>
          <Grid container spacing={7}>
            {renderDetailsFields()}
          </Grid>
          <Grid item xs={12} sx={{ marginTop: 4.8, marginBottom: 3 }}>
            <Box>
              <ButtonStyled component='label' variant='contained' onClick={onEditBrandClick}>
                Update brand
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

  const onEditBrandClick = async () => {
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
    formData.append('brandLogo', values?.brandLogo ? JSON.stringify(JSON.stringify(values.brandLogo)) : '')
    formData.append('id', values?.id ?? '')
    formData.append('code', values?.code ?? '')
    formData.append('dateAdded', `${values?.dateAdded ?? new Date()}`)
    if (file) {
      formData.append('file', file)
    }

    dispatch({ type: 'UPDATE_BRAND', payload: { formData: formData, brandId: values.id } })
  }

  useEffect(() => {
    if (updatedBrandResponse?.isCompleted) {
      if (updatedBrandResponse?.succeeded) {
        setSelectedBrand(updatedBrandResponse?.data ?? {})
        dispatch(BrandsReducer.resetUpdatedBrandResponse())
      } else {
        dispatch(BrandsReducer.resetUpdatedBrandResponse())
      }
    }
  }, [updatedBrandResponse])

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
        open={openEditBrand ? openEditBrand : false}
        onClose={onClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <Typography sx={{ ml: 2, flex: 1, color: 'white' }} variant='h6' component='div'>
              Update brand
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
          </CardContent>
        </div>
      </Dialog>
    </>
  )
}

export default EditUser
