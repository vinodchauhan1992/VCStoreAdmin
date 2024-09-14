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
import TabAddMenuStatus from 'src/views/menuStatuses/TabAddMenuStatus'
import TabAllMenuStatuses from 'src/views/menuStatuses/TabAllMenuStatuses'
import TabMenuStatusByTitle from 'src/views/menuStatuses/TabMenuStatusByTitle'

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

const MenuStatuses = () => {
  // ** State
  const [value, setValue] = useState<string>('allMenuStatuses')

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
            value='allMenuStatuses'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <AccountWrenchOutline />
                <TabName>All Menu Statuses</TabName>
              </Box>
            }
          />
          <Tab
            value='menuStatusesByTitle'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <AccountSearchOutline />
                <TabName>Menu Status By Title</TabName>
              </Box>
            }
          />
          <Tab
            value='addMenuStatus'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <AccountPlusOutline />
                <TabName>Add Menu Status</TabName>
              </Box>
            }
          />
        </TabList>

        <TabPanel sx={{ p: 0 }} value='allMenuStatuses'>
          <TabAllMenuStatuses />
        </TabPanel>
        <TabPanel sx={{ p: 0 }} value='menuStatusesByTitle'>
          <TabMenuStatusByTitle />
        </TabPanel>
        <TabPanel sx={{ p: 0 }} value='addMenuStatus'>
          <TabAddMenuStatus />
        </TabPanel>
      </TabContext>
    </Card>
  )
}

export default MenuStatuses
