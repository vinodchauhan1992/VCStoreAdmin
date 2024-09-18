// ** React Imports
import { useEffect, useState } from 'react'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Grid from '@mui/material/Grid'
import CustomisedErrorEmpty from 'src/@core/components/customised-error-empty/CustomisedErrorEmpty'
import BrandSmartCard from 'src/views/brands/components/brand-smart-card/BrandSmartCard'
import { BrandsReducer, useAppDispatch, useAppSelector } from 'src/redux/reducers'
import { BrandsModel } from 'src/models/BrandsModel'

const TabBrandByTitle = () => {
  const dispatch = useAppDispatch()

  // @ts-ignore
  const allBrandsDataResult = useAppSelector(BrandsReducer.selectAllBrandsDataResult)

  // ** States
  const [selectedBrandData, setSelectedBrandData] = useState<BrandsModel | null>(null)

  useEffect(() => {
    dispatch({ type: 'FETCH_ALL_BRANDS' })
  }, [])

  const renderDetailsFields = () => {
    return (
      <Grid item xs={12} sm={12}>
        <BrandSmartCard
          brandData={selectedBrandData}
          dataIndex={0}
          isButton1Visible={false}
          isButton2Visible={false}
          forPage='brandByTitle'
        />
      </Grid>
    )
  }

  const renderEmpty = () => {
    return (
      <CustomisedErrorEmpty
        title='Select brand title!'
        type='empty'
        message='Please select a brand title from above drop down.'
      ></CustomisedErrorEmpty>
    )
  }

  const renderError = () => {
    return (
      <CustomisedErrorEmpty
        title='Error!'
        type='empty'
        message={allBrandsDataResult?.message ?? ''}
      ></CustomisedErrorEmpty>
    )
  }

  const renderData = () => {
    if (allBrandsDataResult?.isCompleted && !allBrandsDataResult?.succeeded) {
      return renderError()
    }
    if (!selectedBrandData) {
      return renderEmpty()
    }

    return renderDetailsFields()
  }

  return (
    <div>
      <CardContent>
        <form>
          <Grid container spacing={7}>
            <Grid item xs={12} sm={12}>
              <FormControl fullWidth>
                <InputLabel>Brand title</InputLabel>
                <Select label='Brand title'>
                  {allBrandsDataResult?.dataArray?.map(brand => {
                    return (
                      <MenuItem
                        value={brand?.title ?? ''}
                        key={`${brand.id}`}
                        onClick={() => {
                          setSelectedBrandData(brand)
                        }}
                      >
                        {brand.title}
                      </MenuItem>
                    )
                  })}
                </Select>
              </FormControl>
            </Grid>
            {renderData()}
          </Grid>
        </form>
      </CardContent>
    </div>
  )
}
export default TabBrandByTitle
