// ** React Imports
import { useState, useEffect } from 'react'

// ** MUI Imports
import CardContent from '@mui/material/CardContent'
import CustomisedErrorEmpty from 'src/@core/components/customised-error-empty/CustomisedErrorEmpty'
import CustomisedAlertDialog from 'src/@core/components/customised-alert-dialog/CustomisedAlertDialog'
import { CountriesReducer, useAppDispatch, useAppSelector } from 'src/redux/reducers'
import EnhancedTable from 'src/@core/components/enhanced-table-view/EnhancedTable'
import EditCountry from 'src/views/countries/components/editCountry/EditCountry'
import { CountriesModel } from 'src/models/CountriesModel'

const TabAllCountries = () => {
  // ** State
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
  const [selectedCountry, setSelectedCountry] = useState<CountriesModel | null>(null)

  const dispatch = useAppDispatch()

  // @ts-ignore
  const allCountriesDataResult = useAppSelector(CountriesReducer.selectAllCountriesDataResult)
  // @ts-ignore
  const deletedCountryResponse = useAppSelector(CountriesReducer.selectDeletedCountryResponse)

  const callAllCountriesApi = () => {
    dispatch({ type: 'FETCH_ALL_COUNTRIES' })
  }

  useEffect(() => {
    callAllCountriesApi()
  }, [])

  const resetSelectedCountry = () => {
    setSelectedCountry(null)
    setIsDialogOpen(false)
  }

  useEffect(() => {
    if (deletedCountryResponse?.isCompleted) {
      resetSelectedCountry()
      if (deletedCountryResponse?.succeeded) {
        dispatch(CountriesReducer.resetDeletedCountryResponse())
        callAllCountriesApi()
      } else {
        dispatch(CountriesReducer.resetDeletedCountryResponse())
      }
    }
  }, [deletedCountryResponse])

  const deleteCountry = async () => {
    dispatch({ type: 'DELETE_COUNTRY', payload: { countryId: selectedCountry?.id } })
  }

  const onDeleteClick = async (countryData: CountriesModel) => {
    setSelectedCountry(countryData)
    setIsDialogOpen(true)
  }

  const handleDialogOpen = () => {
    setIsDialogOpen(!isDialogOpen)
  }

  const renderDataTable = () => {
    if (allCountriesDataResult?.dataArray && allCountriesDataResult.dataArray.length > 0) {
      return (
        <EnhancedTable
          tableDataArray={allCountriesDataResult.dataArray}
          onDeleteClick={(data: any) => {
            onDeleteClick(data)
          }}
          deletionResponse={deletedCountryResponse}
          renderEditComponent={({ labelId, row, isItemSelected, resetSelectedState }) => {
            return (
              <EditCountry
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
        title='No countries found!'
        type='empty'
        message={allCountriesDataResult?.message ?? ''}
      ></CustomisedErrorEmpty>
    )
  }

  const renderError = () => {
    return (
      <CustomisedErrorEmpty
        title='Error!'
        type='empty'
        message={allCountriesDataResult?.message ?? ''}
      ></CustomisedErrorEmpty>
    )
  }

  const renderData = () => {
    if (allCountriesDataResult?.isCompleted && !allCountriesDataResult?.succeeded) {
      return renderError()
    }
    if (!allCountriesDataResult?.dataArray || allCountriesDataResult.dataArray.length <= 0) {
      return renderEmpty()
    }

    return renderDataTable()
  }

  const renderAlertDialog = () => {
    return (
      <CustomisedAlertDialog
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={handleDialogOpen}
        dialogTitle='Delete country!'
        dialogMessage={`Are you sure you want to delete ${selectedCountry?.title} country?`}
        dialogButtons={[
          {
            title: 'Yes',
            onClick: () => {
              deleteCountry()
            },
            autoFocus: true,
            color: 'error'
          },
          {
            title: 'No',
            onClick: () => {
              setIsDialogOpen(false)
              resetSelectedCountry()
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

export default TabAllCountries
