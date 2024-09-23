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
import { CountriesReducer, useAppDispatch, useAppSelector } from 'src/redux/reducers'
import { CountriesModel } from 'src/models/CountriesModel'
import Radio from '@mui/material/Radio'
import FormLabel from '@mui/material/FormLabel'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import { convertDateIntoReadableFormat } from 'src/utils/CommonUtils'

const TabCountryByTitle = () => {
  const dispatch = useAppDispatch()

  // ** States
  const [selectedCountryData, setSelectedCountryData] = useState<CountriesModel | null>(null)

  // @ts-ignore
  const allCountriesDataResult = useAppSelector(CountriesReducer.selectAllCountriesDataResult)

  useEffect(() => {
    dispatch({ type: 'FETCH_ALL_COUNTRIES' })
  }, [])

  const renderDetailsFields = () => {
    return (
      <>
        <Grid item xs={6} sm={6}>
          <TextField
            disabled
            fullWidth
            label='Country ID'
            placeholder='Country ID'
            value={selectedCountryData?.id ?? 'N/A'}
          />
        </Grid>
        <Grid item xs={6} sm={6}>
          <TextField
            disabled
            fullWidth
            label='Country title'
            placeholder='Country title'
            value={selectedCountryData?.title ?? 'N/A'}
          />
        </Grid>
        <Grid item xs={6} sm={6}>
          <TextField
            disabled
            fullWidth
            label='Country code'
            placeholder='Country code'
            value={selectedCountryData?.code ?? 'N/A'}
          />
        </Grid>
        <Grid item xs={6} sm={6}>
          <FormControl>
            <FormLabel disabled sx={{ fontSize: '0.875rem' }}>
              Can be deleted?
            </FormLabel>
            <RadioGroup
              row
              defaultValue={selectedCountryData?.isDeleteable ? 'yes' : 'no'}
              aria-label='Can be deleted?'
              name='account-settings-info-radio'
              value={selectedCountryData?.isDeleteable ? 'yes' : 'no'}
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
              defaultValue={selectedCountryData?.isAdminDeleteable ? 'yes' : 'no'}
              aria-label='Can be deleted by admin?'
              name='account-settings-info-radio'
              value={selectedCountryData?.isAdminDeleteable ? 'yes' : 'no'}
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
            label='Country added on'
            placeholder='Country added on'
            value={
              selectedCountryData?.dateAdded ? convertDateIntoReadableFormat(selectedCountryData.dateAdded) : 'N/A'
            }
          />
        </Grid>
        <Grid item xs={6} sm={6}>
          <TextField
            disabled
            fullWidth
            label='Country updated on'
            placeholder='Country updated on'
            value={
              selectedCountryData?.dateModified
                ? convertDateIntoReadableFormat(selectedCountryData?.dateModified)
                : 'N/A'
            }
          />
        </Grid>
      </>
    )
  }

  const renderEmpty = () => {
    return (
      <CustomisedErrorEmpty
        title='Select country!'
        type='empty'
        message='Please select a country from above drop down.'
      ></CustomisedErrorEmpty>
    )
  }

  const renderError = () => {
    return (
      <CustomisedErrorEmpty
        title='Error!'
        type='empty'
        message={allCountriesDataResult?.message ?? ''}
      ></CustomisedErrorEmpty>
    )
  }

  const renderData = () => {
    if (allCountriesDataResult?.isCompleted && !allCountriesDataResult?.succeeded) {
      return renderError()
    }
    if (!selectedCountryData) {
      return renderEmpty()
    }

    return renderDetailsFields()
  }

  return (
    <div>
      <CardContent>
        <form>
          <Grid container spacing={7}>
            <Grid item xs={12} sm={selectedCountryData ? 6 : 12}>
              <FormControl fullWidth>
                <InputLabel>User role</InputLabel>
                <Select label='User role'>
                  {allCountriesDataResult?.dataArray?.map(country => {
                    return (
                      <MenuItem
                        value={country?.title ?? ''}
                        key={`${country.id}`}
                        onClick={() => {
                          setSelectedCountryData(country)
                        }}
                      >
                        {country.title}
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
export default TabCountryByTitle
