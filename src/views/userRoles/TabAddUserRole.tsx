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
import { UserRoleModel } from 'src/models/UserRoleModel'

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

const TabAddUserRole = () => {
  // ** State
  const [values, setValues] = useState<UserRoleModel>({
    role: '',
    description: ''
  })
  const [isLoaderVisible, setIsLoaderVisible] = useState<boolean>(false)

  const handleRoleChange = (prop: keyof UserRoleModel) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleDescriptionChange = (prop: keyof UserRoleModel) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const resetForm = () => {
    setValues({
      role: '',
      description: ''
    })
  }

  const onResetClick = () => {
    resetForm()
  }

  const onAddNewUserRoleClick = async () => {
    setIsLoaderVisible(true)
    const response = await httpPostRequest({ apiUrlPath: apiPathsConfig.addUserRoleApiPath, jsonBody: values })
    if (response.isSucceded) {
      resetForm()
    }
    setIsLoaderVisible(false)
  }

  return (
    <div>
      <CardContent>
        <form>
          <Grid container spacing={7}>
            <Grid item xs={12} sm={12}>
              <TextField
                fullWidth
                label='User role'
                placeholder='User role'
                value={values.role}
                onChange={handleRoleChange('role')}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                fullWidth
                label='Role description'
                placeholder='Role description'
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
              <ButtonStyled component='label' variant='contained' onClick={onAddNewUserRoleClick}>
                Add new user role
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

export default TabAddUserRole
