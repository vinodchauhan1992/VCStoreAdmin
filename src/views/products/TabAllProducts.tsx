/* eslint-disable react-hooks/exhaustive-deps */
// ** React Imports
import { useState, useEffect, ChangeEvent } from 'react'

// ** MUI Imports
import CardContent from '@mui/material/CardContent'
import CustomisedErrorEmpty from 'src/@core/components/customised-error-empty/CustomisedErrorEmpty'
import CustomisedAlertDialog from 'src/@core/components/customised-alert-dialog/CustomisedAlertDialog'
import EditProduct from './editProduct/EditProduct'
import ProductSmartCard from './components/product-smart-card/ProductSmartCard'
import Grid from '@mui/material/Grid'
import CustomisedSearchField from 'src/@core/components/customised-search-field/CustomisedSearchField'
import { ProductsReducer, useAppDispatch, useAppSelector } from 'src/redux/reducers'
import { ProductsDataModel } from 'src/models/ProductsModel'
import { useRouter } from 'next/router'

const TabAllProducts = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()

  // @ts-ignore
  const allProductsDataResult = useAppSelector(ProductsReducer.selectAllProductsDataResult)
  // @ts-ignore
  const deletedProductResponse = useAppSelector(ProductsReducer.selectDeletedProductResponse)

  // ** State
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
  const [selectedProduct, setSelectedProduct] = useState<ProductsDataModel | null>(null)
  const [openViewProduct, setOpenViewProduct] = useState<boolean>(false)
  const [openEditProduct, setOpenEditProduct] = useState<boolean>(false)
  const [searchedText, setSearchedText] = useState<string>('')
  const [searchedProducts, setSearchedProducts] = useState<ProductsDataModel[]>([])

  const callAllProductsApi = async () => {
    dispatch({ type: 'FETCH_ALL_PRODUCTS' })
  }

  useEffect(() => {
    callAllProductsApi()
  }, [])

  useEffect(() => {
    setSearchedProducts(allProductsDataResult?.dataArray ?? [])
  }, [allProductsDataResult?.dataArray])

  const searchProducts = () => {
    if (searchedText && searchedText !== '') {
      const filtered = allProductsDataResult?.dataArray?.filter(
        entry =>
          Object.values(entry.productData).some(val => typeof val === 'string' && val.includes(searchedText)) ||
          Object.values(entry.brandDetails).some(val => typeof val === 'string' && val.includes(searchedText))
      )
      setSearchedProducts(filtered)
    } else {
      setSearchedProducts(allProductsDataResult?.dataArray ?? [])
    }
  }

  useEffect(() => {
    searchProducts()
  }, [searchedText])

  const resetSelectedProduct = () => {
    setSelectedProduct(null)
    setIsDialogOpen(false)
    setOpenEditProduct(false)
  }

  const deleteProduct = async () => {
    dispatch({ type: 'DELETE_PRODUCT', payload: { productId: selectedProduct?.productData?.id } })
  }

  useEffect(() => {
    if (deletedProductResponse?.isCompleted) {
      resetSelectedProduct()
      if (deletedProductResponse?.succeeded) {
        dispatch(ProductsReducer.resetDeletedProductResponse())
        callAllProductsApi()
      } else {
        dispatch(ProductsReducer.resetDeletedProductResponse())
      }
    }
  }, [deletedProductResponse])

  const onDeleteClick = async (product: ProductsDataModel) => {
    setSelectedProduct(product)
    setIsDialogOpen(true)
  }

  const onEditClick = async (product: ProductsDataModel) => {
    setSelectedProduct(product)
    setOpenEditProduct(true)
  }

  const handleDialogOpen = () => {
    setIsDialogOpen(!isDialogOpen)
  }

  const renderEmpty = () => {
    return (
      <Grid item xs={12} sm={12}>
        <CustomisedErrorEmpty
          title='No products found!'
          type='empty'
          message={allProductsDataResult?.message ?? ''}
        ></CustomisedErrorEmpty>
      </Grid>
    )
  }

  const renderEmptySearch = () => {
    return (
      <Grid item xs={12} sm={12}>
        <CustomisedErrorEmpty
          title='No search results found!'
          type='empty'
          message='Products not found for the searched item'
        ></CustomisedErrorEmpty>
      </Grid>
    )
  }

  const renderError = () => {
    return (
      <Grid item xs={12} sm={12}>
        <CustomisedErrorEmpty
          title='Error!'
          type='empty'
          message={allProductsDataResult?.message ?? ''}
        ></CustomisedErrorEmpty>
      </Grid>
    )
  }

  const setTheOpenViewProduct = (productData: ProductsDataModel, isOpenViewProduct: boolean) => {
    console.log('productData', productData)
    setSelectedProduct(productData)
    setOpenViewProduct(isOpenViewProduct)
  }

  const onShowBrandDetailsClick = (productData: ProductsDataModel) => {
    router.push({ pathname: '/brands', query: { passedSearchTextForAllBrands: productData?.brandDetails?.title ?? '' } }, '/brands')
  }

  const renderCards = () => {
    if (searchedProducts && searchedProducts.length > 0) {
      return searchedProducts.map((productData, index) => {
        return (
          <Grid key={`${index.toString()}`} item xs={12} sm={4}>
            <ProductSmartCard
              productData={productData}
              selectedProductData={selectedProduct}
              onButton1Click={() => onDeleteClick(productData)}
              onButton2Click={() => onEditClick(productData)}
              onShowBrandDetailsClick={() => onShowBrandDetailsClick(productData)}
              dataIndex={index}
              openViewProduct={openViewProduct}
              setOpenViewProduct={isOpenViewProduct => setTheOpenViewProduct(productData, isOpenViewProduct)}
            />
          </Grid>
        )
      })
    }

    return null
  }

  const handleSearch = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setSearchedText(event.target.value)
  }

  const renderSearchField = () => {
    return (
      <Grid item xs={12} sm={12}>
        <CustomisedSearchField placeholderText='Search product' value={searchedText} onChange={handleSearch} />
      </Grid>
    )
  }

  const renderData = () => {
    if (allProductsDataResult?.isCompleted && !allProductsDataResult?.succeeded) {
      return renderError()
    }
    if (!allProductsDataResult?.dataArray || allProductsDataResult.dataArray.length <= 0) {
      return renderEmpty()
    }

    return (
      <>
        {renderSearchField()}
        {searchedProducts && searchedProducts.length > 0 ? renderCards() : renderEmptySearch()}
      </>
    )
  }

  const renderWholeMainData = () => {
    return (
      <Grid container spacing={7}>
        {renderData()}
      </Grid>
    )
  }

  const renderAlertDialog = () => {
    return (
      <CustomisedAlertDialog
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={handleDialogOpen}
        dialogTitle='Delete product!'
        dialogMessage={`Are you sure you want to delete ${selectedProduct?.productData?.title} product by ${selectedProduct?.brandDetails?.title} brand?`}
        dialogButtons={[
          {
            title: 'Yes',
            onClick: () => {
              deleteProduct()
            },
            autoFocus: true,
            color: 'error'
          },
          {
            title: 'No',
            onClick: () => {
              setIsDialogOpen(false)
              resetSelectedProduct()
            },
            autoFocus: false,
            color: 'success'
          }
        ]}
      />
    )
  }

  // const renderEditProductDialog = () => {
  //   return (
  //     <EditProduct
  //       selectedProductData={selectedProduct}
  //       openEditProduct={openEditProduct}
  //       setOpenEditProduct={setOpenEditProduct}
  //       setSelectedProduct={setSelectedProduct}
  //       onCloseModal={() => {
  //         resetSelectedProduct()
  //         callAllProductsApi()
  //       }}
  //     ></EditProduct>
  //   )
  // }

  return (
    <div>
      <CardContent>
        {renderAlertDialog()}
        {renderWholeMainData()}
      </CardContent>
      {/* {renderEditProductDialog()} */}
    </div>
  )
}

export default TabAllProducts
