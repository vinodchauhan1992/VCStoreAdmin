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
import { AdminSubmenusReducer, useAppDispatch, useAppSelector } from 'src/redux/reducers'

import FormLabel from '@mui/material/FormLabel'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Radio from '@mui/material/Radio'
import { AdminSubmenusModel } from 'src/models/AdminSubmenusModel'

const TabSubmenuByTitle = () => {
  const dispatch = useAppDispatch()

  // ** States
  const [selectedAdminSubmenuData, setSelectedUserRoleData] = useState<AdminSubmenusModel | null>(null)

  // @ts-ignore
  const allAdminSubmenusDataResult = useAppSelector(AdminSubmenusReducer.selectAllAdminSubmenusDataResult)

  useEffect(() => {
    dispatch({ type: 'FETCH_ALL_ADMIN_MENUS' })
  }, [])

  const renderDetailsFields = () => {
    return (
      <>
        <Grid item xs={12} sm={6}>
          <TextField
            disabled
            fullWidth
            label='Submenu ID'
            placeholder='Submenu ID'
            value={selectedAdminSubmenuData?.id ?? ''}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl>
            <FormLabel disabled sx={{ fontSize: '0.875rem' }}>
              Can be deleted?
            </FormLabel>
            <RadioGroup
              row
              defaultValue={selectedAdminSubmenuData?.isDeleteable ? 'yes' : 'no'}
              aria-label='Can be deleted?'
              name='account-settings-info-radio'
            >
              <FormControlLabel value='no' label='No' control={<Radio disabled />} />
              <FormControlLabel value='yes' label='Yes' control={<Radio disabled />} />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl>
            <FormLabel disabled sx={{ fontSize: '0.875rem' }}>
              Can be deleted by admin?
            </FormLabel>
            <RadioGroup
              row
              defaultValue={selectedAdminSubmenuData?.isAdminDeleteable ? 'yes' : 'no'}
              aria-label='Can be deleted by admin?'
              name='account-settings-info-radio'
            >
              <FormControlLabel value='yes' label='Yes' control={<Radio disabled />} />
              <FormControlLabel value='no' label='No' control={<Radio disabled />} />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            disabled
            fullWidth
            label='Submenu added on'
            placeholder='Submenu added on'
            value={selectedAdminSubmenuData?.dateAdded ?? 'N/A'}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            disabled
            fullWidth
            label='Submenu updated on'
            placeholder='Submenu updated on'
            value={selectedAdminSubmenuData?.dateModified ?? 'N/A'}
          />
        </Grid>
        <Grid item xs={6} sm={6}>
          <TextField
            disabled
            fullWidth
            label='Menu'
            placeholder='Menu'
            value={selectedAdminSubmenuData?.adminMenuTitle ?? 'N/A'}
          />
        </Grid>
        <Grid item xs={6} sm={6}>
          <TextField
            disabled
            fullWidth
            label='Submenu status'
            placeholder='Submenu status'
            value={selectedAdminSubmenuData?.status ?? 'N/A'}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            disabled
            fullWidth
            label='Submenu description'
            placeholder='Submenu description'
            value={selectedAdminSubmenuData?.description ?? 'N/A'}
            multiline
            minRows={3}
            sx={{ '& .MuiOutlinedInput-root': { alignItems: 'baseline' } }}
          />
        </Grid>
      </>
    )
  }

  const renderEmpty = () => {
    return (
      <CustomisedErrorEmpty
        title='Select user role!'
        type='empty'
        message='Please select a user role from above drop down.'
      ></CustomisedErrorEmpty>
    )
  }

  const renderError = () => {
    return (
      <CustomisedErrorEmpty
        title='Error!'
        type='empty'
        message={allAdminSubmenusDataResult?.message ?? ''}
      ></CustomisedErrorEmpty>
    )
  }

  const renderData = () => {
    if (allAdminSubmenusDataResult?.isCompleted && !allAdminSubmenusDataResult?.succeeded) {
      return renderError()
    }
    if (!selectedAdminSubmenuData) {
      return renderEmpty()
    }

    return renderDetailsFields()
  }

  return (
    <div>
      <CardContent>
        <form>
          <Grid container spacing={7}>
            <Grid item xs={12} sm={selectedAdminSubmenuData ? 6 : 12}>
              <FormControl fullWidth>
                <InputLabel>Submenu title</InputLabel>
                <Select label='Submenu title'>
                  {allAdminSubmenusDataResult?.dataArray?.map(adminSubmenu => {
                    return (
                      <MenuItem
                        value={adminSubmenu?.submenuTitle ?? ''}
                        key={`${adminSubmenu.id}`}
                        onClick={() => {
                          setSelectedUserRoleData(adminSubmenu)
                        }}
                      >
                        {adminSubmenu.submenuTitle}
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
export default TabSubmenuByTitle
