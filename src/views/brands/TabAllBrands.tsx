/* eslint-disable react-hooks/exhaustive-deps */
// ** React Imports
import { useState, useEffect, ChangeEvent } from 'react'

// ** MUI Imports
import CardContent from '@mui/material/CardContent'
import { BrandsModel } from 'src/models/BrandsModel'
import CustomisedErrorEmpty from 'src/@core/components/customised-error-empty/CustomisedErrorEmpty'
import CustomisedAlertDialog from 'src/@core/components/customised-alert-dialog/CustomisedAlertDialog'
import EditBrand from './editBrand/EditBrand'
import BrandSmartCard from './components/brand-smart-card/BrandSmartCard'
import Grid from '@mui/material/Grid'
import CustomisedSearchField from 'src/@core/components/customised-search-field/CustomisedSearchField'
import { BrandsReducer, useAppDispatch, useAppSelector } from 'src/redux/reducers'

export interface TabAllBrandsProps {
  passedSearchText?: string | null
}

const TabAllBrands = (props: TabAllBrandsProps) => {
  const dispatch = useAppDispatch()

  const { passedSearchText } = props

  // @ts-ignore
  const allBrandsDataResult = useAppSelector(BrandsReducer.selectAllBrandsDataResult)
  // @ts-ignore
  const deletedBrandResponse = useAppSelector(BrandsReducer.selectDeletedBrandResponse)

  // ** State
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
  const [selectedBrand, setSelectedBrand] = useState<BrandsModel | null>(null)
  const [openViewBrand, setOpenViewBrand] = useState<boolean>(false)
  const [openEditBrand, setOpenEditBrand] = useState<boolean>(false)
  const [searchedText, setSearchedText] = useState<string>('')
  const [searchedBrands, setSearchedBrands] = useState<BrandsModel[]>([])

  const callAllBrandsApi = async () => {
    dispatch({ type: 'FETCH_ALL_BRANDS' })
  }

  useEffect(() => {
    callAllBrandsApi()
  }, [])

  useEffect(() => {
    setSearchedBrands(allBrandsDataResult?.dataArray ?? [])
  }, [allBrandsDataResult?.dataArray])

  useEffect(() => {
    if (passedSearchText && passedSearchText !== '') {
      setTimeout(() => {
        setSearchedText(passedSearchText)
      }, 500)
    }
  }, [allBrandsDataResult?.dataArray, passedSearchText])

  const searchBrands = () => {
    if (searchedText && searchedText !== '') {
      const filtered = allBrandsDataResult?.dataArray?.filter(entry =>
        Object.values(entry).some(val => typeof val === 'string' && val.includes(searchedText))
      )
      setSearchedBrands(filtered)
    } else {
      setSearchedBrands(allBrandsDataResult?.dataArray ?? [])
    }
  }

  useEffect(() => {
    searchBrands()
  }, [searchedText])

  const resetSelectedBrand = () => {
    setSelectedBrand(null)
    setIsDialogOpen(false)
    setOpenEditBrand(false)
  }

  const deleteBrand = async () => {
    dispatch({ type: 'DELETE_BRAND', payload: { brandId: selectedBrand?.id } })
  }

  useEffect(() => {
    if (deletedBrandResponse?.isCompleted) {
      resetSelectedBrand()
      if (deletedBrandResponse?.succeeded) {
        dispatch(BrandsReducer.resetDeletedBrandResponse())
        callAllBrandsApi()
      } else {
        dispatch(BrandsReducer.resetDeletedBrandResponse())
      }
    }
  }, [deletedBrandResponse])

  const onDeleteClick = async (brand: BrandsModel) => {
    setSelectedBrand(brand)
    setIsDialogOpen(true)
  }

  const onEditClick = async (brand: BrandsModel) => {
    setSelectedBrand(brand)
    setOpenEditBrand(true)
  }

  const handleDialogOpen = () => {
    setIsDialogOpen(!isDialogOpen)
  }

  const renderEmpty = () => {
    return (
      <Grid item xs={12} sm={12}>
        <CustomisedErrorEmpty
          title='No brands found!'
          type='empty'
          message={allBrandsDataResult?.message ?? ''}
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
          message='Brands not found for the searched item'
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
          message={allBrandsDataResult?.message ?? ''}
        ></CustomisedErrorEmpty>
      </Grid>
    )
  }

  const setTheOpenViewBrand = (brandData: BrandsModel, isOpenViewBrand: boolean) => {
    console.log('brandData', brandData)
    setSelectedBrand(brandData)
    setOpenViewBrand(isOpenViewBrand)
  }

  const renderCards = () => {
    if (searchedBrands && searchedBrands.length > 0) {
      return searchedBrands.map((brandData, index) => {
        return (
          <Grid key={`${index.toString()}`} item xs={12} sm={4}>
            <BrandSmartCard
              brandData={brandData}
              selectedBrandData={selectedBrand}
              onButton1Click={() => onDeleteClick(brandData)}
              onButton2Click={() => onEditClick(brandData)}
              dataIndex={index}
              openViewBrand={openViewBrand}
              setOpenViewBrand={isOpenViewBrand => setTheOpenViewBrand(brandData, isOpenViewBrand)}
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
        <CustomisedSearchField placeholderText='Search brand' value={searchedText} onChange={handleSearch} />
      </Grid>
    )
  }

  const renderData = () => {
    if (allBrandsDataResult?.isCompleted && !allBrandsDataResult?.succeeded) {
      return renderError()
    }
    if (!allBrandsDataResult?.dataArray || allBrandsDataResult.dataArray.length <= 0) {
      return renderEmpty()
    }

    return (
      <>
        {renderSearchField()}
        {searchedBrands && searchedBrands.length > 0 ? renderCards() : renderEmptySearch()}
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
        dialogTitle='Delete brand!'
        dialogMessage={`Are you sure you want to delete ${selectedBrand?.title} brand?`}
        dialogButtons={[
          {
            title: 'Yes',
            onClick: () => {
              deleteBrand()
            },
            autoFocus: true,
            color: 'error'
          },
          {
            title: 'No',
            onClick: () => {
              setIsDialogOpen(false)
              resetSelectedBrand()
            },
            autoFocus: false,
            color: 'success'
          }
        ]}
      />
    )
  }

  const renderEditBrandDialog = () => {
    return (
      <EditBrand
        selectedBrandData={selectedBrand}
        openEditBrand={openEditBrand}
        setOpenEditBrand={setOpenEditBrand}
        setSelectedBrand={setSelectedBrand}
        onCloseModal={() => {
          resetSelectedBrand()
          callAllBrandsApi()
        }}
      ></EditBrand>
    )
  }

  return (
    <div>
      <CardContent>
        {renderAlertDialog()}
        {renderWholeMainData()}
      </CardContent>
      {renderEditBrandDialog()}
    </div>
  )
}

export default TabAllBrands
