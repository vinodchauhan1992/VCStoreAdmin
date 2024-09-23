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
import { CountriesReducer, useAppDispatch, useAppSelector } from 'src/redux/reducers'
import Divider from '@mui/material/Divider'
import Chip from '@mui/material/Chip'
import { grey } from '@mui/material/colors'
import CustomisedAccordion from 'src/@core/components/customised-accordion/CustomisedAccordion'
import { CustomisedAccordionsObjectProps } from 'src/models/CustomisedAccordionModel'
import { AddCountryRequestModel } from 'src/models/CountriesModel'
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

const TabAddCountry = () => {
  const dispatch = useAppDispatch()

  const defaultAlertValues: AlertValuesModel = {
    severity: 'info',
    message: '',
    isVisible: false,
    accordionName: null
  }

  const defaultValues: AddCountryRequestModel = {
    title: '',
    code: '',
    isDeleteable: false,
    isAdminDeleteable: true
  }

  // @ts-ignore
  const addedCountryResponse = useAppSelector(CountriesReducer.selectAddedCountryResponse)

  // ** State
  const [values, setValues] = useState<AddCountryRequestModel>(defaultValues)
  const [alertVaues, setAlertValues] = useState<AlertValuesModel>(defaultAlertValues)
  const [confirmPassword, setConfirmPassword] = useState<string>('')

  const handleTextFieldChange = (prop: keyof AddCountryRequestModel) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleDeleteableRadioChange = (newValue: string) => {
    setValues({ ...values, isDeleteable: newValue === 'yes' ? true : false })
  }

  const handleDeleteableByAdminRadioChange = (newValue: string) => {
    setValues({ ...values, isAdminDeleteable: newValue === 'yes' ? true : false })
  }

  const resetForm = () => {
    setValues(defaultValues)
    setAlertValues(defaultAlertValues)
  }

  const onResetClick = () => {
    resetForm()
  }

  const onAddNewCountryClick = async () => {
    if (!values?.title || values.title === '') {
      return {
        severity: 'error',
        message: 'Please enter country title.',
        isVisible: true,
        accordionName: 'country details'
      }
    }
    if (!values?.code || values.code === '') {
      return {
        severity: 'error',
        message: 'Please enter country code.',
        isVisible: true,
        accordionName: 'country details'
      }
    }

    dispatch({ type: 'ADD_COUNTRY', payload: values })
  }

  useEffect(() => {
    if (addedCountryResponse?.isCompleted) {
      if (addedCountryResponse?.succeeded) {
        resetForm()
        dispatch(CountriesReducer.resetAddedCountryResponse())
      } else {
        dispatch(CountriesReducer.resetAddedCountryResponse())
      }
    }
  }, [addedCountryResponse])

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

  const countryDetailsChildren = () => {
    return (
      <Grid container spacing={7} style={{ padding: 30 }}>
        {renderAlert('country details')}
        <Grid item xs={6} sm={6}>
          <TextField
            fullWidth
            label='Country title'
            placeholder='Country title'
            value={values.title}
            onChange={handleTextFieldChange('title')}
            required
          />
        </Grid>
        <Grid item xs={6} sm={6}>
          <TextField
            fullWidth
            label='Country code'
            placeholder='Country code'
            value={values.code}
            onChange={handleTextFieldChange('code')}
            required
          />
        </Grid>
      </Grid>
    )
  }

  const settingsDetailsChildren = () => {
    return (
      <Grid container spacing={7} style={{ padding: 30 }}>
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
      </Grid>
    )
  }

  const getCustomisedAccordionsArray = () => {
    const dataArr: CustomisedAccordionsObjectProps[] = [
      {
        id: '1',
        accordionSummary: 'Country details',
        accordionName: 'country details',
        accordionDetailsChildren: () => countryDetailsChildren()
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
              <ButtonStyled component='label' variant='contained' onClick={onAddNewCountryClick}>
                Add new country
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

export default TabAddCountry
