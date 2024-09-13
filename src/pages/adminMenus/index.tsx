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
import TabAddAdminMenu from 'src/views/adminMenus/TabAddAdminMenu'
import TabAllAdminMenus from 'src/views/adminMenus/TabAllAdminMenus'
import TabAdminMenuByMenuName from 'src/views/adminMenus/TabAdminMenuByMenuName'

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

const AdminMenus = () => {
  // ** State
  const [value, setValue] = useState<string>('allAdminMenus')

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  return (
    <Card>
      <TabContext value={value}>
        <TabList
          onChange={handleChange}
          aria-label='adminMenus tabs'
          sx={{ borderBottom: theme => `1px solid ${theme.palette.divider}` }}
        >
          <Tab
            value='allAdminMenus'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <AccountWrenchOutline />
                <TabName>All Admin Menus</TabName>
              </Box>
            }
          />
          <Tab
            value='adminMenuByMenuName'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <AccountSearchOutline />
                <TabName>Admin Menu By Menu Name</TabName>
              </Box>
            }
          />
          <Tab
            value='addAdminMenu'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <AccountPlusOutline />
                <TabName>Add Admin Menu</TabName>
              </Box>
            }
          />
        </TabList>

        <TabPanel sx={{ p: 0 }} value='allAdminMenus'>
          <TabAllAdminMenus />
        </TabPanel>
        <TabPanel sx={{ p: 0 }} value='adminMenuByMenuName'>
          <TabAdminMenuByMenuName />
        </TabPanel>
        <TabPanel sx={{ p: 0 }} value='addAdminMenu'>
          <TabAddAdminMenu />
        </TabPanel>
      </TabContext>
    </Card>
  )
}

export default AdminMenus
