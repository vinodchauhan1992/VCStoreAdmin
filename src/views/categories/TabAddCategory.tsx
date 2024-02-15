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
import { CategoryModel } from 'src/models/CategoryModel'
import { httpPostRequest } from 'src/services/AxiosApi'
import apiPathsConfig from 'src/configs/apiPathsConfig'

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
  // ** State
  const [values, setValues] = useState<CategoryModel>({
    title: '',
    description: '',
    image: ''
  })

  const handleTitleChange = (prop: keyof CategoryModel) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleDescriptionChange = (prop: keyof CategoryModel) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleImageUrlChange = (prop: keyof CategoryModel) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const resetForm = () => {
    setValues({
      title: '',
      description: '',
      image: ''
    })
  }

  const onResetClick = () => {
    resetForm()
  }

  const onAddNewCategoryClick = async () => {
    const response = await httpPostRequest({ apiUrlPath: apiPathsConfig.addCategoryApiPath, jsonBody: values })
    if (response.isSucceded) {
      resetForm()
    }
  }

  return (
    <CardContent>
      <form>
        <Grid container spacing={7}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label='Category title'
              placeholder='Category title'
              value={values.title}
              onChange={handleTitleChange('title')}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label='Category image url'
              placeholder='Category image url'
              value={values.image}
              onChange={handleImageUrlChange('image')}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              fullWidth
              label='description'
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
      {/* {renderDataTable()} */}
    </CardContent>
  )
}

export default TabAddCategory
