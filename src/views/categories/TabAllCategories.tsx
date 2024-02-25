/* eslint-disable react-hooks/exhaustive-deps */
// ** React Imports
import { useState, useEffect, ChangeEvent } from 'react'

// ** MUI Imports
import CardContent from '@mui/material/CardContent'
import apiPathsConfig from '../../configs/apiPathsConfig'
import { httpDeleteRequest, httpGetRequest } from 'src/services/AxiosApi'
import { CategoryModel } from 'src/models/CategoryModel'
import CustomisedErrorEmpty from 'src/@core/components/customised-error-empty/CustomisedErrorEmpty'
import CustomisedAlertDialog from 'src/@core/components/customised-alert-dialog/CustomisedAlertDialog'
import CustomisedLoader from 'src/@core/components/customised-loader/CustomisedLoader'
import ViewCategory from './viewCategory/ViewCategory'
import EditCategory from './editCategory/EditCategory'
import CategorySmartCard from './components/category-smart-card/CategorySmartCard'
import Grid from '@mui/material/Grid'
import CustomisedSearchField from 'src/@core/components/customised-search-field/CustomisedSearchField'

const TabAllCategories = () => {
  // ** State
  const [allCategoriesData, setAllCategoriesData] = useState<CategoryModel[]>([])
  const [isErrored, setIsErrored] = useState<boolean>(false)
  const [message, setMessage] = useState<string | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
  const [selectedCategory, setSelectedCategory] = useState<CategoryModel | null>(null)
  const [isLoaderVisible, setIsLoaderVisible] = useState<boolean>(false)
  const [openViewCategory, setOpenViewCategory] = useState<boolean>(false)
  const [openEditCategory, setOpenEditCategory] = useState<boolean>(false)
  const [searchedText, setSearchedText] = useState<string>('')
  const [searchedCategories, setSearchedCategories] = useState<CategoryModel[]>([])

  const callAllCategoriesApi = async () => {
    setIsLoaderVisible(true)
    const response = await httpGetRequest({ apiUrlPath: apiPathsConfig.getAllCategoriesApiPath })
    if (response.isSucceded) {
      setAllCategoriesData(response?.responseData?.data ?? [])
      setSearchedCategories(response?.responseData?.data ?? [])
      setMessage(response?.responseData?.message ?? null)
    } else {
      setIsErrored(true)
      setMessage(response?.responseData?.message ?? null)
    }
    setIsLoaderVisible(false)
  }

  useEffect(() => {
    callAllCategoriesApi()
  }, [])

  const searchCategories = () => {
    if (searchedText && searchedText !== '') {
      const filtered = allCategoriesData.filter(entry =>
        Object.values(entry).some(val => typeof val === 'string' && val.includes(searchedText))
      )

      setSearchedCategories(filtered)
    } else {
      setSearchedCategories(allCategoriesData)
    }
  }

  useEffect(() => {
    searchCategories()
  }, [searchedText])

  const resetSelectedCategory = () => {
    setSelectedCategory(null)
    setIsDialogOpen(false)
    setOpenViewCategory(false)
    setOpenEditCategory(false)
  }

  const deleteCategory = async () => {
    resetSelectedCategory()
    setIsLoaderVisible(true)
    const response = await httpDeleteRequest({
      apiUrlPath: `${apiPathsConfig.deleteCategoryApiPath}/${selectedCategory?.id}`
    })
    if (response.isSucceded) {
      await callAllCategoriesApi()
    }
    setIsLoaderVisible(false)
  }

  const onDeleteClick = async (category: CategoryModel) => {
    setSelectedCategory(category)
    setIsDialogOpen(true)
  }

  const onEditClick = async (category: CategoryModel) => {
    setSelectedCategory(category)
    setOpenEditCategory(true)
  }

  const handleDialogOpen = () => {
    setIsDialogOpen(!isDialogOpen)
  }

  const renderEmpty = () => {
    return (
      <Grid item xs={12} sm={12}>
        <CustomisedErrorEmpty title='No categories found!' type='empty' message={message ?? ''}></CustomisedErrorEmpty>
      </Grid>
    )
  }

  const renderEmptySearch = () => {
    return (
      <Grid item xs={12} sm={12}>
        <CustomisedErrorEmpty
          title='No search results found!'
          type='empty'
          message='Categories not found for the searched item'
        ></CustomisedErrorEmpty>
      </Grid>
    )
  }

  const renderError = () => {
    return (
      <Grid item xs={12} sm={12}>
        <CustomisedErrorEmpty title='Error!' type='empty' message={message ?? ''}></CustomisedErrorEmpty>
      </Grid>
    )
  }

  const setTheMoreDetailsCategoryData = (moreDetailsCategoryData: CategoryModel | null) => {
    setSelectedCategory(moreDetailsCategoryData)
  }

  const renderCards = () => {
    if (searchedCategories && searchedCategories.length > 0) {
      return searchedCategories.map((catData, index) => {
        return (
          <Grid key={`${index.toString()}`} item xs={12} sm={4}>
            <CategorySmartCard
              selectedCategoryData={catData}
              onButton1Click={() => onDeleteClick(catData)}
              onButton2Click={() => onEditClick(catData)}
              dataIndex={index}
              moreDetailsCategoryData={selectedCategory}
              setMoreDetailsCategoryData={(moreDetailsCategoryData?: CategoryModel | null) =>
                setTheMoreDetailsCategoryData(moreDetailsCategoryData ?? null)
              }
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
        <CustomisedSearchField placeholderText='Search category' value={searchedText} onChange={handleSearch} />
      </Grid>
    )
  }

  const renderData = () => {
    if (isErrored) {
      return renderError()
    }
    if (!allCategoriesData || allCategoriesData.length <= 0) {
      return renderEmpty()
    }

    return (
      <>
        {renderSearchField()}
        {searchedCategories && searchedCategories.length > 0 ? renderCards() : renderEmptySearch()}
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
        dialogTitle='Delete category!'
        dialogMessage={`Are you sure you want to delete ${selectedCategory?.title} category?`}
        dialogButtons={[
          {
            title: 'Yes',
            onClick: () => {
              deleteCategory()
            },
            autoFocus: true,
            color: 'error'
          },
          {
            title: 'No',
            onClick: () => {
              setIsDialogOpen(false)
              resetSelectedCategory()
            },
            autoFocus: false,
            color: 'success'
          }
        ]}
      />
    )
  }

  const renderViewCategoryDialog = () => {
    return (
      <ViewCategory
        selectedCategoryData={selectedCategory}
        openViewCategory={openViewCategory}
        setOpenViewCategory={setOpenViewCategory}
        onCloseModal={() => {
          resetSelectedCategory()
        }}
      ></ViewCategory>
    )
  }

  const renderEditCategoryDialog = () => {
    return (
      <EditCategory
        selectedCategoryData={selectedCategory}
        openEditCategory={openEditCategory}
        setOpenEditCategory={setOpenEditCategory}
        setSelectedCategory={setSelectedCategory}
        onCloseModal={() => {
          resetSelectedCategory()
          callAllCategoriesApi()
        }}
      ></EditCategory>
    )
  }

  return (
    <div>
      <CustomisedLoader visible={isLoaderVisible} />
      <CardContent>
        {renderAlertDialog()}
        {renderWholeMainData()}
      </CardContent>
      {renderViewCategoryDialog()}
      {renderEditCategoryDialog()}
    </div>
  )
}

export default TabAllCategories
