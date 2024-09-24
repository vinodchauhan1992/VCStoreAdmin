// ** React Imports
import { useEffect, useState } from 'react'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Grid from '@mui/material/Grid'
import CustomisedErrorEmpty from 'src/@core/components/customised-error-empty/CustomisedErrorEmpty'
import { UserReducer, useAppDispatch, useAppSelector } from 'src/redux/reducers'
import UserSmartCard from 'src/views/users/components/user-smart-card/UserSmartCard'
import { UserModel } from 'src/models/UserModel'

const TabUserByTitle = () => {
  const dispatch = useAppDispatch()

  // @ts-ignore
  const allUsersDataResult = useAppSelector(UserReducer.selectAllUsersDataResult)

  // ** States
  const [selectedUserData, setSelectedUserData] = useState<UserModel | null>(null)

  useEffect(() => {
    dispatch({ type: 'FETCH_ALL_BRANDS' })
  }, [])

  const renderDetailsFields = () => {
    return (
      <Grid item xs={12} sm={12}>
        <UserSmartCard
          userData={selectedUserData}
          dataIndex={0}
          isButton1Visible={false}
          isButton2Visible={false}
          forPage='userByTitle'
        />
      </Grid>
    )
  }

  const renderEmpty = () => {
    return (
      <CustomisedErrorEmpty
        title='Select username!'
        type='empty'
        message='Please select a username from above drop down.'
      ></CustomisedErrorEmpty>
    )
  }

  const renderError = () => {
    return (
      <CustomisedErrorEmpty
        title='Error!'
        type='empty'
        message={allUsersDataResult?.message ?? ''}
      ></CustomisedErrorEmpty>
    )
  }

  const renderData = () => {
    if (allUsersDataResult?.isCompleted && !allUsersDataResult?.succeeded) {
      return renderError()
    }
    if (!selectedUserData) {
      return renderEmpty()
    }

    return renderDetailsFields()
  }

  return (
    <div>
      <CardContent>
        <form>
          <Grid container spacing={7}>
            <Grid item xs={12} sm={12}>
              <FormControl fullWidth>
                <InputLabel>Username</InputLabel>
                <Select label='Username'>
                  {allUsersDataResult?.dataArray?.map(user => {
                    return (
                      <MenuItem
                        value={
                          user?.username ? `${user.username}(${user?.name?.firstname} ${user?.name?.lastname})` : ''
                        }
                        key={`${user?.id}`}
                        onClick={() => {
                          setSelectedUserData(user)
                        }}
                      >
                        {`${user.username}(${user?.name?.firstname} ${user?.name?.lastname})`}
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
export default TabUserByTitle
