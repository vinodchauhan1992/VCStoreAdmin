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
import { CountriesReducer, CitiesReducer, useAppDispatch, useAppSelector, StatesReducer } from 'src/redux/reducers'
import Divider from '@mui/material/Divider'
import Chip from '@mui/material/Chip'
import { grey } from '@mui/material/colors'
import CustomisedAccordion from 'src/@core/components/customised-accordion/CustomisedAccordion'
import { CustomisedAccordionsObjectProps } from 'src/models/CustomisedAccordionModel'
import Radio from '@mui/material/Radio'
import FormLabel from '@mui/material/FormLabel'
import RadioGroup from '@mui/material/RadioGroup'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import { CountriesModel } from 'src/models/CountriesModel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import { AddCityRequestModel } from 'src/models/CitiesModel'
import { StatesModel } from 'src/models/StatesModel'

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

const TabAddCity = () => {
  const dispatch = useAppDispatch()

  const defaultAlertValues: AlertValuesModel = {
    severity: 'info',
    message: '',
    isVisible: false,
    accordionName: null
  }

  const defaultValues: AddCityRequestModel = {
    title: '',
    stateID: '',
    countryID: '',
    isDeleteable: false,
    isAdminDeleteable: true
  }

  // @ts-ignore
  const addedCityResponse = useAppSelector(CitiesReducer.selectAddedCityResponse)
  // @ts-ignore
  const allCountriesDataResult = useAppSelector(CountriesReducer.selectAllCountriesDataResult)
  // @ts-ignore
  const statesDataByCountryIdResult = useAppSelector(StatesReducer.selectStatesDataByCountryIdResult)

  // ** State
  const [values, setValues] = useState<AddCityRequestModel>(defaultValues)
  const [alertVaues, setAlertValues] = useState<AlertValuesModel>(defaultAlertValues)
  const [selectedCountry, setSelectedCountry] = useState<CountriesModel | null>(null)
  const [selectedState, setSelectedState] = useState<StatesModel | null>(null)

  const callAllCountriesApi = () => {
    dispatch({ type: 'FETCH_ALL_COUNTRIES' })
  }

  useEffect(() => {
    callAllCountriesApi()
  }, [])

  const callStatesByCountryIdApi = () => {
    dispatch({ type: 'FETCH_STATES_BY_COUNTRY_ID', payload: { countryId: selectedCountry?.id } })
  }

  useEffect(() => {
    if (selectedCountry?.id) {
      callStatesByCountryIdApi()
    } else {
      dispatch(StatesReducer.resetAllStatesDataByCountryIdResult())
    }
  }, [selectedCountry])

  const handleTextFieldChange = (prop: keyof AddCityRequestModel) => (event: ChangeEvent<HTMLInputElement>) => {
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
    setSelectedCountry(null)
    setSelectedState(null)
  }

  const onResetClick = () => {
    resetForm()
  }

  const onAddNewCityClick = async () => {
    if (!values?.title || values.title === '') {
      setAlertValues({
        severity: 'error',
        message: 'Please enter city title.',
        isVisible: true,
        accordionName: 'city details'
      })
      return
    }
    if (!selectedCountry?.id || selectedCountry.id === '') {
      setAlertValues({
        severity: 'error',
        message: 'Please select country.',
        isVisible: true,
        accordionName: 'city details'
      })
      return
    }
    if (!selectedState?.id || selectedState.id === '') {
      setAlertValues({
        severity: 'error',
        message: 'Please select state.',
        isVisible: true,
        accordionName: 'city details'
      })
      return
    }

    const newValues: AddCityRequestModel = {
      ...values,
      countryID: selectedCountry?.id,
      stateID: selectedState?.id
    }

    dispatch({ type: 'ADD_CITY', payload: newValues })
  }

  useEffect(() => {
    if (addedCityResponse?.isCompleted) {
      if (addedCityResponse?.succeeded) {
        resetForm()
        dispatch(CitiesReducer.resetAddedCityResponse())
      } else {
        dispatch(CitiesReducer.resetAddedCityResponse())
      }
    }
  }, [addedCityResponse])

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

  const cityDetailsChildren = () => {
    return (
      <Grid container spacing={7} style={{ padding: 30 }}>
        {renderAlert('city details')}
        <Grid item xs={6} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Select country</InputLabel>
            <Select
              label='Select country'
              value={selectedCountry?.title ?? ''}
              defaultValue={selectedCountry?.title ?? ''}
            >
              {allCountriesDataResult?.dataArray?.map(country => {
                return (
                  <MenuItem
                    value={country?.title ?? ''}
                    key={`${country.id}`}
                    onClick={() => {
                      if (selectedCountry?.id !== country?.id) {
                        setSelectedState(null)
                        setSelectedCountry(country)
                      }
                    }}
                    selected={country?.id === selectedCountry?.id}
                  >
                    {country.title}
                  </MenuItem>
                )
              })}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Select state</InputLabel>
            <Select
              label='Select state'
              value={selectedState?.title ?? ''}
              defaultValue={selectedState?.title ?? ''}
              disabled={selectedCountry?.id ? false : true}
            >
              {statesDataByCountryIdResult?.data?.map(state => {
                return (
                  <MenuItem
                    value={state?.title ?? ''}
                    key={`${state.id}`}
                    onClick={() => {
                      setSelectedState(state)
                    }}
                    selected={state?.id === selectedState?.id}
                  >
                    {state.title}
                  </MenuItem>
                )
              })}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            fullWidth
            label='City title'
            placeholder='City title'
            value={values.title}
            onChange={handleTextFieldChange('title')}
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
        accordionSummary: 'City details',
        accordionName: 'city details',
        accordionDetailsChildren: () => cityDetailsChildren()
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
              <ButtonStyled component='label' variant='contained' onClick={onAddNewCityClick}>
                Add new city
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

export default TabAddCity
