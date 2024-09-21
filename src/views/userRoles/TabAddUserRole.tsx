// ** React Imports
import { useState, ElementType, ChangeEvent, useEffect } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import CardContent from '@mui/material/CardContent'
import Button, { ButtonProps } from '@mui/material/Button'

// ** Icons Imports
import { UserRoleModel } from 'src/models/UserRoleModel'
import { AlertValuesModel } from 'src/models/AlertValuesModel'
import Alert from '@mui/material/Alert'
import { UserRolesReducer, useAppDispatch, useAppSelector } from 'src/redux/reducers'

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
  const dispatch = useAppDispatch()

  const defaultAlertValues: AlertValuesModel = {
    severity: 'info',
    message: '',
    isVisible: false
  }

  // ** State
  const [values, setValues] = useState<UserRoleModel>({
    role: '',
    userType: '',
    description: ''
  })
  const [alertVaues, setAlertValues] = useState<AlertValuesModel>(defaultAlertValues)

  // @ts-ignore
  const addedUserRoleResponse = useAppSelector(UserRolesReducer.selectAddedUserRoleResponse)

  const handleTextFieldChange = (prop: keyof UserRoleModel) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value })
  }


  const resetForm = () => {
    setValues({
      role: '',
      userType: '',
      description: ''
    })
    setAlertValues(defaultAlertValues)
  }

  const onResetClick = () => {
    resetForm()
  }

  const onAddNewUserRoleClick = async () => {
    if (!values?.role || values.role === '') {
      setAlertValues({
        severity: 'error',
        message: 'Please enter user role.',
        isVisible: true
      })
      return
    }
    if (!values?.userType || values.userType === '') {
      setAlertValues({
        severity: 'error',
        message: 'Please enter user type.',
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
    dispatch({ type: 'ADD_USER_ROLE', payload: values })
  }

  useEffect(() => {
    if (addedUserRoleResponse?.isCompleted) {
      if (addedUserRoleResponse?.succeeded) {
        resetForm()
        dispatch(UserRolesReducer.resetAddedUserRoleResponse())
      } else {
        setAlertValues({
          severity: 'error',
          message: addedUserRoleResponse?.message ?? '',
          isVisible: true
        })
        dispatch(UserRolesReducer.resetAddedUserRoleResponse())
      }
    }
  }, [addedUserRoleResponse])

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
            <Grid item xs={6} sm={6}>
              <TextField
                fullWidth
                label='User role'
                placeholder='User role'
                value={values.role}
                onChange={handleTextFieldChange('role')}
              />
            </Grid>
            <Grid item xs={6} sm={6}>
              <TextField
                fullWidth
                label='User type'
                placeholder='User type'
                value={values.userType}
                onChange={handleTextFieldChange('userType')}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                fullWidth
                label='Role description'
                placeholder='Role description'
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
              <ButtonStyled component='label' variant='contained' onClick={onAddNewUserRoleClick}>
                Add new user role
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

export default TabAddUserRole
