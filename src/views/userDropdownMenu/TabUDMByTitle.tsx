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
import { UserDropdownMenusReducer, useAppDispatch, useAppSelector } from 'src/redux/reducers'
import { UDMSModel } from 'src/models/UserDropdownMenusModel'
import Radio from '@mui/material/Radio'
import FormLabel from '@mui/material/FormLabel'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import { convertDateIntoReadableFormat } from 'src/utils/CommonUtils'

const TabUDMByTitle = () => {
  const dispatch = useAppDispatch()

  // ** States
  const [selectedUDMData, setSelectedUDMData] = useState<UDMSModel | null>(null)

  // @ts-ignore
  const allUDMSDataResult = useAppSelector(UserDropdownMenusReducer.selectAllUDMSDataResult)

  useEffect(() => {
    dispatch({ type: 'FETCH_ALL_UDMS' })
  }, [])

  const renderDetailsFields = () => {
    return (
      <>
        <Grid item xs={6} sm={6}>
          <TextField disabled fullWidth label='UDM ID' placeholder='UDM ID' value={selectedUDMData?.id ?? 'N/A'} />
        </Grid>
        <Grid item xs={6} sm={6}>
          <TextField
            disabled
            fullWidth
            label='UDM title'
            placeholder='UDM title'
            value={selectedUDMData?.title ?? 'N/A'}
          />
        </Grid>
        <Grid item xs={6} sm={6}>
          <TextField
            disabled
            fullWidth
            label='UDM priority'
            placeholder='UDM priority'
            value={selectedUDMData?.priority ?? 'N/A'}
          />
        </Grid>
        <Grid item xs={6} sm={6}>
          <TextField
            disabled
            fullWidth
            label='UDM menu path'
            placeholder='UDM menu path'
            value={selectedUDMData?.menuPath ?? 'N/A'}
          />
        </Grid>
        <Grid item xs={6} sm={6}>
          <FormControl>
            <FormLabel disabled sx={{ fontSize: '0.875rem' }}>
              Is menu active?
            </FormLabel>
            <RadioGroup
              row
              defaultValue={selectedUDMData?.isActive ? 'yes' : 'no'}
              aria-label='Is menu active?'
              name='account-settings-info-radio'
              value={selectedUDMData?.isActive ? 'yes' : 'no'}
            >
              <FormControlLabel value='no' label='No' control={<Radio disabled />} />
              <FormControlLabel value='yes' label='Yes' control={<Radio disabled />} />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={6} sm={6}>
          <FormControl>
            <FormLabel disabled sx={{ fontSize: '0.875rem' }}>
              Can be deleted?
            </FormLabel>
            <RadioGroup
              row
              defaultValue={selectedUDMData?.isDeleteable ? 'yes' : 'no'}
              aria-label='Can be deleted?'
              name='account-settings-info-radio'
              value={selectedUDMData?.isDeleteable ? 'yes' : 'no'}
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
              defaultValue={selectedUDMData?.isAdminDeleteable ? 'yes' : 'no'}
              aria-label='Can be deleted by admin?'
              name='account-settings-info-radio'
              value={selectedUDMData?.isAdminDeleteable ? 'yes' : 'no'}
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
            label='UDM added on'
            placeholder='UDM added on'
            value={selectedUDMData?.dateAdded ? convertDateIntoReadableFormat(selectedUDMData.dateAdded) : 'N/A'}
          />
        </Grid>
        <Grid item xs={6} sm={6}>
          <TextField
            disabled
            fullWidth
            label='UDM updated on'
            placeholder='UDM updated on'
            value={selectedUDMData?.dateModified ? convertDateIntoReadableFormat(selectedUDMData?.dateModified) : 'N/A'}
          />
        </Grid>
      </>
    )
  }

  const renderEmpty = () => {
    return (
      <CustomisedErrorEmpty
        title='Select udm!'
        type='empty'
        message='Please select a udm from above drop down.'
      ></CustomisedErrorEmpty>
    )
  }

  const renderError = () => {
    return (
      <CustomisedErrorEmpty
        title='Error!'
        type='empty'
        message={allUDMSDataResult?.message ?? ''}
      ></CustomisedErrorEmpty>
    )
  }

  const renderData = () => {
    if (allUDMSDataResult?.isCompleted && !allUDMSDataResult?.succeeded) {
      return renderError()
    }
    if (!selectedUDMData) {
      return renderEmpty()
    }

    return renderDetailsFields()
  }

  return (
    <div>
      <CardContent>
        <form>
          <Grid container spacing={7}>
            <Grid item xs={12} sm={selectedUDMData ? 6 : 12}>
              <FormControl fullWidth>
                <InputLabel>UDM</InputLabel>
                <Select label='UDM'>
                  {allUDMSDataResult?.dataArray?.map(udm => {
                    return (
                      <MenuItem
                        value={udm?.title ?? ''}
                        key={`${udm.id}`}
                        onClick={() => {
                          setSelectedUDMData(udm)
                        }}
                      >
                        {udm.title}
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
export default TabUDMByTitle
