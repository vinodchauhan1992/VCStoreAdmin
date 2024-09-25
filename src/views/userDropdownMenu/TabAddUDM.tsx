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
import Alert from '@mui/material/Alert'
import { AlertValuesModel } from 'src/models/AlertValuesModel'
import { UserDropdownMenusReducer, useAppDispatch, useAppSelector } from 'src/redux/reducers'
import Divider from '@mui/material/Divider'
import Chip from '@mui/material/Chip'
import { grey } from '@mui/material/colors'
import CustomisedAccordion from 'src/@core/components/customised-accordion/CustomisedAccordion'
import { CustomisedAccordionsObjectProps } from 'src/models/CustomisedAccordionModel'
import { AddUDMRequestModel } from 'src/models/UserDropdownMenusModel'
import Radio from '@mui/material/Radio'
import FormLabel from '@mui/material/FormLabel'
import RadioGroup from '@mui/material/RadioGroup'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'

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

const Root = styled('div')(({ theme }) => ({
  width: '100%',
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
  '& > :not(style) ~ :not(style)': {
    marginTop: theme.spacing(5)
  }
}))

const TabAddUDM = () => {
  const dispatch = useAppDispatch()

  const defaultAlertValues: AlertValuesModel = {
    severity: 'info',
    message: '',
    isVisible: false,
    accordionName: null
  }

  const defaultFormValues: AddUDMRequestModel = {
    title: '',
    menuPath: '',
    priority: 1,
    isActive: true,
    isDeleteable: false,
    isAdminDeleteable: true
  }

  // @ts-ignore
  const addedUDMResponse = useAppSelector(UserDropdownMenusReducer.selectAddedUDMResponse)
  // @ts-ignore
  const udmsMaxPriorityDataValue = useAppSelector(UserDropdownMenusReducer.selectUDMSMaxPriorityDataValue)

  // ** State
  const [values, setValues] = useState<AddUDMRequestModel>(defaultFormValues)
  const [alertVaues, setAlertValues] = useState<AlertValuesModel>(defaultAlertValues)

  const handleTextFieldChange = (prop: keyof AddUDMRequestModel) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleIsMenuActiveRadioChange = (newValue: string) => {
    setValues({ ...values, isActive: newValue === 'yes' ? true : false })
  }

  const handleDeleteableRadioChange = (newValue: string) => {
    setValues({ ...values, isDeleteable: newValue === 'yes' ? true : false })
  }

  const handleDeleteableByAdminRadioChange = (newValue: string) => {
    setValues({ ...values, isAdminDeleteable: newValue === 'yes' ? true : false })
  }

  const callUDMSMaxPriorityApi = () => {
    dispatch({ type: 'FETCH_UDMS_MAX_PRIORITY' })
  }

  const setUDMSValue = () => {
    setValues({
      ...defaultFormValues,
      priority: udmsMaxPriorityDataValue
    })
  }

  useEffect(() => {
    callUDMSMaxPriorityApi()
  }, [])

  useEffect(() => {
    setUDMSValue()
  }, [udmsMaxPriorityDataValue])

  const resetForm = () => {
    setValues(defaultFormValues)
    setAlertValues(defaultAlertValues)
  }

  const onResetClick = () => {
    resetForm()
  }

  const onAddNewUDMClick = async () => {
    if (!values?.title || values.title === '') {
      setAlertValues({
        severity: 'error',
        message: 'Please enter udm title.',
        isVisible: true,
        accordionName: 'udm details'
      })
      return
    }
    if (!values?.menuPath || values.menuPath === '') {
      setAlertValues({
        severity: 'error',
        message: 'Please enter udm path.',
        isVisible: true,
        accordionName: 'udm details'
      })
      return
    }
    if (!values?.priority || values.priority <= 0) {
      setAlertValues({
        severity: 'error',
        message: 'Please enter valid udm priority.',
        isVisible: true,
        accordionName: 'udm details'
      })
      return
    }

    dispatch({ type: 'ADD_UDM', payload: values })
  }

  useEffect(() => {
    if (addedUDMResponse?.isCompleted) {
      if (addedUDMResponse?.succeeded) {
        resetForm()
        dispatch(UserDropdownMenusReducer.resetAddedUDMResponse())
        callUDMSMaxPriorityApi()
      } else {
        dispatch(UserDropdownMenusReducer.resetAddedUDMResponse())
      }
    }
  }, [addedUDMResponse])

  const renderAlert = (renderInAccordion?: string | null) => {
    if (alertVaues?.isVisible && renderInAccordion && renderInAccordion === alertVaues?.accordionName) {
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

  const renderDivider = (isRenderChip: boolean, chipLabel?: string | null, chipColor?: any, chipTextColor?: any) => {
    return (
      <Root style={{ marginTop: 30 }}>
        <Divider>
          {isRenderChip ? (
            <Chip
              label={chipLabel && chipLabel !== '' ? chipLabel : 'Chip'}
              size='medium'
              style={{
                color: chipTextColor ? chipTextColor : 'black',
                backgroundColor: chipColor ? chipColor : grey[300]
              }}
            />
          ) : null}
        </Divider>
      </Root>
    )
  }

  const renderInfoAlert = () => {
    if (udmsMaxPriorityDataValue !== undefined && udmsMaxPriorityDataValue !== null) {
      return (
        <Grid container spacing={7}>
          <Grid item xs={12} sm={12} sx={{ marginBottom: 4.8 }}>
            <Alert severity='info'>{`Currently highest registered priority is ${
              udmsMaxPriorityDataValue > 0 ? udmsMaxPriorityDataValue - 1 : 0
            }. So it must be greater than ${
              udmsMaxPriorityDataValue > 0 ? udmsMaxPriorityDataValue - 1 : 0
            } Which is ${udmsMaxPriorityDataValue}`}</Alert>
          </Grid>
        </Grid>
      )
    }
    return null
  }

  const udmDetailsChildren = () => {
    return (
      <Grid container spacing={7} style={{ padding: 30 }}>
        {renderInfoAlert()}
        {renderAlert('udm details')}
        <Grid item xs={6} sm={6}>
          <TextField
            fullWidth
            label='UDM title'
            placeholder='UDM title'
            value={values.title}
            onChange={handleTextFieldChange('title')}
            required
          />
        </Grid>
        <Grid item xs={6} sm={6}>
          <TextField
            fullWidth
            label='UDM priority'
            placeholder='UDM priority'
            value={values.priority}
            onChange={handleTextFieldChange('priority')}
            required
            type='number'
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            fullWidth
            label='UDM path'
            placeholder='UDM path'
            value={values.menuPath}
            onChange={handleTextFieldChange('menuPath')}
            required
          />
        </Grid>
      </Grid>
    )
  }

  const settingsDetailsChildren = () => {
    return (
      <Grid container spacing={7} style={{ padding: 30 }}>
        <Grid item xs={4} sm={4}>
          <FormControl>
            <FormLabel sx={{ fontSize: '0.875rem' }}>Is menu active?</FormLabel>
            <RadioGroup
              row
              defaultValue={values?.isDeleteable ? 'yes' : 'no'}
              aria-label='Is menu active?'
              name='account-settings-info-radio'
              value={values?.isDeleteable ? 'yes' : 'no'}
            >
              <FormControlLabel
                value='no'
                label='No'
                control={<Radio onClick={() => handleIsMenuActiveRadioChange('no')} />}
              />
              <FormControlLabel
                value='yes'
                label='Yes'
                control={<Radio onClick={() => handleIsMenuActiveRadioChange('yes')} />}
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={4} sm={4}>
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
        <Grid item xs={4} sm={4}>
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
      </Grid>
    )
  }

  const getCustomisedAccordionsArray = () => {
    const dataArr: CustomisedAccordionsObjectProps[] = [
      {
        id: '1',
        accordionSummary: 'UDM details',
        accordionName: 'udm details',
        accordionDetailsChildren: () => udmDetailsChildren()
      },
      {
        id: '2',
        accordionSummary: 'Settings details',
        accordionName: 'settings details',
        accordionDetailsChildren: () => settingsDetailsChildren()
      }
    ]
    return dataArr
  }

  const renderDataWithAccordion = () => {
    const customisedAccordionsArray = getCustomisedAccordionsArray()
    return (
      <CustomisedAccordion
        customisedAccordionsArray={customisedAccordionsArray}
        defaultSelected={customisedAccordionsArray[0]}
        isExpandAllBtnVisible
        defaultControlled
        showControlledOption
      />
    )
  }

  return (
    <div>
      <CardContent>
        <form>
          <Grid container spacing={7}>
            <Grid item xs={12} sm={12}>
              {renderDataWithAccordion()}
            </Grid>
          </Grid>
          {renderDivider(false)}
          <Grid item xs={12} sx={{ marginTop: 10, marginBottom: 3 }}>
            <Box>
              <ButtonStyled component='label' variant='contained' onClick={onAddNewUDMClick}>
                Add new udm
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

export default TabAddUDM
