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
import { ProductsReducer, useAppDispatch, useAppSelector } from 'src/redux/reducers'
import { ProductsDataModel } from 'src/models/ProductsModel'
import ProductSmartCard from './components/product-smart-card/ProductSmartCard'
import { useRouter } from 'next/router'

const TabProductByTitle = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()

  // @ts-ignore
  const allProductsDataResult = useAppSelector(ProductsReducer.selectAllProductsDataResult)

  // ** States
  const [selectedProductData, setSelectedProductData] = useState<ProductsDataModel | null>(null)
  const [openViewProduct, setOpenViewProduct] = useState<boolean>(false)

  useEffect(() => {
    dispatch({ type: 'FETCH_ALL_BRANDS' })
  }, [])

  const setTheOpenViewBrand = (isOpenViewProduct: boolean) => {
    setOpenViewProduct(isOpenViewProduct)
  }

  const onShowBrandDetailsClick = (productData?: ProductsDataModel | null) => {
    if (productData) {
      router.push(
        { pathname: '/brands', query: { passedSearchTextForAllBrands: productData?.brandDetails?.title ?? '' } },
        '/brands'
      )
    }
  }

  const renderDetailsFields = () => {
    return (
      <Grid item xs={12} sm={12}>
        <ProductSmartCard
          productData={selectedProductData}
          selectedProductData={selectedProductData}
          onShowBrandDetailsClick={() => onShowBrandDetailsClick(selectedProductData)}
          dataIndex={0}
          openViewProduct={openViewProduct}
          isButton1Visible={false}
          isButton2Visible={false}
          forPage='productByTitle'
        />
      </Grid>
    )
  }

  const renderEmpty = () => {
    return (
      <CustomisedErrorEmpty
        title='Select product title!'
        type='empty'
        message='Please select a product title from above drop down.'
      ></CustomisedErrorEmpty>
    )
  }

  const renderError = () => {
    return (
      <CustomisedErrorEmpty
        title='Error!'
        type='empty'
        message={allProductsDataResult?.message ?? ''}
      ></CustomisedErrorEmpty>
    )
  }

  const renderData = () => {
    if (allProductsDataResult?.isCompleted && !allProductsDataResult?.succeeded) {
      return renderError()
    }
    if (!selectedProductData) {
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
                <InputLabel>Product title</InputLabel>
                <Select label='Product title'>
                  {allProductsDataResult?.dataArray?.map(product => {
                    return (
                      <MenuItem
                        value={
                          product?.productData?.title
                            ? `${product.productData.title}(${product?.brandDetails?.title})`
                            : ''
                        }
                        key={`${product?.productData?.id}`}
                        onClick={() => {
                          setSelectedProductData(product)
                        }}
                      >
                        {`${product?.productData?.title}(${product?.brandDetails?.title})`}
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
export default TabProductByTitle
