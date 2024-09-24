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
import { CountriesReducer, StatesReducer, useAppDispatch, useAppSelector } from 'src/redux/reducers'
import Radio from '@mui/material/Radio'
import FormLabel from '@mui/material/FormLabel'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import { convertDateIntoReadableFormat } from 'src/utils/CommonUtils'
import { StatesModel } from 'src/models/StatesModel'

const TabStateByTitle = () => {
  const dispatch = useAppDispatch()

  // ** States
  const [selectedStateData, setSelectedStateData] = useState<StatesModel | null>(null)

  // @ts-ignore
  const allStatesDataResult = useAppSelector(StatesReducer.selectAllStatesDataResult)
  // @ts-ignore
  const countryDataByCountryId = useAppSelector(CountriesReducer.selectCountryDataByCountryId)

  useEffect(() => {
    dispatch({ type: 'FETCH_ALL_STATES' })
  }, [])

  useEffect(() => {
    if (selectedStateData) {
      dispatch({ type: 'FETCH_COUNTRY_BY_COUNTRY_ID', payload: { countryId: selectedStateData?.countryID } })
    } else {
      dispatch(CountriesReducer.resetCountryDataByCountryId())
    }
  }, [selectedStateData])

  const renderDetailsFields = () => {
    return (
      <>
        <Grid item xs={6} sm={6}>
          <TextField
            disabled
            fullWidth
            label='State ID'
            placeholder='State ID'
            value={selectedStateData?.id ?? 'N/A'}
          />
        </Grid>
        <Grid item xs={6} sm={6}>
          <TextField
            disabled
            fullWidth
            label='Country ID'
            placeholder='Country ID'
            value={selectedStateData?.countryID ?? 'N/A'}
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
            label='State title'
            placeholder='State title'
            value={selectedStateData?.title ?? 'N/A'}
          />
        </Grid>
        <Grid item xs={6} sm={6}>
          <TextField
            disabled
            fullWidth
            label='State code'
            placeholder='State code'
            value={selectedStateData?.code ?? 'N/A'}
          />
        </Grid>
        <Grid item xs={6} sm={6}>
          <FormControl>
            <FormLabel disabled sx={{ fontSize: '0.875rem' }}>
              Can be deleted?
            </FormLabel>
            <RadioGroup
              row
              defaultValue={selectedStateData?.isDeleteable ? 'yes' : 'no'}
              aria-label='Can be deleted?'
              name='account-settings-info-radio'
              value={selectedStateData?.isDeleteable ? 'yes' : 'no'}
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
              defaultValue={selectedStateData?.isAdminDeleteable ? 'yes' : 'no'}
              aria-label='Can be deleted by admin?'
              name='account-settings-info-radio'
              value={selectedStateData?.isAdminDeleteable ? 'yes' : 'no'}
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
            label='State added on'
            placeholder='State added on'
            value={selectedStateData?.dateAdded ? convertDateIntoReadableFormat(selectedStateData.dateAdded) : 'N/A'}
          />
        </Grid>
        <Grid item xs={6} sm={6}>
          <TextField
            disabled
            fullWidth
            label='State updated on'
            placeholder='State updated on'
            value={
              selectedStateData?.dateModified ? convertDateIntoReadableFormat(selectedStateData?.dateModified) : 'N/A'
            }
          />
        </Grid>
      </>
    )
  }

  const renderEmpty = () => {
    return (
      <CustomisedErrorEmpty
        title='Select state!'
        type='empty'
        message='Please select a state from above drop down.'
      ></CustomisedErrorEmpty>
    )
  }

  const renderError = () => {
    return (
      <CustomisedErrorEmpty
        title='Error!'
        type='empty'
        message={allStatesDataResult?.message ?? ''}
      ></CustomisedErrorEmpty>
    )
  }

  const renderData = () => {
    if (allStatesDataResult?.isCompleted && !allStatesDataResult?.succeeded) {
      return renderError()
    }
    if (!selectedStateData) {
      return renderEmpty()
    }

    return renderDetailsFields()
  }

  return (
    <div>
      <CardContent>
        <form>
          <Grid container spacing={7}>
            <Grid item xs={12} sm={selectedStateData ? 6 : 12}>
              <FormControl fullWidth>
                <InputLabel>State</InputLabel>
                <Select
                  label='State'
                  value={selectedStateData?.title ?? ''}
                  defaultValue={selectedStateData?.title ?? ''}
                >
                  {allStatesDataResult?.dataArray?.map(state => {
                    return (
                      <MenuItem
                        value={state?.title ?? ''}
                        key={`${state.id}`}
                        onClick={() => {
                          setSelectedStateData(state)
                        }}
                      >
                        {state.title}
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
export default TabStateByTitle
