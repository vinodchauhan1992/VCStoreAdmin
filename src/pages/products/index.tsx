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
import AccountOutline from 'mdi-material-ui/AccountOutline'
import LockOpenOutline from 'mdi-material-ui/LockOpenOutline'
import InformationOutline from 'mdi-material-ui/InformationOutline'

// ** Demo Tabs Imports
import TabAllProducts from 'src/views/products/TabAllProducts'
import TabProductByTitle from 'src/views/products/TabProductByTitle'
import TabAddProduct from 'src/views/products/TabAddProduct'

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

const tabsDataArray = ['allProducts', 'productByTitle', 'addProduct']

const Products = () => {
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
          aria-label='products tabs'
          sx={{ borderBottom: theme => `1px solid ${theme.palette.divider}` }}
        >
          <Tab
            value={tabsDataArray[0]}
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <InformationOutline />
                <TabName>All Products</TabName>
              </Box>
            }
          />
          <Tab
            value={tabsDataArray[1]}
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <AccountOutline />
                <TabName>Product By Title</TabName>
              </Box>
            }
          />
          <Tab
            value={tabsDataArray[2]}
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <LockOpenOutline />
                <TabName>Add Product</TabName>
              </Box>
            }
          />
        </TabList>

        <TabPanel sx={{ p: 0 }} value={tabsDataArray[0]}>
          <TabAllProducts />
        </TabPanel>
        <TabPanel sx={{ p: 0 }} value={tabsDataArray[1]}>
          <TabProductByTitle />
        </TabPanel>
        <TabPanel sx={{ p: 0 }} value={tabsDataArray[2]}>
          <TabAddProduct />
        </TabPanel>
      </TabContext>
    </Card>
  )
}

export default Products
