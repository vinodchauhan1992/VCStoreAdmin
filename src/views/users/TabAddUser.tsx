// ** React Imports
import { useState, ElementType, ChangeEvent, useEffect } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import CardContent from '@mui/material/CardContent'
import Button, { ButtonProps } from '@mui/material/Button'
import Typography from '@mui/material/Typography'

// ** Icons Imports
import Alert from '@mui/material/Alert'
import { AlertValuesModel } from 'src/models/AlertValuesModel'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import { UserReducer, UserRolesReducer, UserStatusesReducer, useAppDispatch, useAppSelector } from 'src/redux/reducers'
import FormControl from '@mui/material/FormControl'
import { AddUserRequestModel } from 'src/models/UserModel'
import { UserRoleModel } from 'src/models/UserRoleModel'
import { UserStatusModel } from 'src/models/UserStatusModel'
import { addNewUserValidationInfo, getPastDateFromNow } from 'src/utils/UserUtils'
import Divider from '@mui/material/Divider'
import Chip from '@mui/material/Chip'
import { grey } from '@mui/material/colors'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import CustomisedAccordion from 'src/@core/components/customised-accordion/CustomisedAccordion'
import { CustomisedAccordionsObjectProps } from 'src/models/CustomisedAccordionModel'
import moment from 'moment'
import envConfig from 'src/configs/envConfig'

const defaultImage = '/images/avatars/9.jpeg'

const ButtonStyled = styled(Button)<ButtonProps & { component?: ElementType; htmlFor?: string }>(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    textAlign: 'center'
  }
}))

const ResetButtonStyled = styled(Button)<ButtonProps>(({ theme }) => ({
  marginLeft: theme.spacing(4.5),
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    marginLeft: 0,
    textAlign: 'center',
    marginTop: theme.spacing(4)
  }
}))

const Root = styled('div')(({ theme }) => ({
  width: '100%',
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
  '& > :not(style) ~ :not(style)': {
    marginTop: theme.spacing(5)
  }
}))

const TabAddUser = () => {
  const dispatch = useAppDispatch()

  const defaultAlertValues: AlertValuesModel = {
    severity: 'info',
    message: '',
    isVisible: false,
    accordionName: null
  }

  const defaultValues: AddUserRequestModel = {
    email: '',
    username: '',
    password: '',
    firstname: '',
    lastname: '',
    address: '',
    city: '',
    state: '',
    zipcode: '',
    phone: '',
    userRoleID: '',
    userRole: '',
    userStatusID: '',
    userStatus: '',
    dateOfBirth: `${getPastDateFromNow(envConfig.dateOfBirthMaxYear)}`,
    userType: '',
    file: null
  }

  // @ts-ignore
  const addedUserResponse = useAppSelector(UserReducer.selectAddedUserResponse)
  // @ts-ignore
  const allUserStatusesDataResult = useAppSelector(UserStatusesReducer.selectAllUserStatusesDataResult)
  // @ts-ignore
  const allUserRolesDataResult = useAppSelector(UserRolesReducer.selectAllUserRolesDataResult)

  // ** State
  const [values, setValues] = useState<AddUserRequestModel>(defaultValues)
  const [alertVaues, setAlertValues] = useState<AlertValuesModel>(defaultAlertValues)
  const [imageFileData, setImageFileData] = useState<string>(defaultImage)
  const [selectedUserRole, setSelectedUserRole] = useState<UserRoleModel | null>(null)
  const [selectedUserStatus, setSelectedUserStatus] = useState<UserStatusModel | null>(null)
  const [confirmPassword, setConfirmPassword] = useState<string>('')

  const callAllUserRolesApi = () => {
    dispatch({ type: 'FETCH_ALL_USER_ROLES' })
  }

  useEffect(() => {
    callAllUserRolesApi()
  }, [])

  const callAllUserStatusesApi = () => {
    dispatch({ type: 'FETCH_ALL_USER_STATUSES' })
  }

  useEffect(() => {
    callAllUserStatusesApi()
  }, [allUserRolesDataResult?.dataArray])

  const onChange = (file: ChangeEvent) => {
    const reader = new FileReader()
    const { files } = file.target as HTMLInputElement

    console.log('files', files?.[0])
    if (files && files.length !== 0) {
      reader.onload = () => {
        setImageFileData(reader.result as string)
        setValues({ ...values, file: files[0] })
      }

      reader.readAsDataURL(files[0])
    }
  }

  const handleTextFieldChange = (prop: keyof AddUserRequestModel) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const resetForm = () => {
    setValues(defaultValues)
    setAlertValues(defaultAlertValues)
    setImageFileData(defaultImage)
    setSelectedUserRole(null)
    setSelectedUserStatus(null)
    setConfirmPassword('')
  }

  const onResetClick = () => {
    resetForm()
  }

  const onAddNewUserClick = async () => {
    const addNewUserValidationInfoData = addNewUserValidationInfo({
      values,
      selectedUserRole,
      selectedUserStatus,
      imageFileData,
      defaultImage,
      confirmPassword
    })
    if (addNewUserValidationInfoData.severity === 'error') {
      setAlertValues(addNewUserValidationInfoData)
      return
    }

    const newValues: AddUserRequestModel = {
      ...values,
      userRoleID: selectedUserRole?.id ?? '',
      userRole: selectedUserRole?.role ?? '',
      userType: selectedUserRole?.userType ?? '',
      userStatusID: selectedUserStatus?.id ?? '',
      userStatus: selectedUserStatus?.status ?? '',
      dateOfBirth: moment(values?.dateOfBirth).toISOString()
    }

    console.log('newValues', newValues)

    const formData = new FormData()
    Object.entries(newValues).map(([key, value]) => {
      formData.append(key, value)
    })

    dispatch({ type: 'ADD_USER', payload: formData })
  }

  useEffect(() => {
    if (addedUserResponse?.isCompleted) {
      if (addedUserResponse?.succeeded) {
        resetForm()
        dispatch(UserReducer.resetAddedUserResponse())
      } else {
        dispatch(UserReducer.resetAddedUserResponse())
      }
    }
  }, [addedUserResponse])

  const renderAlert = (renderInAccordion?: string | null) => {
    if (alertVaues?.isVisible && renderInAccordion && renderInAccordion === alertVaues?.accordionName) {
      return (
        <Grid container spacing={7}>
          <Grid item xs={12} sm={12} sx={{ marginBottom: 4.8 }}>
            <Alert severity={alertVaues.severity} onClose={() => setAlertValues(defaultAlertValues)}>
              {alertVaues.message}
            </Alert>
          </Grid>
        </Grid>
      )
    }

    return null
  }

  const renderDivider = (isRenderChip: boolean, chipLabel?: string | null, chipColor?: any, chipTextColor?: any) => {
    return (
      <Root style={{ marginTop: 30 }}>
        <Divider>
          {isRenderChip ? (
            <Chip
              label={chipLabel && chipLabel !== '' ? chipLabel : 'Chip'}
              size='medium'
              style={{
                color: chipTextColor ? chipTextColor : 'black',
                backgroundColor: chipColor ? chipColor : grey[300]
              }}
            />
          ) : null}
        </Divider>
      </Root>
    )
  }

  const userImageDetailsChildren = () => {
    return (
      <Grid item xs={12} style={{ padding: 30 }}>
        {renderAlert('upload user image')}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Card sx={{ maxWidth: 120, border: '2px solid ActiveBorder', marginRight: 6.25 }}>
            <CardMedia component='img' image={imageFileData} alt='User image' />
          </Card>
          <Box>
            <ButtonStyled component='label' variant='contained' htmlFor='user-upload-image'>
              Upload New user image
              <input hidden type='file' onChange={onChange} accept='image/png, image/jpeg' id='user-upload-image' />
            </ButtonStyled>
            <ResetButtonStyled color='error' variant='outlined' onClick={() => setImageFileData(defaultImage)}>
              Reset
            </ResetButtonStyled>
            <Typography variant='body2' sx={{ marginTop: 5 }}>
              Allowed PNG or JPEG. Max size of 800K.
            </Typography>
          </Box>
        </Box>
      </Grid>
    )
  }

  const personalDetailsChildren = () => {
    return (
      <Grid container spacing={7} style={{ padding: 30 }}>
        {renderAlert('personal details')}
        <Grid item xs={6} sm={6}>
          <TextField
            fullWidth
            label='First name'
            placeholder='First name'
            value={values.firstname}
            onChange={handleTextFieldChange('firstname')}
            required
          />
        </Grid>
        <Grid item xs={6} sm={6}>
          <TextField
            fullWidth
            label='Last name'
            placeholder='Last name'
            value={values.lastname}
            onChange={handleTextFieldChange('lastname')}
            required
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            fullWidth
            label='Date of birth'
            placeholder='Date of birth'
            value={`${moment(values?.dateOfBirth).format('yyyy-MM-DD')}`}
            onChange={handleTextFieldChange('dateOfBirth')}
            type='date'
            InputLabelProps={{ shrink: true }}
            required
            InputProps={{
              inputProps: {
                min: `${getPastDateFromNow(envConfig.dateOfBirthMinYear)}`,
                max: `${getPastDateFromNow(envConfig.dateOfBirthMaxYear)}`
              }
            }}
          />
        </Grid>
      </Grid>
    )
  }

  const roleDetailsChildren = () => {
    return (
      <Grid container spacing={7} style={{ padding: 30 }}>
        {renderAlert('role details')}
        <Grid item xs={selectedUserRole?.id ? 6 : 12} sm={selectedUserRole?.id ? 6 : 12}>
          <FormControl fullWidth>
            <InputLabel>Role</InputLabel>
            <Select label='Role'>
              {allUserRolesDataResult?.dataArray?.map(userRole => {
                return (
                  <MenuItem
                    value={userRole?.role ?? ''}
                    key={`${userRole.id}`}
                    onClick={() => {
                      setSelectedUserRole(userRole)
                    }}
                  >
                    {userRole.role}
                  </MenuItem>
                )
              })}
            </Select>
          </FormControl>
        </Grid>
        {selectedUserRole?.id ? (
          <Grid item xs={6} sm={6}>
            <TextField
              fullWidth
              placeholder='User type'
              value={selectedUserRole?.userType}
              onChange={handleTextFieldChange('userType')}
              required
              disabled
            />
          </Grid>
        ) : null}
      </Grid>
    )
  }

  const statusDetailsChildren = () => {
    return (
      <Grid container spacing={7} style={{ padding: 30 }}>
        {renderAlert('status details')}
        <Grid item xs={12} sm={12}>
          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select label='Status'>
              {allUserStatusesDataResult?.dataArray?.map(userStatus => {
                return (
                  <MenuItem
                    value={userStatus?.status ?? ''}
                    key={`${userStatus.id}`}
                    onClick={() => {
                      setSelectedUserStatus(userStatus)
                    }}
                  >
                    {userStatus.status}
                  </MenuItem>
                )
              })}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    )
  }

  const contactDetailsChildren = () => {
    return (
      <Grid container spacing={7} style={{ padding: 30 }}>
        {renderAlert('contact details')}
        <Grid item xs={6} sm={6}>
          <TextField
            fullWidth
            label='Email address'
            placeholder='Email address'
            value={values.email}
            onChange={handleTextFieldChange('email')}
            required
            type='email'
          />
        </Grid>
        <Grid item xs={6} sm={6}>
          <TextField
            fullWidth
            label='Username'
            placeholder='Username'
            value={values.username}
            onChange={handleTextFieldChange('username')}
            required
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            fullWidth
            label='Phone number'
            placeholder='Phone number'
            value={values.phone}
            onChange={handleTextFieldChange('phone')}
            required
            type='number'
            onInput={(e: any) => {
              e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 10)
            }}
          />
        </Grid>
      </Grid>
    )
  }

  const addressDetailsChildren = () => {
    return (
      <Grid container spacing={7} style={{ padding: 30 }}>
        {renderAlert('address details')}
        <Grid item xs={6} sm={6}>
          <TextField
            fullWidth
            label='City'
            placeholder='City'
            value={values.city}
            onChange={handleTextFieldChange('city')}
            required
          />
        </Grid>
        <Grid item xs={6} sm={6}>
          <TextField
            fullWidth
            label='State'
            placeholder='State'
            value={values.state}
            onChange={handleTextFieldChange('state')}
            required
          />
        </Grid>
        <Grid item xs={6} sm={6}>
          <TextField
            fullWidth
            label='Zipcode'
            placeholder='Zipcode'
            value={values.zipcode}
            onChange={handleTextFieldChange('zipcode')}
            required
          />
        </Grid>
        <Grid item xs={6} sm={6}>
          <TextField
            fullWidth
            label='Address'
            placeholder='Address'
            value={values.address}
            onChange={handleTextFieldChange('address')}
            multiline
            minRows={3}
            sx={{ '& .MuiOutlinedInput-root': { alignItems: 'baseline' } }}
            required
          />
        </Grid>
      </Grid>
    )
  }

  const passwordDetailsChildren = () => {
    return (
      <Grid container spacing={7} style={{ padding: 30 }}>
        {renderAlert('password details')}
        <Grid item xs={6} sm={6}>
          <TextField
            fullWidth
            label='Password'
            placeholder='Password'
            value={values.password}
            onChange={handleTextFieldChange('password')}
            required
            type='password'
          />
        </Grid>
        <Grid item xs={6} sm={6}>
          <TextField
            fullWidth
            label='Confirm password'
            placeholder='Confirm password'
            value={confirmPassword}
            onChange={(event: ChangeEvent<HTMLInputElement>) => setConfirmPassword(event.target.value)}
            required
            type='password'
          />
        </Grid>
      </Grid>
    )
  }

  const getCustomisedAccordionsArray = () => {
    const dataArr: CustomisedAccordionsObjectProps[] = [
      {
        id: '1',
        accordionSummary: 'Upload user image',
        accordionName: 'upload user image',
        accordionDetailsChildren: () => userImageDetailsChildren()
      },
      {
        id: '2',
        accordionSummary: 'Personal details',
        accordionName: 'personal details',
        accordionDetailsChildren: () => personalDetailsChildren()
      },
      {
        id: '3',
        accordionSummary: 'Role details',
        accordionName: 'role details',
        accordionDetailsChildren: () => roleDetailsChildren()
      },
      {
        id: '4',
        accordionSummary: 'Status details',
        accordionName: 'status details',
        accordionDetailsChildren: () => statusDetailsChildren()
      },
      {
        id: '5',
        accordionSummary: 'Contact details',
        accordionName: 'contact details',
        accordionDetailsChildren: () => contactDetailsChildren()
      },
      {
        id: '6',
        accordionSummary: 'Address details',
        accordionName: 'address details',
        accordionDetailsChildren: () => addressDetailsChildren()
      },
      {
        id: '7',
        accordionSummary: 'Password details',
        accordionName: 'password details',
        accordionDetailsChildren: () => passwordDetailsChildren()
      }
    ]
    return dataArr
  }

  const renderDataWithAccordion = () => {
    const customisedAccordionsArray = getCustomisedAccordionsArray()
    return (
      <CustomisedAccordion
        customisedAccordionsArray={customisedAccordionsArray}
        defaultSelected={customisedAccordionsArray[0]}
        isExpandAllBtnVisible
        defaultControlled
        showControlledOption
      />
    )
  }

  return (
    <div>
      <CardContent>
        <form>
          <Grid container spacing={7}>
            <Grid item xs={12} sm={12}>
              {renderDataWithAccordion()}
            </Grid>
          </Grid>
          {renderDivider(false)}
          <Grid item xs={12} sx={{ marginTop: 10, marginBottom: 3 }}>
            <Box>
              <ButtonStyled component='label' variant='contained' onClick={onAddNewUserClick}>
                Add new user
              </ButtonStyled>
              <ResetButtonStyled color='error' variant='outlined' onClick={onResetClick}>
                Reset
              </ResetButtonStyled>
            </Box>
          </Grid>
        </form>
      </CardContent>
    </div>
  )
}

export default TabAddUser
