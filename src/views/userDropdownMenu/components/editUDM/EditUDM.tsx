import * as React from 'react'
import Collapse from '@mui/material/Collapse'
import TableHead from '@mui/material/TableHead'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import { styled } from '@mui/material/styles'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import CardContent from '@mui/material/CardContent'
import Button, { ButtonProps } from '@mui/material/Button'
import { green, red } from '@mui/material/colors'
import { UserDropdownMenusReducer, useAppDispatch, useAppSelector } from 'src/redux/reducers'
import { AlertValuesModel } from 'src/models/AlertValuesModel'
import Alert from '@mui/material/Alert'
import { UpdateUDMRequestModel } from 'src/models/UserDropdownMenusModel'
import Radio from '@mui/material/Radio'
import FormLabel from '@mui/material/FormLabel'
import RadioGroup from '@mui/material/RadioGroup'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14
  }
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0
  }
}))

const ButtonStyled = styled(Button)<ButtonProps & { component?: React.ElementType; htmlFor?: string }>(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    textAlign: 'center'
  }
}))

export interface EditUDMProps {
  labelId: string
  row: any
  isItemSelected: boolean
  resetSelectedState?: () => void
}

const EditUDM = (props: EditUDMProps) => {
  const dispatch = useAppDispatch()

  const { labelId, row, isItemSelected, resetSelectedState } = props

  // @ts-ignore
  const updatedUDMResponse = useAppSelector(UserDropdownMenusReducer.selectUpdatedUDMResponse)
  // @ts-ignore
  const allUDMSDataResult = useAppSelector(UserDropdownMenusReducer.selectAllUDMSDataResult)
  // @ts-ignore
  const udmsMaxPriorityDataValue = useAppSelector(UserDropdownMenusReducer.selectUDMSMaxPriorityDataValue)

  const defaultAlertValues: AlertValuesModel = {
    severity: 'info',
    message: '',
    isVisible: false
  }

  const defaultValues: UpdateUDMRequestModel = {
    id: '',
    title: '',
    menuPath: '',
    priority: 1,
    isActive: true,
    isDeleteable: false,
    isAdminDeleteable: true,
    dateAdded: new Date()
  }

  const [values, setValues] = React.useState<UpdateUDMRequestModel>(defaultValues)
  const [alertVaues, setAlertValues] = React.useState<AlertValuesModel>(defaultAlertValues)

  const callAllUDMSApi = () => {
    dispatch({ type: 'FETCH_ALL_UDMS' })
  }

  const callUDMSMaxPriorityApi = () => {
    dispatch({ type: 'FETCH_UDMS_MAX_PRIORITY' })
  }

  React.useEffect(() => {
    callUDMSMaxPriorityApi()
  }, [allUDMSDataResult?.dataArray])

  const resetForm = () => {
    setValues({
      id: row?.id,
      title: row?.title,
      menuPath: row?.menuPath,
      priority: row?.priority,
      isActive: row?.isActive,
      isDeleteable: row?.isDeleteable,
      isAdminDeleteable: row?.isAdminDeleteable,
      dateAdded: row?.dateAdded
    })
    setAlertValues(defaultAlertValues)
  }

  React.useEffect(() => {
    resetForm()
  }, [row])

  const handleTextFieldChange = (prop: keyof UpdateUDMRequestModel) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleIsActiveRadioChange = (newValue: string) => {
    setValues({ ...values, isActive: newValue === 'yes' ? true : false })
  }

  const handleDeleteableRadioChange = (newValue: string) => {
    setValues({ ...values, isDeleteable: newValue === 'yes' ? true : false })
  }

  const handleDeleteableByAdminRadioChange = (newValue: string) => {
    setValues({ ...values, isAdminDeleteable: newValue === 'yes' ? true : false })
  }

  const onUpdateClick = () => {
    if (!values?.id || values.id === '') {
      setAlertValues({
        severity: 'error',
        message: 'Id is missing.',
        isVisible: true
      })
      return
    }
    if (!values?.title || values.title === '') {
      setAlertValues({
        severity: 'error',
        message: 'Please enter title.',
        isVisible: true
      })
      return
    }
    if (!values?.menuPath || values.menuPath === '') {
      setAlertValues({
        severity: 'error',
        message: 'Please enter menu path.',
        isVisible: true
      })
      return
    }
    if (!values?.priority || values.priority <= 0) {
      setAlertValues({
        severity: 'error',
        message: 'Please enter a valid priority.',
        isVisible: true
      })
      return
    }

    dispatch({ type: 'UPDATE_UDM', payload: { jsonData: values, udmId: values.id } })
  }

  const onResetClick = () => {
    resetForm()
  }

  React.useEffect(() => {
    if (updatedUDMResponse?.isCompleted) {
      if (updatedUDMResponse?.succeeded) {
        resetForm()
        resetSelectedState?.()
        dispatch(UserDropdownMenusReducer.resetUpdatedUDMResponse())
        callAllUDMSApi()
      } else {
        dispatch(UserDropdownMenusReducer.resetUpdatedUDMResponse())
      }
    }
  }, [updatedUDMResponse])

  const renderAlert = () => {
    if (alertVaues?.isVisible) {
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

  const renderInfoAlert = () => {
    if (udmsMaxPriorityDataValue !== undefined && udmsMaxPriorityDataValue !== null) {
      return (
        <Grid container spacing={7}>
          <Grid item xs={12} sm={12} sx={{ marginBottom: 4.8 }}>
            <Alert severity='info'>{`Currently highest registered priority is ${
              udmsMaxPriorityDataValue > 0 ? udmsMaxPriorityDataValue - 1 : 0
            }. So it must be greater than ${
              udmsMaxPriorityDataValue > 0 ? udmsMaxPriorityDataValue - 1 : 0
            } Which is ${udmsMaxPriorityDataValue}`}</Alert>
          </Grid>
        </Grid>
      )
    }
    return null
  }

  const renderForm = () => {
    return (
      <CardContent>
        {renderInfoAlert()}
        <form>
          <Grid container spacing={7}>
            <Grid item xs={6} sm={6}>
              <TextField
                fullWidth
                label='UDM title'
                placeholder='UDM title'
                value={values.title}
                onChange={handleTextFieldChange('title')}
              />
            </Grid>
            <Grid item xs={6} sm={6}>
              <TextField
                fullWidth
                label='UDM priority'
                placeholder='UDM priority'
                value={values.priority}
                onChange={handleTextFieldChange('priority')}
                type='number'
              />
            </Grid>
            <Grid item xs={6} sm={6}>
              <TextField
                fullWidth
                label='UDM menu path'
                placeholder='UDM menu path'
                value={values.menuPath}
                onChange={handleTextFieldChange('menuPath')}
              />
            </Grid>
            <Grid item xs={6} sm={6}>
              <FormControl>
                <FormLabel sx={{ fontSize: '0.875rem' }}>Is menu active?</FormLabel>
                <RadioGroup
                  row
                  defaultValue={values?.isActive ? 'yes' : 'no'}
                  aria-label='Is menu active?'
                  name='account-settings-info-radio'
                  value={values?.isActive ? 'yes' : 'no'}
                >
                  <FormControlLabel
                    value='no'
                    label='No'
                    control={<Radio onClick={() => handleIsActiveRadioChange('no')} />}
                  />
                  <FormControlLabel
                    value='yes'
                    label='Yes'
                    control={<Radio onClick={() => handleIsActiveRadioChange('yes')} />}
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={6} sm={6}>
              <FormControl>
                <FormLabel sx={{ fontSize: '0.875rem' }}>Can be deleted?</FormLabel>
                <RadioGroup
                  row
                  defaultValue={values?.isDeleteable ? 'yes' : 'no'}
                  aria-label='Can be deleted?'
                  name='account-settings-info-radio'
                  value={values?.isDeleteable ? 'yes' : 'no'}
                >
                  <FormControlLabel
                    value='no'
                    label='No'
                    control={<Radio onClick={() => handleDeleteableRadioChange('no')} />}
                  />
                  <FormControlLabel
                    value='yes'
                    label='Yes'
                    control={<Radio onClick={() => handleDeleteableRadioChange('yes')} />}
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={6} sm={6}>
              <FormControl>
                <FormLabel sx={{ fontSize: '0.875rem' }}>Can be deleted by admin?</FormLabel>
                <RadioGroup
                  row
                  defaultValue={values?.isAdminDeleteable ? 'yes' : 'no'}
                  aria-label='Can be deleted by admin?'
                  name='account-settings-info-radio'
                  value={values?.isAdminDeleteable ? 'yes' : 'no'}
                >
                  <FormControlLabel
                    value='yes'
                    label='Yes'
                    control={<Radio onClick={() => handleDeleteableByAdminRadioChange('yes')} />}
                  />
                  <FormControlLabel
                    value='no'
                    label='No'
                    control={<Radio onClick={() => handleDeleteableByAdminRadioChange('no')} />}
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>
          <Grid item xs={12} sx={{ marginTop: 4.8, marginBottom: 3 }}>
            <Box>
              <ButtonStyled
                style={{ backgroundColor: green[600], color: 'white' }}
                component='label'
                variant='contained'
                onClick={onUpdateClick}
              >
                Update menu
              </ButtonStyled>
              <ButtonStyled
                style={{ backgroundColor: red[600], color: 'white', marginLeft: 30 }}
                component='label'
                variant='contained'
                onClick={onResetClick}
              >
                Reset
              </ButtonStyled>
            </Box>
          </Grid>
        </form>
      </CardContent>
    )
  }

  const renderTableCollapse = () => {
    return (
      <StyledTableCell style={{ paddingBottom: 20, paddingTop: 20 }} colSpan={12}>
        <Collapse in={isItemSelected} timeout='auto' unmountOnExit>
          <Box sx={{ margin: 1 }}>
            <Table size='small' aria-label='purchases'>
              <TableHead>
                <StyledTableRow>
                  <StyledTableCell>
                    <Typography style={{ color: 'white' }} variant='subtitle1' gutterBottom component='div'>
                      {`Update ${row?.title} menu(ID: ${row?.id})`}
                    </Typography>
                  </StyledTableCell>
                </StyledTableRow>
              </TableHead>
              <TableBody>
                <StyledTableRow key={labelId}>
                  <StyledTableCell component='th' scope='row'>
                    {renderAlert()}
                    {renderForm()}
                  </StyledTableCell>
                </StyledTableRow>
              </TableBody>
            </Table>
          </Box>
        </Collapse>
      </StyledTableCell>
    )
  }

  return <StyledTableRow>{renderTableCollapse()}</StyledTableRow>
}

export default EditUDM
