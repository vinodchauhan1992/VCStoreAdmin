// ** React Imports
import { SyntheticEvent, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import { styled } from '@mui/material/styles'
import MuiTab, { TabProps } from '@mui/material/Tab'

// ** Icons Imports
import AccountSearchOutline from 'mdi-material-ui/AccountSearchOutline'
import AccountPlusOutline from 'mdi-material-ui/AccountPlusOutline'
import AccountWrenchOutline from 'mdi-material-ui/AccountWrenchOutline'

// ** Demo Tabs Imports
import TabAllUserRoles from 'src/views/userRoles/TabAllUserRoles'
import TabUserRoleByRole from 'src/views/userRoles/TabUserRoleByRole'
import TabAddUserRole from 'src/views/userRoles/TabAddUserRole'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'

const Tab = styled(MuiTab)<TabProps>(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    minWidth: 100
  },
  [theme.breakpoints.down('sm')]: {
    minWidth: 67
  }
}))

const TabName = styled('span')(({ theme }) => ({
  lineHeight: 1.71,
  fontSize: '0.875rem',
  marginLeft: theme.spacing(2.4),
  [theme.breakpoints.down('md')]: {
    display: 'none'
  }
}))

const UserRoles = () => {
  // ** State
  const [value, setValue] = useState<string>('allUserRoles')

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  return (
    <Card>
      <TabContext value={value}>
        <TabList
          onChange={handleChange}
          aria-label='userRoles tabs'
          sx={{ borderBottom: theme => `1px solid ${theme.palette.divider}` }}
        >
          <Tab
            value='allUserRoles'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <AccountWrenchOutline />
                <TabName>All User Roles</TabName>
              </Box>
            }
          />
          <Tab
            value='userRoleByRole'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <AccountSearchOutline />
                <TabName>User Role By Role Name</TabName>
              </Box>
            }
          />
          <Tab
            value='addUserRole'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <AccountPlusOutline />
                <TabName>Add User Role</TabName>
              </Box>
            }
          />
        </TabList>

        <TabPanel sx={{ p: 0 }} value='allUserRoles'>
          <TabAllUserRoles />
        </TabPanel>
        <TabPanel sx={{ p: 0 }} value='userRoleByRole'>
          <TabUserRoleByRole />
        </TabPanel>
        <TabPanel sx={{ p: 0 }} value='addUserRole'>
          <TabAddUserRole />
        </TabPanel>
      </TabContext>
    </Card>
  )
}

export default UserRoles
