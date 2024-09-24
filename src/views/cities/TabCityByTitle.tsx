// ** React Imports
import { useEffect, useState } from 'react'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Grid from '@mui/material/Grid'
import CustomisedErrorEmpty from 'src/@core/components/customised-error-empty/CustomisedErrorEmpty'
import { CitiesReducer, CountriesReducer, StatesReducer, useAppDispatch, useAppSelector } from 'src/redux/reducers'
import { CitiesModel } from 'src/models/CitiesModel'
import Radio from '@mui/material/Radio'
import FormLabel from '@mui/material/FormLabel'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import { convertDateIntoReadableFormat } from 'src/utils/CommonUtils'

const TabCityByTitle = () => {
  const dispatch = useAppDispatch()

  // ** States
  const [selectedCityData, setSelectedCityData] = useState<CitiesModel | null>(null)

  // @ts-ignore
  const allCitiesDataResult = useAppSelector(CitiesReducer.selectAllCitiesDataResult)
  // @ts-ignore
  const countryDataByCountryId = useAppSelector(CountriesReducer.selectCountryDataByCountryId)
  // @ts-ignore
  const stateDataByStateIdResult = useAppSelector(StatesReducer.selectStateDataByStateIdResult)

  useEffect(() => {
    dispatch({ type: 'FETCH_ALL_CITIES' })
  }, [])

  useEffect(() => {
    if (selectedCityData) {
      dispatch({ type: 'FETCH_COUNTRY_BY_COUNTRY_ID', payload: { countryId: selectedCityData?.countryID } })
    } else {
      dispatch(CountriesReducer.resetCountryDataByCountryId())
    }
  }, [selectedCityData])

  useEffect(() => {
    if (selectedCityData) {
      dispatch({ type: 'FETCH_STATE_BY_STATE_ID', payload: { stateId: selectedCityData?.stateID } })
    } else {
      dispatch(StatesReducer.resetStateDataByStateId())
    }
  }, [countryDataByCountryId?.data])

  const renderDetailsFields = () => {
    return (
      <>
        <Grid item xs={6} sm={6}>
          <TextField disabled fullWidth label='City ID' placeholder='City ID' value={selectedCityData?.id ?? 'N/A'} />
        </Grid>
        <Grid item xs={6} sm={6}>
          <TextField
            disabled
            fullWidth
            label='City title'
            placeholder='City title'
            value={selectedCityData?.title ?? 'N/A'}
          />
        </Grid>
        <Grid item xs={6} sm={6}>
          <TextField
            disabled
            fullWidth
            label='City code'
            placeholder='City code'
            value={selectedCityData?.code ?? 'N/A'}
          />
        </Grid>
        <Grid item xs={6} sm={6}>
          <TextField
            disabled
            fullWidth
            label='Country ID'
            placeholder='Country ID'
            value={selectedCityData?.countryID ?? 'N/A'}
          />
        </Grid>
        <Grid item xs={6} sm={6}>
          <TextField
            disabled
            fullWidth
            label='Country title'
            placeholder='Country title'
            value={countryDataByCountryId?.data?.title ?? 'N/A'}
          />
        </Grid>
        <Grid item xs={6} sm={6}>
          <TextField
            disabled
            fullWidth
            label='State ID'
            placeholder='State ID'
            value={selectedCityData?.stateID ?? 'N/A'}
          />
        </Grid>
        <Grid item xs={6} sm={6}>
          <TextField
            disabled
            fullWidth
            label='State title'
            placeholder='State title'
            value={stateDataByStateIdResult?.data?.title ?? 'N/A'}
          />
        </Grid>
        <Grid item xs={6} sm={6}>
          <FormControl>
            <FormLabel disabled sx={{ fontSize: '0.875rem' }}>
              Can be deleted?
            </FormLabel>
            <RadioGroup
              row
              defaultValue={selectedCityData?.isDeleteable ? 'yes' : 'no'}
              aria-label='Can be deleted?'
              name='account-settings-info-radio'
              value={selectedCityData?.isDeleteable ? 'yes' : 'no'}
            >
              <FormControlLabel value='no' label='No' control={<Radio disabled />} />
              <FormControlLabel value='yes' label='Yes' control={<Radio disabled />} />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={6} sm={6}>
          <FormControl>
            <FormLabel disabled sx={{ fontSize: '0.875rem' }}>
              Can be deleted by admin?
            </FormLabel>
            <RadioGroup
              row
              defaultValue={selectedCityData?.isAdminDeleteable ? 'yes' : 'no'}
              aria-label='Can be deleted by admin?'
              name='account-settings-info-radio'
              value={selectedCityData?.isAdminDeleteable ? 'yes' : 'no'}
            >
              <FormControlLabel value='yes' label='Yes' control={<Radio disabled />} />
              <FormControlLabel value='no' label='No' control={<Radio disabled />} />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={6} sm={6}>
          <TextField
            disabled
            fullWidth
            label='City added on'
            placeholder='City added on'
            value={selectedCityData?.dateAdded ? convertDateIntoReadableFormat(selectedCityData.dateAdded) : 'N/A'}
          />
        </Grid>
        <Grid item xs={6} sm={6}>
          <TextField
            disabled
            fullWidth
            label='City updated on'
            placeholder='City updated on'
            value={
              selectedCityData?.dateModified ? convertDateIntoReadableFormat(selectedCityData?.dateModified) : 'N/A'
            }
          />
        </Grid>
      </>
    )
  }

  const renderEmpty = () => {
    return (
      <CustomisedErrorEmpty
        title='Select city!'
        type='empty'
        message='Please select a city from above drop down.'
      ></CustomisedErrorEmpty>
    )
  }

  const renderError = () => {
    return (
      <CustomisedErrorEmpty
        title='Error!'
        type='empty'
        message={allCitiesDataResult?.message ?? ''}
      ></CustomisedErrorEmpty>
    )
  }

  const renderData = () => {
    if (allCitiesDataResult?.isCompleted && !allCitiesDataResult?.succeeded) {
      return renderError()
    }
    if (!selectedCityData) {
      return renderEmpty()
    }

    return renderDetailsFields()
  }

  return (
    <div>
      <CardContent>
        <form>
          <Grid container spacing={7}>
            <Grid item xs={12} sm={selectedCityData ? 6 : 12}>
              <FormControl fullWidth>
                <InputLabel>Select city</InputLabel>
                <Select label='Select city'>
                  {allCitiesDataResult?.dataArray?.map(city => {
                    return (
                      <MenuItem
                        value={city?.title ?? ''}
                        key={`${city.id}`}
                        onClick={() => {
                          setSelectedCityData(city)
                        }}
                      >
                        {city.title}
                      </MenuItem>
                    )
                  })}
                </Select>
              </FormControl>
            </Grid>

            {renderData()}
          </Grid>
        </form>
      </CardContent>
    </div>
  )
}
export default TabCityByTitle
