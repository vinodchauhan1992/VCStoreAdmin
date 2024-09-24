// ** React Imports
import { useState, useEffect } from 'react'

// ** MUI Imports
import CardContent from '@mui/material/CardContent'
import CustomisedErrorEmpty from 'src/@core/components/customised-error-empty/CustomisedErrorEmpty'
import CustomisedAlertDialog from 'src/@core/components/customised-alert-dialog/CustomisedAlertDialog'
import { CitiesReducer, useAppDispatch, useAppSelector } from 'src/redux/reducers'
import EnhancedTable from 'src/@core/components/enhanced-table-view/EnhancedTable'
import EditCity from 'src/views/cities/components/editCity/EditCity'
import { CitiesModel } from 'src/models/CitiesModel'

const TabAllCities = () => {
  // ** State
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
  const [selectedCity, setSelectedCity] = useState<CitiesModel | null>(null)

  const dispatch = useAppDispatch()

  // @ts-ignore
  const allCitiesDataResult = useAppSelector(CitiesReducer.selectAllCitiesDataResult)
  // @ts-ignore
  const deletedCityResponse = useAppSelector(CitiesReducer.selectDeletedCityResponse)

  const callAllCitiesApi = () => {
    dispatch({ type: 'FETCH_ALL_CITIES' })
  }

  useEffect(() => {
    callAllCitiesApi()
  }, [])

  const resetSelectedCity = () => {
    setSelectedCity(null)
    setIsDialogOpen(false)
  }

  useEffect(() => {
    if (deletedCityResponse?.isCompleted) {
      resetSelectedCity()
      if (deletedCityResponse?.succeeded) {
        dispatch(CitiesReducer.resetDeletedCityResponse())
        callAllCitiesApi()
      } else {
        dispatch(CitiesReducer.resetDeletedCityResponse())
      }
    }
  }, [deletedCityResponse])

  const deleteCity = async () => {
    dispatch({ type: 'DELETE_CITY', payload: { cityId: selectedCity?.id } })
  }

  const onDeleteClick = async (cityData: CitiesModel) => {
    setSelectedCity(cityData)
    setIsDialogOpen(true)
  }

  const handleDialogOpen = () => {
    setIsDialogOpen(!isDialogOpen)
  }

  const renderDataTable = () => {
    if (allCitiesDataResult?.dataArray && allCitiesDataResult.dataArray.length > 0) {
      return (
        <EnhancedTable
          tableDataArray={allCitiesDataResult.dataArray}
          onDeleteClick={(data: any) => {
            onDeleteClick(data)
          }}
          deletionResponse={deletedCityResponse}
          renderEditComponent={({ labelId, row, isItemSelected, resetSelectedState }) => {
            return (
              <EditCity
                labelId={labelId}
                row={row}
                isItemSelected={isItemSelected}
                resetSelectedState={resetSelectedState}
              />
            )
          }}
        ></EnhancedTable>
      )
    }
  }

  const renderEmpty = () => {
    return (
      <CustomisedErrorEmpty
        title='No cities found!'
        type='empty'
        message={allCitiesDataResult?.message ?? ''}
      ></CustomisedErrorEmpty>
    )
  }

  const renderError = () => {
    return (
      <CustomisedErrorEmpty
        title='Error!'
        type='empty'
        message={allCitiesDataResult?.message ?? ''}
      ></CustomisedErrorEmpty>
    )
  }

  const renderData = () => {
    if (allCitiesDataResult?.isCompleted && !allCitiesDataResult?.succeeded) {
      return renderError()
    }
    if (!allCitiesDataResult?.dataArray || allCitiesDataResult.dataArray.length <= 0) {
      return renderEmpty()
    }

    return renderDataTable()
  }

  const renderAlertDialog = () => {
    return (
      <CustomisedAlertDialog
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={handleDialogOpen}
        dialogTitle='Delete city!'
        dialogMessage={`Are you sure you want to delete ${selectedCity?.title} city?`}
        dialogButtons={[
          {
            title: 'Yes',
            onClick: () => {
              deleteCity()
            },
            autoFocus: true,
            color: 'error'
          },
          {
            title: 'No',
            onClick: () => {
              setIsDialogOpen(false)
              resetSelectedCity()
            },
            autoFocus: false,
            color: 'success'
          }
        ]}
      />
    )
  }

  return (
    <div>
      <CardContent>
        {renderAlertDialog()}
        {renderData()}
      </CardContent>
    </div>
  )
}

export default TabAllCities
