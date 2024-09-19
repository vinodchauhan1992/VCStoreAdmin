// ** React Imports
import { useEffect, useState } from 'react'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Grid from '@mui/material/Grid'
import { CategoryModel } from 'src/models/CategoryModel'
import CustomisedErrorEmpty from 'src/@core/components/customised-error-empty/CustomisedErrorEmpty'
import CategorySmartCard from 'src/views/categories/components/category-smart-card/CategorySmartCard'
import { CategoriesReducer, useAppDispatch, useAppSelector } from 'src/redux/reducers'

const TabCategoryByTitle = () => {
  const dispatch = useAppDispatch()

  // @ts-ignore
  const allCategoriesDataResult = useAppSelector(CategoriesReducer.selectAllCategoriesDataResult)

  // ** States
  const [selectedCategoryData, setSelectedCategoryData] = useState<CategoryModel | null>(null)

  useEffect(() => {
    dispatch({ type: 'FETCH_ALL_CATEGORIES' })
  }, [])

  const renderDetailsFields = () => {
    return (
      <Grid item xs={12} sm={12}>
        <CategorySmartCard
          categoryData={selectedCategoryData}
          dataIndex={0}
          isButton1Visible={false}
          isButton2Visible={false}
          forPage='categoryByTitle'
        />
      </Grid>
    )
  }

  const renderEmpty = () => {
    return (
      <CustomisedErrorEmpty
        title='Select category title!'
        type='empty'
        message='Please select a category title from above drop down.'
      ></CustomisedErrorEmpty>
    )
  }

  const renderError = () => {
    return (
      <CustomisedErrorEmpty
        title='Error!'
        type='empty'
        message={allCategoriesDataResult?.message ?? ''}
      ></CustomisedErrorEmpty>
    )
  }

  const renderData = () => {
    if (allCategoriesDataResult?.isCompleted && !allCategoriesDataResult?.succeeded) {
      return renderError()
    }
    if (!selectedCategoryData) {
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
                <InputLabel>Category title</InputLabel>
                <Select label='Category title'>
                  {allCategoriesDataResult?.dataArray?.map(category => {
                    return (
                      <MenuItem
                        value={category?.title ?? ''}
                        key={`${category.id}`}
                        onClick={() => {
                          setSelectedCategoryData(category)
                        }}
                      >
                        {category.title}
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
export default TabCategoryByTitle
