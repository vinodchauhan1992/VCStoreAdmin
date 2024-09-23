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
import { CountriesReducer, useAppDispatch, useAppSelector } from 'src/redux/reducers'
import { AlertValuesModel } from 'src/models/AlertValuesModel'
import Alert from '@mui/material/Alert'
import { UpdateCountryRequestModel } from 'src/models/CountriesModel'
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

export interface EditCountryProps {
  labelId: string
  row: any
  isItemSelected: boolean
  resetSelectedState?: () => void
}

const EditCountry = (props: EditCountryProps) => {
  const dispatch = useAppDispatch()

  const { labelId, row, isItemSelected, resetSelectedState } = props

  // @ts-ignore
  const updatedCountryResponse = useAppSelector(CountriesReducer.selectUpdatedCountryResponse)

  const defaultAlertValues: AlertValuesModel = {
    severity: 'info',
    message: '',
    isVisible: false
  }

  const defaultValues: UpdateCountryRequestModel = {
    id: '',
    title: '',
    code: '',
    isDeleteable: false,
    isAdminDeleteable: true,
    dateAdded: new Date()
  }

  const [values, setValues] = React.useState<UpdateCountryRequestModel>(defaultValues)
  const [alertVaues, setAlertValues] = React.useState<AlertValuesModel>(defaultAlertValues)

  const callAllCountriesApi = () => {
    dispatch({ type: 'FETCH_ALL_COUNTRIES' })
  }

  const resetForm = () => {
    setValues({
      id: row?.id,
      title: row?.title,
      code: row?.code,
      isDeleteable: row?.isDeleteable,
      isAdminDeleteable: row?.isAdminDeleteable,
      dateAdded: row?.dateAdded
    })
    setAlertValues(defaultAlertValues)
  }

  React.useEffect(() => {
    resetForm()
  }, [row])

  const handleTextFieldChange =
    (prop: keyof UpdateCountryRequestModel) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value })
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
    if (!values?.code || values.code === '') {
      setAlertValues({
        severity: 'error',
        message: 'Please enter code.',
        isVisible: true
      })
      return
    }

    dispatch({ type: 'UPDATE_COUNTRY', payload: { jsonData: values, countryId: values.id } })
  }

  const onResetClick = () => {
    resetForm()
  }

  React.useEffect(() => {
    if (updatedCountryResponse?.isCompleted) {
      if (updatedCountryResponse?.succeeded) {
        resetForm()
        resetSelectedState?.()
        dispatch(CountriesReducer.resetUpdatedCountryResponse())
        callAllCountriesApi()
      } else {
        dispatch(CountriesReducer.resetUpdatedCountryResponse())
      }
    }
  }, [updatedCountryResponse])

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

  const renderForm = () => {
    return (
      <CardContent>
        <form>
          <Grid container spacing={7}>
            <Grid item xs={6} sm={6}>
              <TextField
                fullWidth
                label='Country title'
                placeholder='Country title'
                value={values.title}
                onChange={handleTextFieldChange('title')}
              />
            </Grid>
            <Grid item xs={6} sm={6}>
              <TextField
                fullWidth
                label='Country code'
                placeholder='Country code'
                value={values.code}
                onChange={handleTextFieldChange('code')}
              />
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
                Update country
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
                      {`Update ${row?.title} country(ID: ${row?.id})`}
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

export default EditCountry
