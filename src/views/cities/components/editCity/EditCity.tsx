import * as React from 'react'
import Collapse from '@mui/material/Collapse'
import TableHead from '@mui/material/TableHead'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import { styled } from '@mui/material/styles'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import CardContent from '@mui/material/CardContent'
import Button, { ButtonProps } from '@mui/material/Button'
import { green, red } from '@mui/material/colors'
import { CitiesReducer, CountriesReducer, StatesReducer, useAppDispatch, useAppSelector } from 'src/redux/reducers'
import { AlertValuesModel } from 'src/models/AlertValuesModel'
import Alert from '@mui/material/Alert'
import { UpdateCityRequestModel } from 'src/models/CitiesModel'
import Radio from '@mui/material/Radio'
import FormLabel from '@mui/material/FormLabel'
import RadioGroup from '@mui/material/RadioGroup'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import { CountriesModel } from 'src/models/CountriesModel'
import { StatesModel } from 'src/models/StatesModel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import { getCountryFromCountryId, getStateFromCountryAndStateId } from 'src/utils/CommonUtils'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14
  }
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0
  }
}))

const ButtonStyled = styled(Button)<ButtonProps & { component?: React.ElementType; htmlFor?: string }>(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    textAlign: 'center'
  }
}))

export interface EditCityProps {
  labelId: string
  row: any
  isItemSelected: boolean
  resetSelectedState?: () => void
}

const EditCity = (props: EditCityProps) => {
  const dispatch = useAppDispatch()

  const { labelId, row, isItemSelected, resetSelectedState } = props

  // @ts-ignore
  const updatedCityResponse = useAppSelector(CitiesReducer.selectUpdatedCityResponse)
  // @ts-ignore
  const allCountriesDataResult = useAppSelector(CountriesReducer.selectAllCountriesDataResult)
  // @ts-ignore
  const statesDataByCountryIdResult = useAppSelector(StatesReducer.selectStatesDataByCountryIdResult)

  const defaultAlertValues: AlertValuesModel = {
    severity: 'info',
    message: '',
    isVisible: false
  }

  const defaultValues: UpdateCityRequestModel = {
    id: '',
    title: '',
    countryID: '',
    stateID: '',
    isDeleteable: false,
    isAdminDeleteable: true,
    dateAdded: new Date()
  }

  const [values, setValues] = React.useState<UpdateCityRequestModel>(defaultValues)
  const [alertVaues, setAlertValues] = React.useState<AlertValuesModel>(defaultAlertValues)
  const [selectedCountry, setSelectedCountry] = React.useState<CountriesModel | null>(null)
  const [selectedState, setSelectedState] = React.useState<StatesModel | null>(null)

  const callAllCitiesApi = () => {
    dispatch({ type: 'FETCH_ALL_CITIES' })
  }

  const callAllCountriesApi = () => {
    dispatch({ type: 'FETCH_ALL_COUNTRIES' })
  }

  React.useEffect(() => {
    callAllCountriesApi()
  }, [])

  const callStatesByCountryIdApi = () => {
    dispatch({ type: 'FETCH_STATES_BY_COUNTRY_ID', payload: { countryId: selectedCountry?.id } })
  }

  React.useEffect(() => {
    if (selectedCountry?.id) {
      callStatesByCountryIdApi()
    } else {
      dispatch(StatesReducer.resetAllStatesDataByCountryIdResult())
    }
  }, [selectedCountry])

  const resetForm = () => {
    setValues({
      id: row?.id,
      title: row?.title,
      countryID: row?.countryID,
      stateID: row?.stateID,
      isDeleteable: row?.isDeleteable,
      isAdminDeleteable: row?.isAdminDeleteable,
      dateAdded: row?.dateAdded
    })
    setAlertValues(defaultAlertValues)
    setSelectedCountry(
      getCountryFromCountryId({ countryID: row?.countryID, allCountriesData: allCountriesDataResult?.dataArray })
    )
  }

  React.useEffect(() => {
    resetForm()
  }, [row, allCountriesDataResult?.dataArray])

  React.useEffect(() => {
    const newlySelectedState = getStateFromCountryAndStateId({
      countryID: selectedCountry?.id,
      stateID: selectedState?.id ?? row?.stateID,
      statesByCountryIdData: statesDataByCountryIdResult?.data ?? []
    })
    console.log('newlySelectedState', newlySelectedState)
    setSelectedState(newlySelectedState)
  }, [statesDataByCountryIdResult?.data, selectedCountry])

  const handleTextFieldChange =
    (prop: keyof UpdateCityRequestModel) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value })
    }

  const handleDeleteableRadioChange = (newValue: string) => {
    setValues({ ...values, isDeleteable: newValue === 'yes' ? true : false })
  }

  const handleDeleteableByAdminRadioChange = (newValue: string) => {
    setValues({ ...values, isAdminDeleteable: newValue === 'yes' ? true : false })
  }

  const onUpdateClick = () => {
    if (!selectedCountry?.id || selectedCountry.id === '') {
      setAlertValues({
        severity: 'error',
        message: 'Please select country.',
        isVisible: true
      })
      return
    }
    if (!selectedState?.id || selectedState.id === '') {
      setAlertValues({
        severity: 'error',
        message: 'Please select state.',
        isVisible: true
      })
      return
    }
    if (!values?.id || values.id === '') {
      setAlertValues({
        severity: 'error',
        message: 'Id is missing.',
        isVisible: true
      })
      return
    }
    if (!values?.title || values.title === '') {
      setAlertValues({
        severity: 'error',
        message: 'Please enter title.',
        isVisible: true
      })
      return
    }

    const newValues: UpdateCityRequestModel = {
      ...values,
      countryID: selectedCountry?.id,
      stateID: selectedState?.id
    }

    dispatch({ type: 'UPDATE_CITY', payload: { jsonData: newValues, cityId: values.id } })
  }

  const onResetClick = () => {
    resetForm()
  }

  React.useEffect(() => {
    if (updatedCityResponse?.isCompleted) {
      if (updatedCityResponse?.succeeded) {
        resetForm()
        resetSelectedState?.()
        dispatch(CitiesReducer.resetUpdatedCityResponse())
        callAllCitiesApi()
      } else {
        dispatch(CitiesReducer.resetUpdatedCityResponse())
      }
    }
  }, [updatedCityResponse])

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

  const renderForm = () => {
    return (
      <CardContent>
        <form>
          <Grid container spacing={7}>
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
                          setSelectedCountry(country)
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
          </Grid>
          <Grid item xs={12} sx={{ marginTop: 4.8, marginBottom: 3 }}>
            <Box>
              <ButtonStyled
                style={{ backgroundColor: green[600], color: 'white' }}
                component='label'
                variant='contained'
                onClick={onUpdateClick}
              >
                Update city
              </ButtonStyled>
              <ButtonStyled
                style={{ backgroundColor: red[600], color: 'white', marginLeft: 30 }}
                component='label'
                variant='contained'
                onClick={onResetClick}
              >
                Reset
              </ButtonStyled>
            </Box>
          </Grid>
        </form>
      </CardContent>
    )
  }

  const renderTableCollapse = () => {
    return (
      <StyledTableCell style={{ paddingBottom: 20, paddingTop: 20 }} colSpan={12}>
        <Collapse in={isItemSelected} timeout='auto' unmountOnExit>
          <Box sx={{ margin: 1 }}>
            <Table size='small' aria-label='purchases'>
              <TableHead>
                <StyledTableRow>
                  <StyledTableCell>
                    <Typography style={{ color: 'white' }} variant='subtitle1' gutterBottom component='div'>
                      {`Update ${row?.title} city(ID: ${row?.id})`}
                    </Typography>
                  </StyledTableCell>
                </StyledTableRow>
              </TableHead>
              <TableBody>
                <StyledTableRow key={labelId}>
                  <StyledTableCell component='th' scope='row'>
                    {renderAlert()}
                    {renderForm()}
                  </StyledTableCell>
                </StyledTableRow>
              </TableBody>
            </Table>
          </Box>
        </Collapse>
      </StyledTableCell>
    )
  }

  return <StyledTableRow>{renderTableCollapse()}</StyledTableRow>
}

export default EditCity
