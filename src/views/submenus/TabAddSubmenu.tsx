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
import {
  AdminMenuStatusesReducer,
  AdminMenusReducer,
  AdminSubmenusReducer,
  useAppDispatch,
  useAppSelector
} from 'src/redux/reducers'
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
import { AdminSubmenusModel } from 'src/models/AdminSubmenusModel'

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

const TabAddSubmenu = () => {
  const dispatch = useAppDispatch()

  const defaultAlertValues: AlertValuesModel = {
    severity: 'info',
    message: '',
    isVisible: false
  }

  const defaultFormValues = {
    submenuTitle: '',
    adminMenuID: '',
    adminMenuTitle: '',
    priority: 1,
    statusID: '',
    status: '',
    isDeleteable: false,
    isAdminDeleteable: true,
    description: ''
  }

  // ** State
  const [values, setValues] = useState<AdminSubmenusModel>(defaultFormValues)
  const [alertVaues, setAlertValues] = useState<AlertValuesModel>(defaultAlertValues)

  // @ts-ignore
  const addedAdminSubmenuResponse = useAppSelector(AdminSubmenusReducer.selectAddedAdminSubmenuResponse)
  // @ts-ignore
  const allAdminMenuStatusesDataResult = useAppSelector(AdminMenuStatusesReducer.selectAllAdminMenuStatusesDataResult)
  // @ts-ignore
  const allAdminMenusDataResult = useAppSelector(AdminMenusReducer.selectAllAdminMenusDataResult)
  // @ts-ignore
  const submenusMaxPriorityDataValue = useAppSelector(AdminSubmenusReducer.selectSubmenusMaxPriorityDataValue)

  const [selectedMenuStatusData, setSelectedMenuStatusData] = useState<AdminMenuStatusesModel | null>(null)
  const [selectedMenuData, setSelectedMenuData] = useState<AdminMenusModel | null>(null)

  useEffect(() => {
    dispatch({ type: 'FETCH_ALL_ADMIN_MENUS' })
  }, [])

  useEffect(() => {
    dispatch({ type: 'FETCH_ALL_ADMIN_MENU_STATUSES' })
  }, [allAdminMenusDataResult?.dataArray])

  const callSubmenusMaxPriorityApi = () => {
    dispatch({ type: 'FETCH_SUBMENUS_MAX_PRIORITY' })
  }

  useEffect(() => {
    callSubmenusMaxPriorityApi()
  }, [allAdminMenuStatusesDataResult?.dataArray])

  useEffect(() => {
    setValues({
      ...defaultFormValues,
      priority: submenusMaxPriorityDataValue
    })
  }, [submenusMaxPriorityDataValue])

  const handleSubmenuTitleChange = (prop: keyof AdminSubmenusModel) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleDescriptionChange = (prop: keyof AdminMenusModel) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handlePriorityChange = (prop: keyof AdminMenusModel) => (event: ChangeEvent<HTMLInputElement>) => {
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

  const onAddNewSubmenuClick = async () => {
    if (!values?.submenuTitle || values.submenuTitle === '') {
      setAlertValues({
        severity: 'error',
        message: 'Please enter submenu title.',
        isVisible: true
      })
      return
    }
    if (!values?.description || values.description === '') {
      setAlertValues({
        severity: 'error',
        message: 'Please enter submenu description.',
        isVisible: true
      })
      return
    }
    if (values?.priority === null || values.priority === undefined) {
      setAlertValues({
        severity: 'error',
        message: 'Please enter priority.',
        isVisible: true
      })
      return
    }
    if (!selectedMenuStatusData?.id || selectedMenuStatusData.id === '') {
      setAlertValues({
        severity: 'error',
        message: 'Please select the submenu status.',
        isVisible: true
      })
      return
    }
    if (!selectedMenuData?.id || selectedMenuData.id === '') {
      setAlertValues({
        severity: 'error',
        message: 'Please select the menu.',
        isVisible: true
      })
      return
    }

    setAlertValues(defaultAlertValues)

    const valuesToAdd = {
      ...values,
      adminMenuID: selectedMenuData?.id ?? '',
      adminMenuTitle: selectedMenuData?.menuTitle ?? '',
      statusID: selectedMenuStatusData?.id ?? '',
      status: selectedMenuStatusData?.menuStatusTitle ?? ''
    }
    dispatch({ type: 'ADD_ADMIN_SUBMENU', payload: valuesToAdd })
  }

  useEffect(() => {
    if (addedAdminSubmenuResponse?.isCompleted) {
      if (addedAdminSubmenuResponse?.succeeded) {
        resetForm()
        dispatch(AdminSubmenusReducer.resetAddedAdminSubmenuResponse())
        callSubmenusMaxPriorityApi()
      } else {
        setAlertValues({
          severity: 'error',
          message: addedAdminSubmenuResponse?.message ?? '',
          isVisible: true
        })
        dispatch(AdminSubmenusReducer.resetAddedAdminSubmenuResponse())
      }
    }
  }, [addedAdminSubmenuResponse])

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

  const renderInfoAlert = () => {
    if (submenusMaxPriorityDataValue !== undefined && submenusMaxPriorityDataValue !== null) {
      return (
        <Grid container spacing={7}>
          <Grid item xs={12} sm={12} sx={{ marginBottom: 4.8 }}>
            <Alert severity='info'>{`Currently highest registered priority is ${
              submenusMaxPriorityDataValue > 0 ? submenusMaxPriorityDataValue - 1 : 0
            }. So it must be greater than ${
              submenusMaxPriorityDataValue > 0 ? submenusMaxPriorityDataValue - 1 : 0
            } Which is ${submenusMaxPriorityDataValue}`}</Alert>
          </Grid>
        </Grid>
      )
    }
    return null
  }

  return (
    <div>
      <CardContent>
        {renderInfoAlert()}
        {renderAlert()}
        <form>
          <Grid container spacing={7}>
            <Grid item xs={6} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Menu</InputLabel>
                <Select label='Menu'>
                  {allAdminMenusDataResult?.dataArray?.map(menu => {
                    return (
                      <MenuItem
                        value={menu?.menuTitle ?? ''}
                        key={`${menu.id}`}
                        onClick={() => {
                          setSelectedMenuData(menu)
                        }}
                      >
                        {menu.menuTitle}
                      </MenuItem>
                    )
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Submenu status</InputLabel>
                <Select label='Submenu status'>
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
              <TextField
                fullWidth
                label='Submenu title'
                placeholder='Submenu title'
                value={values.submenuTitle}
                onChange={handleSubmenuTitleChange('submenuTitle')}
              />
            </Grid>
            <Grid item xs={6} sm={6}>
              <TextField
                fullWidth
                label='Priority'
                placeholder='Priority'
                value={values.priority}
                onChange={handlePriorityChange('priority')}
              />
            </Grid>
            <Grid item xs={6} sm={6}>
              <FormControl>
                <FormLabel sx={{ fontSize: '0.875rem' }}>Can be deleted?</FormLabel>
                <RadioGroup
                  row
                  defaultValue={values?.isDeleteable ? 'yes' : 'no'}
                  aria-label='Can be deleted?'
                  name='account-settings-info-radio'
                  value={values?.isDeleteable ? 'yes' : 'no'}
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
                  value={values?.isAdminDeleteable ? 'yes' : 'no'}
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
                label='Submenu description'
                placeholder='Submenu description'
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
              <ButtonStyled component='label' variant='contained' onClick={onAddNewSubmenuClick}>
                Add new submenu
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

export default TabAddSubmenu
