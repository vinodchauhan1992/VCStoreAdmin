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
import TabAllFileFolders from 'src/views/fileFolders/TabAllFileFolders'
import TabFileFolderByFolderName from 'src/views/fileFolders/TabFileFolderByFolderName'
import TabAddFileFolder from 'src/views/fileFolders/TabAddFileFolder'

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

const Users = () => {
  // ** State
  const [value, setValue] = useState<string>('allFileFolders')

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  return (
    <Card>
      <TabContext value={value}>
        <TabList
          onChange={handleChange}
          aria-label='userStatuses tabs'
          sx={{ borderBottom: theme => `1px solid ${theme.palette.divider}` }}
        >
          <Tab
            value='allFileFolders'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <AccountWrenchOutline />
                <TabName>All File Folders</TabName>
              </Box>
            }
          />
          <Tab
            value='fileFolderByFolderName'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <AccountSearchOutline />
                <TabName>File Folder By Folder Name</TabName>
              </Box>
            }
          />
          <Tab
            value='addFileFolder'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <AccountPlusOutline />
                <TabName>Add File Folder</TabName>
              </Box>
            }
          />
        </TabList>

        <TabPanel sx={{ p: 0 }} value='allFileFolders'>
          <TabAllFileFolders />
        </TabPanel>
        <TabPanel sx={{ p: 0 }} value='fileFolderByFolderName'>
          <TabFileFolderByFolderName />
        </TabPanel>
        <TabPanel sx={{ p: 0 }} value='addFileFolder'>
          <TabAddFileFolder />
        </TabPanel>
      </TabContext>
    </Card>
  )
}

export default Users
