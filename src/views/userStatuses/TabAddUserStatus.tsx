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
import { UserStatusModel } from 'src/models/UserStatusModel'
import { AlertValuesModel } from 'src/models/AlertValuesModel'
import Alert from '@mui/material/Alert'
import { UserStatusesReducer, useAppDispatch, useAppSelector } from 'src/redux/reducers'

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

const TabAddUserStatus = () => {
  const dispatch = useAppDispatch()

  const defaultAlertValues: AlertValuesModel = {
    severity: 'info',
    message: '',
    isVisible: false
  }

  // ** State
  const [values, setValues] = useState<UserStatusModel>({
    status: '',
    description: ''
  })
  const [alertVaues, setAlertValues] = useState<AlertValuesModel>(defaultAlertValues)

  // @ts-ignore
  const addedUserStatusResponse = useAppSelector(UserStatusesReducer.selectAddedUserStatusResponse)

  const handleRoleChange = (prop: keyof UserStatusModel) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleDescriptionChange = (prop: keyof UserStatusModel) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const resetForm = () => {
    setValues({
      status: '',
      description: ''
    })
    setAlertValues(defaultAlertValues)
  }

  const onResetClick = () => {
    resetForm()
  }

  const onAddNewUserRoleClick = async () => {
    if (!values?.status || values.status === '') {
      setAlertValues({
        severity: 'error',
        message: 'Please enter user status.',
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
    dispatch({ type: 'ADD_USER_STATUS', payload: values })
  }

  useEffect(() => {
    if (addedUserStatusResponse?.isCompleted) {
      if (addedUserStatusResponse?.succeeded) {
        resetForm()
        dispatch(UserStatusesReducer.resetAddedUserStatusResponse())
      } else {
        setAlertValues({
          severity: 'error',
          message: addedUserStatusResponse?.message ?? '',
          isVisible: true
        })
        dispatch(UserStatusesReducer.resetAddedUserStatusResponse())
      }
    }
  }, [addedUserStatusResponse])

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
                label='User status'
                placeholder='User status'
                value={values.status}
                onChange={handleRoleChange('status')}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                fullWidth
                label='Status description'
                placeholder='Status description'
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
                Add new user status
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

export default TabAddUserStatus
