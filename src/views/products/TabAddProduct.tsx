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
import { BrandsReducer, CategoriesReducer, ProductsReducer, useAppDispatch, useAppSelector } from 'src/redux/reducers'
import { AddProductModel, MaxDiscuntPercentagesDataModel } from 'src/models/ProductsModel'
import { CategoryModel } from 'src/models/CategoryModel'
import { BrandsModel } from 'src/models/BrandsModel'
import Radio from '@mui/material/Radio'
import FormLabel from '@mui/material/FormLabel'
import RadioGroup from '@mui/material/RadioGroup'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import { getMaxDiscountPercentagesDataArray } from './staticData/staticMenuOptions'

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

const TabAddProduct = () => {
  const dispatch = useAppDispatch()

  const defaultAlertValues: AlertValuesModel = {
    severity: 'info',
    message: '',
    isVisible: false
  }

  const defaultValues: AddProductModel = {
    title: '',
    description: '',
    categoryID: '',
    isActive: true,
    purchasePrice: 0,
    sellingPrice: 0,
    maxDiscountPercentage: 0,
    file: null,
    brandID: ''
  }

  // @ts-ignore
  const addedProductResponse = useAppSelector(ProductsReducer.selectAddedProductResponse)
  // @ts-ignore
  const allCategoriesDataResult = useAppSelector(CategoriesReducer.selectAllCategoriesDataResult)
  // @ts-ignore
  const allBrandsDataResult = useAppSelector(BrandsReducer.selectAllBrandsDataResult)

  // ** State
  const [values, setValues] = useState<AddProductModel>(defaultValues)
  const [alertVaues, setAlertValues] = useState<AlertValuesModel>(defaultAlertValues)
  const [imageFileData, setImageFileData] = useState<string>(defaultImage)
  const [selectedCategory, setSelectedCategory] = useState<CategoryModel | null>(null)
  const [selectedBrand, setSelectedBrand] = useState<BrandsModel | null>(null)
  const [maxDiscuntPercentagesDataArr, setMaxDiscuntPercentagesDataArr] = useState<
    MaxDiscuntPercentagesDataModel[] | []
  >([])
  const [selectedMaxDiscuntPercentage, setSelectedMaxDiscuntPercentage] =
    useState<MaxDiscuntPercentagesDataModel | null>(null)

  useEffect(() => {
    dispatch({ type: 'FETCH_ALL_CATEGORIES' })
    setMaxDiscuntPercentagesDataArr(getMaxDiscountPercentagesDataArray())
  }, [])

  useEffect(() => {
    dispatch({ type: 'FETCH_ALL_BRANDS' })
  }, [allCategoriesDataResult?.dataArray])

  const onChange = (file: ChangeEvent) => {
    const reader = new FileReader()
    const { files } = file.target as HTMLInputElement

    console.log('files_1', files?.[0])
    if (files && files.length !== 0) {
      reader.onload = () => {
        console.log('files_2', files?.[0])
        setImageFileData(reader.result as string)
        setValues({ ...values, file: files[0] })
      }

      reader.readAsDataURL(files[0])
    }
  }

  const handleTextFieldChange = (prop: keyof AddProductModel) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleIsProductActiveChange = (newValue: string) => {
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

  const onAddNewProductClick = async () => {
    if (!values?.title || values.title === '') {
      setAlertValues({
        severity: 'error',
        message: 'Please enter product title.',
        isVisible: true
      })
      return
    }
    if (!values?.description || values.description === '') {
      setAlertValues({
        severity: 'error',
        message: 'Please enter product description.',
        isVisible: true
      })
      return
    }
    if (!values?.purchasePrice || values.purchasePrice <= 0) {
      setAlertValues({
        severity: 'error',
        message: 'Please enter purchase price.',
        isVisible: true
      })
      return
    }
    if (!values?.sellingPrice || values.sellingPrice <= 0) {
      setAlertValues({
        severity: 'error',
        message: 'Please enter selling price.',
        isVisible: true
      })
      return
    }
    if (!selectedCategory?.id || selectedCategory.id === '') {
      setAlertValues({
        severity: 'error',
        message: 'Please select category.',
        isVisible: true
      })
      return
    }
    if (!selectedBrand?.id || selectedBrand.id === '') {
      setAlertValues({
        severity: 'error',
        message: 'Please select brand.',
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
    let maxDiscountPercentage = 0
    if (selectedMaxDiscuntPercentage?.title && selectedMaxDiscuntPercentage.title !== '') {
      maxDiscountPercentage = selectedMaxDiscuntPercentage.code
    }

    const formData = new FormData()
    formData.append('title', values.title)
    formData.append('description', values.description)
    formData.append('categoryID', selectedCategory.id)
    formData.append('isActive', `${values.isActive}`)
    formData.append('purchasePrice', `${values.purchasePrice}`)
    formData.append('sellingPrice', `${values.sellingPrice}`)
    formData.append('maxDiscountPercentage', `${maxDiscountPercentage}`)
    formData.append('brandID', selectedBrand.id)
    formData.append('file', values.file)

    dispatch({ type: 'ADD_PRODUCT', payload: formData })
  }

  useEffect(() => {
    if (addedProductResponse?.isCompleted) {
      if (addedProductResponse?.succeeded) {
        resetForm()
        dispatch(ProductsReducer.resetAddedProductResponse())
      } else {
        dispatch(ProductsReducer.resetAddedProductResponse())
      }
    }
  }, [addedProductResponse])

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
                  <CardMedia component='img' image={imageFileData} alt='Product image' />
                </Card>
                <Box>
                  <ButtonStyled component='label' variant='contained' htmlFor='product-logo-upload-image'>
                    Upload New product logo
                    <input
                      hidden
                      type='file'
                      onChange={onChange}
                      accept='image/png, image/jpeg'
                      id='product-logo-upload-image'
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
              <FormControl fullWidth>
                <InputLabel>Select category</InputLabel>
                <Select label='Select category'>
                  {allCategoriesDataResult?.dataArray?.map(category => {
                    return (
                      <MenuItem
                        value={category?.title ?? ''}
                        key={`${category.id}`}
                        onClick={() => {
                          setSelectedCategory(category)
                        }}
                      >
                        {category.title}
                      </MenuItem>
                    )
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Select brand</InputLabel>
                <Select label='Select brand'>
                  {allBrandsDataResult?.dataArray?.map(brand => {
                    return (
                      <MenuItem
                        value={brand?.title ?? ''}
                        key={`${brand.id}`}
                        onClick={() => {
                          setSelectedBrand(brand)
                        }}
                      >
                        {brand.title}
                      </MenuItem>
                    )
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6} sm={6}>
              <TextField
                fullWidth
                label='Product title'
                placeholder='Product title'
                value={values.title}
                onChange={handleTextFieldChange('title')}
              />
            </Grid>
            <Grid item xs={6} sm={6}>
              <TextField
                fullWidth
                label='Purchase price'
                placeholder='Purchase price'
                value={values.purchasePrice}
                onChange={handleTextFieldChange('purchasePrice')}
                type='number'
              />
            </Grid>
            <Grid item xs={6} sm={6}>
              <TextField
                fullWidth
                label='Selling price'
                placeholder='Selling price'
                value={values.sellingPrice}
                onChange={handleTextFieldChange('sellingPrice')}
                type='number'
              />
            </Grid>
            <Grid item xs={6} sm={6}>
              <FormControl>
                <FormLabel sx={{ fontSize: '0.875rem' }}>Is product active?</FormLabel>
                <RadioGroup
                  row
                  defaultValue={values?.isActive ? 'yes' : 'no'}
                  aria-label='Is product active?'
                  name='account-settings-info-radio'
                  value={values?.isActive ? 'yes' : 'no'}
                >
                  <FormControlLabel
                    value='no'
                    label='No'
                    control={<Radio onClick={() => handleIsProductActiveChange('no')} />}
                  />
                  <FormControlLabel
                    value='yes'
                    label='Yes'
                    control={<Radio onClick={() => handleIsProductActiveChange('yes')} />}
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12}>
              <FormControl fullWidth>
                <InputLabel>Select max discount percentage</InputLabel>
                <Select label='Select max discount percentage'>
                  {maxDiscuntPercentagesDataArr?.map(discountPercentage => {
                    return (
                      <MenuItem
                        value={discountPercentage?.title ?? ''}
                        key={`${discountPercentage.code}`}
                        onClick={() => {
                          setSelectedMaxDiscuntPercentage(discountPercentage)
                        }}
                      >
                        {discountPercentage.title}
                      </MenuItem>
                    )
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                fullWidth
                label='Product description'
                placeholder='Product description'
                value={values.description}
                onChange={handleTextFieldChange('description')}
                multiline
                minRows={3}
                sx={{ '& .MuiOutlinedInput-root': { alignItems: 'baseline' } }}
              />
            </Grid>
          </Grid>
          <Grid item xs={12} sx={{ marginTop: 4.8, marginBottom: 3 }}>
            <Box>
              <ButtonStyled component='label' variant='contained' onClick={onAddNewProductClick}>
                Add new product
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

export default TabAddProduct
