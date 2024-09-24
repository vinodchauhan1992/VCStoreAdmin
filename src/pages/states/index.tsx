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
import TabAllStates from 'src/views/states/TabAllStates'
import TabStateByTitle from 'src/views/states/TabStateByTitle'
import TabAddState from 'src/views/states/TabAddState'

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

const tabsDataArray = ['allStates', 'stateByTitle', 'addState']

const States = () => {
  // ** State
  const [value, setValue] = useState<string>(tabsDataArray[0])

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  return (
    <Card>
      <TabContext value={value}>
        <TabList
          onChange={handleChange}
          aria-label='countries tabs'
          sx={{ borderBottom: theme => `1px solid ${theme.palette.divider}` }}
        >
          <Tab
            value={tabsDataArray[0]}
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <AccountWrenchOutline />
                <TabName>All States</TabName>
              </Box>
            }
          />
          <Tab
            value={tabsDataArray[1]}
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <AccountSearchOutline />
                <TabName>State By Title</TabName>
              </Box>
            }
          />
          <Tab
            value={tabsDataArray[2]}
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <AccountPlusOutline />
                <TabName>Add State</TabName>
              </Box>
            }
          />
        </TabList>

        <TabPanel sx={{ p: 0 }} value={tabsDataArray[0]}>
          <TabAllStates />
        </TabPanel>
        <TabPanel sx={{ p: 0 }} value={tabsDataArray[1]}>
          <TabStateByTitle />
        </TabPanel>
        <TabPanel sx={{ p: 0 }} value={tabsDataArray[2]}>
          <TabAddState />
        </TabPanel>
      </TabContext>
    </Card>
  )
}

export default States
