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
import { UserRoleModel } from 'src/models/UserRoleModel'
import { green, red } from '@mui/material/colors'
import { UserRolesReducer, useAppDispatch, useAppSelector } from 'src/redux/reducers'
import { AlertValuesModel } from 'src/models/AlertValuesModel'
import Alert from '@mui/material/Alert'

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

export interface EditUserRoleProps {
  labelId: string
  row: any
  isItemSelected: boolean
  resetSelectedState?: () => void
}

const EditUserRole = (props: EditUserRoleProps) => {
  const dispatch = useAppDispatch()

  const { labelId, row, isItemSelected, resetSelectedState } = props

  // @ts-ignore
  const updatedUserRoleResponse = useAppSelector(UserRolesReducer.selectUpdatedUserRoleResponse)

  const defaultAlertValues: AlertValuesModel = {
    severity: 'info',
    message: '',
    isVisible: false
  }

  const defaultValues: UserRoleModel = {
    id: '',
    role: '',
    description: '',
    userType: '',
    dateAdded: new Date()
  }

  const [values, setValues] = React.useState<UserRoleModel>(defaultValues)
  const [alertVaues, setAlertValues] = React.useState<AlertValuesModel>(defaultAlertValues)

  const callAllUserRolesApi = () => {
    dispatch({ type: 'FETCH_ALL_USER_ROLES' })
  }

  const resetForm = () => {
    setValues({
      id: row?.id,
      role: row?.role,
      description: row?.description,
      userType: row?.userType,
      dateAdded: row?.dateAdded
    })
    setAlertValues(defaultAlertValues)
  }

  React.useEffect(() => {
    resetForm()
  }, [row])

  const handleTextFieldChange = (prop: keyof UserRoleModel) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const onUpdateClick = () => {
    if (!values?.role || values.role === '') {
      setAlertValues({
        severity: 'error',
        message: 'Please enter role.',
        isVisible: true
      })
      return
    }
    if (!values?.userType || values.userType === '') {
      setAlertValues({
        severity: 'error',
        message: 'Please enter user type.',
        isVisible: true
      })
      return
    }
    if (!values?.description || values.description === '') {
      setAlertValues({
        severity: 'error',
        message: 'Please enter role description.',
        isVisible: true
      })
      return
    }

    dispatch({ type: 'UPDATE_USER_ROLE', payload: { jsonData: values, roleId: values.id } })
  }

  const onResetClick = () => {
    resetForm()
  }

  React.useEffect(() => {
    if (updatedUserRoleResponse?.isCompleted) {
      if (updatedUserRoleResponse?.succeeded) {
        resetForm()
        resetSelectedState?.()
        dispatch(UserRolesReducer.resetUpdatedUserRoleResponse())
        callAllUserRolesApi()
      } else {
        dispatch(UserRolesReducer.resetUpdatedUserRoleResponse())
      }
    }
  }, [updatedUserRoleResponse])

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
                label='User role'
                placeholder='User role'
                value={values.role}
                onChange={handleTextFieldChange('role')}
              />
            </Grid>
            <Grid item xs={6} sm={6}>
              <TextField
                fullWidth
                label='User type'
                placeholder='User type'
                value={values.userType}
                onChange={handleTextFieldChange('userType')}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                fullWidth
                label='Role description'
                placeholder='Role description'
                value={values.description}
                onChange={handleTextFieldChange('description')}
                multiline
                minRows={3}
                sx={{ '& .MuiOutlinedInput-root': { alignItems: 'baseline' } }}
              />
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
                Update user role
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
                      {`Update ${row?.role} role(ID: ${row?.id})`}
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

export default EditUserRole
