// ** React Imports
import { SyntheticEvent, useEffect, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import { styled } from '@mui/material/styles'
import MuiTab, { TabProps } from '@mui/material/Tab'

// ** Icons Imports
import AccountOutline from 'mdi-material-ui/AccountOutline'
import LockOpenOutline from 'mdi-material-ui/LockOpenOutline'
import InformationOutline from 'mdi-material-ui/InformationOutline'

// ** Demo Tabs Imports
import TabAllBrands from 'src/views/brands/TabAllBrands'
import TabBrandByTitle from 'src/views/brands/TabBrandByTitle'
import TabAddBrand from 'src/views/brands/TabAddBrand'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'
import { useRouter } from 'next/router'

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

const Brands = () => {
  const router = useRouter()

  // ** State
  const [value, setValue] = useState<string>('allBrands')
  const [passedSearchTextForAllBrands, setPassedSearchTextForAllBrands] = useState<any>(null)

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  useEffect(() => {
    setPassedSearchTextForAllBrands(router?.query?.passedSearchTextForAllBrands ?? null)
  }, [router?.query])

  return (
    <Card>
      <TabContext value={value}>
        <TabList
          onChange={handleChange}
          aria-label='brands tabs'
          sx={{ borderBottom: theme => `1px solid ${theme.palette.divider}` }}
        >
          <Tab
            value='allBrands'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <InformationOutline />
                <TabName>All Brands</TabName>
              </Box>
            }
          />
          <Tab
            value='brandByTitle'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <AccountOutline />
                <TabName>Brand By Title</TabName>
              </Box>
            }
          />
          <Tab
            value='addBrand'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <LockOpenOutline />
                <TabName>Add Brand</TabName>
              </Box>
            }
          />
        </TabList>

        <TabPanel sx={{ p: 0 }} value='allBrands'>
          <TabAllBrands passedSearchText={passedSearchTextForAllBrands} />
        </TabPanel>
        <TabPanel sx={{ p: 0 }} value='brandByTitle'>
          <TabBrandByTitle />
        </TabPanel>
        <TabPanel sx={{ p: 0 }} value='addBrand'>
          <TabAddBrand />
        </TabPanel>
      </TabContext>
    </Card>
  )
}

export default Brands
