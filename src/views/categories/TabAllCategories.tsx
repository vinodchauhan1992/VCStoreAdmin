/* eslint-disable react-hooks/exhaustive-deps */
// ** React Imports
import { useState, useEffect, ChangeEvent } from 'react'

// ** MUI Imports
import CardContent from '@mui/material/CardContent'
import { CategoryModel } from 'src/models/CategoryModel'
import CustomisedErrorEmpty from 'src/@core/components/customised-error-empty/CustomisedErrorEmpty'
import CustomisedAlertDialog from 'src/@core/components/customised-alert-dialog/CustomisedAlertDialog'
import EditCategory from './editCategory/EditCategory'
import CategorySmartCard from './components/category-smart-card/CategorySmartCard'
import Grid from '@mui/material/Grid'
import CustomisedSearchField from 'src/@core/components/customised-search-field/CustomisedSearchField'
import { CategoriesReducer, useAppDispatch, useAppSelector } from 'src/redux/reducers'

const TabAllCategories = () => {
  const dispatch = useAppDispatch()

  // @ts-ignore
  const allCategoriesDataResult = useAppSelector(CategoriesReducer.selectAllCategoriesDataResult)
  // @ts-ignore
  const deletedCategoryResponse = useAppSelector(CategoriesReducer.selectDeletedCategoryResponse)

  // ** State
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
  const [selectedCategory, setSelectedCategory] = useState<CategoryModel | null>(null)
  const [openEditCategory, setOpenEditCategory] = useState<boolean>(false)
  const [searchedText, setSearchedText] = useState<string>('')
  const [searchedCategories, setSearchedCategories] = useState<CategoryModel[]>([])

  const callAllCategoriesApi = async () => {
    dispatch({ type: 'FETCH_ALL_CATEGORIES' })
  }

  useEffect(() => {
    callAllCategoriesApi()
  }, [])

  useEffect(() => {
    setSearchedCategories(allCategoriesDataResult?.dataArray ?? [])
  }, [allCategoriesDataResult?.dataArray])

  const searchCategories = () => {
    if (searchedText && searchedText !== '') {
      const filtered = allCategoriesDataResult?.dataArray?.filter(entry =>
        Object.values(entry).some(val => typeof val === 'string' && val.includes(searchedText))
      )
      setSearchedCategories(filtered)
    } else {
      setSearchedCategories(allCategoriesDataResult?.dataArray ?? [])
    }
  }

  useEffect(() => {
    searchCategories()
  }, [searchedText])

  const resetSelectedCategory = () => {
    setSelectedCategory(null)
    setIsDialogOpen(false)
    setOpenEditCategory(false)
  }

  const deleteCategory = async () => {
    dispatch({ type: 'DELETE_CATEGORY', payload: { categoryId: selectedCategory?.id } })
  }

  useEffect(() => {
    if (deletedCategoryResponse?.isCompleted) {
      resetSelectedCategory()
      if (deletedCategoryResponse?.succeeded) {
        dispatch(CategoriesReducer.resetDeletedCategoryResponse())
        callAllCategoriesApi()
      } else {
        dispatch(CategoriesReducer.resetDeletedCategoryResponse())
      }
    }
  }, [deletedCategoryResponse])

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
        <CustomisedErrorEmpty
          title='No categories found!'
          type='empty'
          message={allCategoriesDataResult?.message ?? ''}
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
          message='Categories not found for the searched item'
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
          message={allCategoriesDataResult?.message ?? ''}
        ></CustomisedErrorEmpty>
      </Grid>
    )
  }

  const renderCards = () => {
    if (searchedCategories && searchedCategories.length > 0) {
      return searchedCategories.map((categoryData, index) => {
        return (
          <Grid key={`${index.toString()}`} item xs={12} sm={4}>
            <CategorySmartCard
              categoryData={categoryData}
              onButton1Click={() => onDeleteClick(categoryData)}
              onButton2Click={() => onEditClick(categoryData)}
              dataIndex={index}
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
    if (allCategoriesDataResult?.isCompleted && !allCategoriesDataResult?.succeeded) {
      return renderError()
    }
    if (!allCategoriesDataResult?.dataArray || allCategoriesDataResult.dataArray.length <= 0) {
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
      <CardContent>
        {renderAlertDialog()}
        {renderWholeMainData()}
      </CardContent>
      {renderEditCategoryDialog()}
    </div>
  )
}

export default TabAllCategories
