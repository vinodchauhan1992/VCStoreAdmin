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
import { AdminMenuStatusesReducer, AdminMenusReducer, useAppDispatch, useAppSelector } from 'src/redux/reducers'
import { AdminMenusModel } from 'src/models/AdminMenusModel'
import Radio from '@mui/material/Radio'
import FormLabel from '@mui/material/FormLabel'
import RadioGroup from '@mui/material/RadioGroup'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
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

const TabAddAdminMenu = () => {
  const dispatch = useAppDispatch()

  const defaultAlertValues: AlertValuesModel = {
    severity: 'info',
    message: '',
    isVisible: false
  }

  const defaultFormValues = {
    menuTitle: '',
    adminMenuStatusID: '',
    adminMenuStatus: '',
    isDeleteable: false,
    isAdminDeleteable: true,
    description: ''
  }

  // ** State
  const [values, setValues] = useState<AdminMenusModel>(defaultFormValues)
  const [alertVaues, setAlertValues] = useState<AlertValuesModel>(defaultAlertValues)

  // @ts-ignore
  const addedAdminMenuResponse = useAppSelector(AdminMenusReducer.selectAddedAdminMenuResponse)
  // @ts-ignore
  const allAdminMenuStatusesDataResult = useAppSelector(AdminMenuStatusesReducer.selectAllAdminMenuStatusesDataResult)

  const [selectedMenuStatusData, setSelectedMenuStatusData] = useState<AdminMenuStatusesModel | null>(null)

  useEffect(() => {
    dispatch({ type: 'FETCH_ALL_ADMIN_MENU_STATUSES' })
  }, [])

  const handleMenuTitleChange = (prop: keyof AdminMenusModel) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleDescriptionChange = (prop: keyof AdminMenusModel) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleDeleteableRadioChange = (newValue: string) => {
    setValues({ ...values, isDeleteable: newValue === 'yes' ? true : false })
  }

  const handleDeleteableByAdminRadioChange = (newValue: string) => {
    setValues({ ...values, isAdminDeleteable: newValue === 'yes' ? true : false })
  }

  const resetForm = () => {
    setValues(defaultFormValues)
    setAlertValues(defaultAlertValues)
  }

  const onResetClick = () => {
    resetForm()
  }

  const onAddNewAdminMenuClick = async () => {
    if (!values?.menuTitle || values.menuTitle === '') {
      setAlertValues({
        severity: 'error',
        message: 'Please enter menu title.',
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
    if (!selectedMenuStatusData?.id || selectedMenuStatusData.id === '') {
      setAlertValues({
        severity: 'error',
        message: 'Please select the menu status.',
        isVisible: true
      })
      return
    }
    
    const valuesToAdd = {
      ...values,
      adminMenuStatusID: selectedMenuStatusData?.id ?? '',
      adminMenuStatus: selectedMenuStatusData?.menuStatusTitle ?? ''
    }
    console.log('valuesToAdd', valuesToAdd)
    dispatch({ type: 'ADD_ADMIN_MENU', payload: valuesToAdd })
  }

  useEffect(() => {
    if (addedAdminMenuResponse?.isCompleted) {
      if (addedAdminMenuResponse?.succeeded) {
        resetForm()
        dispatch(AdminMenusReducer.resetAddedAdminMenuResponse())
      } else {
        setAlertValues({
          severity: 'error',
          message: addedAdminMenuResponse?.message ?? '',
          isVisible: true
        })
        dispatch(AdminMenusReducer.resetAddedAdminMenuResponse())
      }
    }
  }, [addedAdminMenuResponse])

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
                label='Menu title'
                placeholder='Menu title'
                value={values.menuTitle}
                onChange={handleMenuTitleChange('menuTitle')}
              />
            </Grid>
            <Grid item xs={6} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Menu status</InputLabel>
                <Select label='Menu status'>
                  {allAdminMenuStatusesDataResult?.dataArray?.map(menuStatus => {
                    return (
                      <MenuItem
                        value={menuStatus?.menuStatusTitle ?? ''}
                        key={`${menuStatus.id}`}
                        onClick={() => {
                          setSelectedMenuStatusData(menuStatus)
                        }}
                      >
                        {menuStatus.menuStatusTitle}
                      </MenuItem>
                    )
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6} sm={6}>
              <FormControl>
                <FormLabel sx={{ fontSize: '0.875rem' }}>Can be deleted?</FormLabel>
                <RadioGroup
                  row
                  defaultValue={values?.isDeleteable ? 'yes' : 'no'}
                  aria-label='Can be deleted?'
                  name='account-settings-info-radio'
                >
                  <FormControlLabel
                    value='no'
                    label='No'
                    control={<Radio onClick={() => handleDeleteableRadioChange('no')} />}
                  />
                  <FormControlLabel
                    value='yes'
                    label='Yes'
                    control={<Radio onClick={() => handleDeleteableRadioChange('yes')} />}
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={6} sm={6}>
              <FormControl>
                <FormLabel sx={{ fontSize: '0.875rem' }}>Can be deleted by admin?</FormLabel>
                <RadioGroup
                  row
                  defaultValue={values?.isAdminDeleteable ? 'yes' : 'no'}
                  aria-label='Can be deleted by admin?'
                  name='account-settings-info-radio'
                >
                  <FormControlLabel
                    value='yes'
                    label='Yes'
                    control={<Radio onClick={() => handleDeleteableByAdminRadioChange('yes')} />}
                  />
                  <FormControlLabel
                    value='no'
                    label='No'
                    control={<Radio onClick={() => handleDeleteableByAdminRadioChange('no')} />}
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                fullWidth
                label='Menu description'
                placeholder='Menu description'
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
              <ButtonStyled component='label' variant='contained' onClick={onAddNewAdminMenuClick}>
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

export default TabAddAdminMenu
