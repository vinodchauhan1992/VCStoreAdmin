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
import { UserStatusModel } from 'src/models/UserStatusModel'
import { UserStatusesReducer, useAppDispatch, useAppSelector } from 'src/redux/reducers'

const TabUserStatusByStatus = () => {
  const dispatch = useAppDispatch()

  // ** States
  const [selectedUserStatusData, setSelectedUserStatusData] = useState<UserStatusModel | null>(null)

  // @ts-ignore
  const allUserStatusesDataResult = useAppSelector(UserStatusesReducer.selectAllUserStatusesDataResult)

  useEffect(() => {
    dispatch({ type: 'FETCH_ALL_USER_STATUSES' })
  }, [])

  const renderDetailsFields = () => {
    return (
      <>
        <Grid item xs={12} sm={6}>
          <TextField
            disabled
            fullWidth
            label='User Status ID'
            placeholder='User Status ID'
            value={selectedUserStatusData?.id ?? ''}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            disabled
            fullWidth
            label='Status added on'
            placeholder='Status added on'
            value={selectedUserStatusData?.dateAdded ?? 'N/A'}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            disabled
            fullWidth
            label='Status updated on'
            placeholder='Status updated on'
            value={selectedUserStatusData?.dateModified ?? 'N/A'}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            disabled
            fullWidth
            label='Status description'
            placeholder='Status description'
            value={selectedUserStatusData?.description ?? 'N/A'}
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
        title='Select user status!'
        type='empty'
        message={'Please select a user status from drop down.'}
      ></CustomisedErrorEmpty>
    )
  }

  const renderError = () => {
    return (
      <CustomisedErrorEmpty
        title='Error!'
        type='empty'
        message={allUserStatusesDataResult?.message ?? ''}
      ></CustomisedErrorEmpty>
    )
  }

  const renderData = () => {
    if (allUserStatusesDataResult?.isCompleted && !allUserStatusesDataResult?.succeeded) {
      return renderError()
    }
    if (!selectedUserStatusData) {
      return renderEmpty()
    }

    return renderDetailsFields()
  }

  return (
    <div>
      <CardContent>
        <form>
          <Grid container spacing={7}>
            <Grid item xs={12} sm={selectedUserStatusData ? 6 : 12}>
              <FormControl fullWidth>
                <InputLabel>User status</InputLabel>
                <Select label='User role'>
                  {allUserStatusesDataResult?.dataArray?.map(userStatus => {
                    return (
                      <MenuItem
                        value={userStatus?.status ?? ''}
                        key={`${userStatus.id}`}
                        onClick={() => {
                          setSelectedUserStatusData(userStatus)
                        }}
                      >
                        {userStatus.status}
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
export default TabUserStatusByStatus
