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
import { AlertValuesModel } from 'src/models/AlertValuesModel'
import Alert from '@mui/material/Alert'
import { AdminMenuStatusesReducer, useAppDispatch, useAppSelector } from 'src/redux/reducers'
import { AdminMenuStatusesModel } from 'src/models/AdminMenuStatusesModel'

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

const TabAddMenuStatus = () => {
  const dispatch = useAppDispatch()

  const defaultAlertValues: AlertValuesModel = {
    severity: 'info',
    message: '',
    isVisible: false
  }

  const defaultFormValues: AdminMenuStatusesModel = {
    menuStatusTitle: '',
    menuStatusDescription: ''
  }

  // ** State
  const [values, setValues] = useState<AdminMenuStatusesModel>(defaultFormValues)
  const [alertVaues, setAlertValues] = useState<AlertValuesModel>(defaultAlertValues)

  // @ts-ignore
  const addedAdminMenuStatusResponse = useAppSelector(AdminMenuStatusesReducer.selectAddedAdminMenuStatusResponse)

  const handleMenuTitleChange = (prop: keyof AdminMenuStatusesModel) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleDescriptionChange = (prop: keyof AdminMenuStatusesModel) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const resetForm = () => {
    setValues(defaultFormValues)
    setAlertValues(defaultAlertValues)
  }

  const onResetClick = () => {
    resetForm()
  }

  const onAddNewMenuStatusClick = async () => {
    if (!values?.menuStatusTitle || values.menuStatusTitle === '') {
      setAlertValues({
        severity: 'error',
        message: 'Please enter menu status title.',
        isVisible: true
      })
      return
    }
    if (!values?.menuStatusDescription || values.menuStatusDescription === '') {
      setAlertValues({
        severity: 'error',
        message: 'Please enter description.',
        isVisible: true
      })
      return
    }

    dispatch({ type: 'ADD_ADMIN_MENU_STATUS', payload: values })
  }

  useEffect(() => {
    if (addedAdminMenuStatusResponse?.isCompleted) {
      if (addedAdminMenuStatusResponse?.succeeded) {
        resetForm()
        dispatch(AdminMenuStatusesReducer.resetAddedAdminMenuStatusResponse())
      } else {
        setAlertValues({
          severity: 'error',
          message: addedAdminMenuStatusResponse?.message ?? '',
          isVisible: true
        })
        dispatch(AdminMenuStatusesReducer.resetAddedAdminMenuStatusResponse())
      }
    }
  }, [addedAdminMenuStatusResponse])

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
                label='Menu status title'
                placeholder='Menu status title'
                value={values.menuStatusTitle}
                onChange={handleMenuTitleChange('menuStatusTitle')}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                fullWidth
                label='Menu status description'
                placeholder='Menu status description'
                value={values.menuStatusDescription}
                onChange={handleDescriptionChange('menuStatusDescription')}
                multiline
                minRows={3}
                sx={{ '& .MuiOutlinedInput-root': { alignItems: 'baseline' } }}
              />
            </Grid>
          </Grid>
          <Grid item xs={12} sx={{ marginTop: 4.8, marginBottom: 3 }}>
            <Box>
              <ButtonStyled component='label' variant='contained' onClick={onAddNewMenuStatusClick}>
                Add new admin menu
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

export default TabAddMenuStatus
