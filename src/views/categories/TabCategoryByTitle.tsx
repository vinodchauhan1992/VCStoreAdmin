// ** React Imports
import { useEffect, useState } from 'react'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Grid from '@mui/material/Grid'
import { httpGetRequest } from 'src/services/AxiosApi'
import apiPathsConfig from 'src/configs/apiPathsConfig'
import { CategoryModel } from 'src/models/CategoryModel'
import CustomisedErrorEmpty from 'src/@core/components/customised-error-empty/CustomisedErrorEmpty'
import CustomisedLoader from 'src/@core/components/customised-loader/CustomisedLoader'

const TabCategoryByID = () => {
  // ** States
  const [allCategoriesData, setAllCategoriesData] = useState<CategoryModel[]>([])
  const [selectedCategoryData, setSelectedCategoryData] = useState<CategoryModel | null>(null)
  const [isErrored, setIsErrored] = useState<boolean>(false)
  const [message, setMessage] = useState<string | null>(null)
  const [isLoaderVisible, setIsLoaderVisible] = useState<boolean>(false)

  const callAllCategoriesApi = async () => {
    setIsLoaderVisible(true)
    const response = await httpGetRequest({ apiUrlPath: apiPathsConfig.getAllCategoriesApiPath })
    if (response.isSucceded) {
      setAllCategoriesData(response?.responseData?.data ?? [])
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

  const renderDetailsFields = () => {
    return (
      <>
        <Grid item xs={12} sm={6}>
          <TextField
            disabled
            fullWidth
            label='Category ID'
            placeholder='Category ID'
            value={selectedCategoryData?.id ?? ''}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            disabled
            fullWidth
            label='Category code'
            placeholder='Category code'
            value={selectedCategoryData?.code ?? ''}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            disabled
            fullWidth
            label='Category added on'
            placeholder='Category added on'
            value={selectedCategoryData?.dateAdded ?? 'N/A'}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            disabled
            fullWidth
            label='Category updated on'
            placeholder='Category updated on'
            value={selectedCategoryData?.dateModified ?? 'N/A'}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            disabled
            fullWidth
            label='description'
            placeholder='Category description'
            value={selectedCategoryData?.description ?? 'N/A'}
            multiline
            minRows={3}
            sx={{ '& .MuiOutlinedInput-root': { alignItems: 'baseline' } }}
          />
        </Grid>
      </>
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
    return <CustomisedErrorEmpty title='Error!' type='empty' message={message ?? ''}></CustomisedErrorEmpty>
  }

  const renderData = () => {
    if (isErrored) {
      return renderError()
    }
    if (!selectedCategoryData) {
      return renderEmpty()
    }

    return renderDetailsFields()
  }

  return (
    <div>
      <CustomisedLoader visible={isLoaderVisible} />
      <CardContent>
        <form>
          <Grid container spacing={7}>
            <Grid item xs={12} sm={selectedCategoryData ? 6 : 12}>
              <FormControl fullWidth>
                <InputLabel>Category title</InputLabel>
                <Select label='Category title'>
                  {allCategoriesData?.map(category => {
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
export default TabCategoryByID
