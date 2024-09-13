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
import { UserRoleModel } from 'src/models/UserRoleModel'
import { AdminMenusReducer, UserRolesReducer, useAppDispatch, useAppSelector } from 'src/redux/reducers'
import { AdminMenusModel } from 'src/models/AdminMenusModel'

import FormLabel from '@mui/material/FormLabel'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Radio from '@mui/material/Radio'

const TabAdminMenuByMenuName = () => {
  const dispatch = useAppDispatch()

  // ** States
  const [selectedAdminMenuData, setSelectedUserRoleData] = useState<AdminMenusModel | null>(null)

  // @ts-ignore
  const allAdminMenusDataResult = useAppSelector(AdminMenusReducer.selectAllAdminMenusDataResult)

  useEffect(() => {
    dispatch({ type: 'FETCH_ALL_ADMIN_MENUS' })
  }, [])

  const renderDetailsFields = () => {
    return (
      <>
        <Grid item xs={12} sm={6}>
          <TextField disabled fullWidth label='Menu ID' placeholder='Menu ID' value={selectedAdminMenuData?.id ?? ''} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl>
            <FormLabel disabled sx={{ fontSize: '0.875rem' }}>
              Can be deleted?
            </FormLabel>
            <RadioGroup
              row
              defaultValue={selectedAdminMenuData?.isDeleteable ? 'yes' : 'no'}
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
              defaultValue={selectedAdminMenuData?.isAdminDeleteable ? 'yes' : 'no'}
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
            label='Menu added on'
            placeholder='Menu added on'
            value={selectedAdminMenuData?.dateAdded ?? 'N/A'}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            disabled
            fullWidth
            label='Menu updated on'
            placeholder='Menu updated on'
            value={selectedAdminMenuData?.dateModified ?? 'N/A'}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            disabled
            fullWidth
            label='Menu status'
            placeholder='Menu status'
            value={selectedAdminMenuData?.adminMenuStatus ?? 'N/A'}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            disabled
            fullWidth
            label='Menu description'
            placeholder='Menu description'
            value={selectedAdminMenuData?.description ?? 'N/A'}
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
        message={allAdminMenusDataResult?.message ?? ''}
      ></CustomisedErrorEmpty>
    )
  }

  const renderData = () => {
    if (allAdminMenusDataResult?.isCompleted && !allAdminMenusDataResult?.succeeded) {
      return renderError()
    }
    if (!selectedAdminMenuData) {
      return renderEmpty()
    }

    return renderDetailsFields()
  }

  return (
    <div>
      <CardContent>
        <form>
          <Grid container spacing={7}>
            <Grid item xs={12} sm={selectedAdminMenuData ? 6 : 12}>
              <FormControl fullWidth>
                <InputLabel>Menu title</InputLabel>
                <Select label='Menu title'>
                  {allAdminMenusDataResult?.dataArray?.map(adminMenu => {
                    return (
                      <MenuItem
                        value={adminMenu?.menuTitle ?? ''}
                        key={`${adminMenu.id}`}
                        onClick={() => {
                          setSelectedUserRoleData(adminMenu)
                        }}
                      >
                        {adminMenu.menuTitle}
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
export default TabAdminMenuByMenuName
