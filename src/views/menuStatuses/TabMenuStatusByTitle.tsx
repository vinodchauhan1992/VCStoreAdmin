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
import {
  AdminMenuStatusesReducer,
  AdminMenusReducer,
  UserRolesReducer,
  useAppDispatch,
  useAppSelector
} from 'src/redux/reducers'
import { AdminMenusModel } from 'src/models/AdminMenusModel'

import FormLabel from '@mui/material/FormLabel'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Radio from '@mui/material/Radio'
import { AdminMenuStatusesModel } from 'src/models/AdminMenuStatusesModel'

const TabMenuStatusByTitle = () => {
  const dispatch = useAppDispatch()

  // ** States
  const [selectedAdminMenuStatusData, setSelectedUserRoleData] = useState<AdminMenuStatusesModel | null>(null)

  // @ts-ignore
  const allAdminMenuStatusesDataResult = useAppSelector(AdminMenuStatusesReducer.selectAllAdminMenuStatusesDataResult)

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
            label='Menu Status ID'
            placeholder='Menu Status ID'
            value={selectedAdminMenuStatusData?.id ?? ''}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            disabled
            fullWidth
            label='Menu status added on'
            placeholder='Menu status added on'
            value={selectedAdminMenuStatusData?.dateAdded ?? 'N/A'}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            disabled
            fullWidth
            label='Menu status updated on'
            placeholder='Menu status updated on'
            value={selectedAdminMenuStatusData?.dateModified ?? 'N/A'}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            disabled
            fullWidth
            label='Menu status description'
            placeholder='Menu status description'
            value={selectedAdminMenuStatusData?.menuStatusDescription ?? 'N/A'}
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
        title='Select admin status!'
        type='empty'
        message='Please select an admin status from above drop down.'
      ></CustomisedErrorEmpty>
    )
  }

  const renderError = () => {
    return (
      <CustomisedErrorEmpty
        title='Error!'
        type='empty'
        message={allAdminMenuStatusesDataResult?.message ?? ''}
      ></CustomisedErrorEmpty>
    )
  }

  const renderData = () => {
    if (allAdminMenuStatusesDataResult?.isCompleted && !allAdminMenuStatusesDataResult?.succeeded) {
      return renderError()
    }
    if (!selectedAdminMenuStatusData) {
      return renderEmpty()
    }

    return renderDetailsFields()
  }

  return (
    <div>
      <CardContent>
        <form>
          <Grid container spacing={7}>
            <Grid item xs={12} sm={selectedAdminMenuStatusData ? 6 : 12}>
              <FormControl fullWidth>
                <InputLabel>Menu title</InputLabel>
                <Select label='Menu title'>
                  {allAdminMenuStatusesDataResult?.dataArray?.map(adminMenuStatus => {
                    return (
                      <MenuItem
                        value={adminMenuStatus?.menuStatusTitle ?? ''}
                        key={`${adminMenuStatus.id}`}
                        onClick={() => {
                          setSelectedUserRoleData(adminMenuStatus)
                        }}
                      >
                        {adminMenuStatus.menuStatusTitle}
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
export default TabMenuStatusByTitle
