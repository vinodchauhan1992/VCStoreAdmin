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
import { UserRolesReducer, useAppDispatch, useAppSelector } from 'src/redux/reducers'

const TabUserRoleByRole = () => {
  const dispatch = useAppDispatch()

  // ** States
  const [selectedUserRoleData, setSelectedUserRoleData] = useState<UserRoleModel | null>(null)
  const [message, setMessage] = useState<string | null>(null)

  // @ts-ignore
  const allUserRolesDataResult = useAppSelector(UserRolesReducer.selectAllUserRolesDataResult)

  useEffect(() => {
    dispatch({ type: 'FETCH_ALL_USER_ROLES' })
  }, [])

  const renderDetailsFields = () => {
    return (
      <>
        <Grid item xs={12} sm={6}>
          <TextField disabled fullWidth label='Role ID' placeholder='Role ID' value={selectedUserRoleData?.id ?? ''} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            disabled
            fullWidth
            label='Role added on'
            placeholder='Role added on'
            value={selectedUserRoleData?.dateAdded ?? 'N/A'}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            disabled
            fullWidth
            label='Role updated on'
            placeholder='Role updated on'
            value={selectedUserRoleData?.dateModified ?? 'N/A'}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            disabled
            fullWidth
            label='Role description'
            placeholder='Role description'
            value={selectedUserRoleData?.description ?? 'N/A'}
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
        message={allUserRolesDataResult?.message ?? ''}
      ></CustomisedErrorEmpty>
    )
  }

  const renderData = () => {
    if (allUserRolesDataResult?.isCompleted && !allUserRolesDataResult?.succeeded) {
      return renderError()
    }
    if (!selectedUserRoleData) {
      return renderEmpty()
    }

    return renderDetailsFields()
  }

  return (
    <div>
      <CardContent>
        <form>
          <Grid container spacing={7}>
            <Grid item xs={12} sm={selectedUserRoleData ? 6 : 12}>
              <FormControl fullWidth>
                <InputLabel>User role</InputLabel>
                <Select label='User role'>
                  {allUserRolesDataResult?.dataArray?.map(userRole => {
                    return (
                      <MenuItem
                        value={userRole?.role ?? ''}
                        key={`${userRole.id}`}
                        onClick={() => {
                          setSelectedUserRoleData(userRole)
                        }}
                      >
                        {userRole.role}
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
export default TabUserRoleByRole
