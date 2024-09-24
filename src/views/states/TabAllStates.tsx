// ** React Imports
import { useState, useEffect } from 'react'

// ** MUI Imports
import CardContent from '@mui/material/CardContent'
import CustomisedErrorEmpty from 'src/@core/components/customised-error-empty/CustomisedErrorEmpty'
import CustomisedAlertDialog from 'src/@core/components/customised-alert-dialog/CustomisedAlertDialog'
import { StatesReducer, useAppDispatch, useAppSelector } from 'src/redux/reducers'
import EnhancedTable from 'src/@core/components/enhanced-table-view/EnhancedTable'
import EditState from 'src/views/states/components/editState/EditState'
import { StatesModel } from 'src/models/StatesModel'

const TabAllStates = () => {
  // ** State
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
  const [selectedState, setSelectedState] = useState<StatesModel | null>(null)

  const dispatch = useAppDispatch()

  // @ts-ignore
  const allStatesDataResult = useAppSelector(StatesReducer.selectAllStatesDataResult)
  // @ts-ignore
  const deletedStateResponse = useAppSelector(StatesReducer.selectDeletedStateResponse)

  const callAllStatesApi = () => {
    dispatch({ type: 'FETCH_ALL_STATES' })
  }

  useEffect(() => {
    callAllStatesApi()
  }, [])

  const resetSelectedState = () => {
    setSelectedState(null)
    setIsDialogOpen(false)
  }

  useEffect(() => {
    if (deletedStateResponse?.isCompleted) {
      resetSelectedState()
      if (deletedStateResponse?.succeeded) {
        dispatch(StatesReducer.resetDeletedStateResponse())
        callAllStatesApi()
      } else {
        dispatch(StatesReducer.resetDeletedStateResponse())
      }
    }
  }, [deletedStateResponse])

  const deleteState = async () => {
    dispatch({ type: 'DELETE_STATE', payload: { stateId: selectedState?.id } })
  }

  const onDeleteClick = async (stateData: StatesModel) => {
    setSelectedState(stateData)
    setIsDialogOpen(true)
  }

  const handleDialogOpen = () => {
    setIsDialogOpen(!isDialogOpen)
  }

  const renderDataTable = () => {
    if (allStatesDataResult?.dataArray && allStatesDataResult.dataArray.length > 0) {
      return (
        <EnhancedTable
          tableDataArray={allStatesDataResult.dataArray}
          onDeleteClick={(data: any) => {
            onDeleteClick(data)
          }}
          deletionResponse={deletedStateResponse}
          renderEditComponent={({ labelId, row, isItemSelected, resetSelectedState }) => {
            return (
              <EditState
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
        title='No states found!'
        type='empty'
        message={allStatesDataResult?.message ?? ''}
      ></CustomisedErrorEmpty>
    )
  }

  const renderError = () => {
    return (
      <CustomisedErrorEmpty
        title='Error!'
        type='empty'
        message={allStatesDataResult?.message ?? ''}
      ></CustomisedErrorEmpty>
    )
  }

  const renderData = () => {
    if (allStatesDataResult?.isCompleted && !allStatesDataResult?.succeeded) {
      return renderError()
    }
    if (!allStatesDataResult?.dataArray || allStatesDataResult.dataArray.length <= 0) {
      return renderEmpty()
    }

    return renderDataTable()
  }

  const renderAlertDialog = () => {
    return (
      <CustomisedAlertDialog
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={handleDialogOpen}
        dialogTitle='Delete state!'
        dialogMessage={`Are you sure you want to delete ${selectedState?.title} state?`}
        dialogButtons={[
          {
            title: 'Yes',
            onClick: () => {
              deleteState()
            },
            autoFocus: true,
            color: 'error'
          },
          {
            title: 'No',
            onClick: () => {
              setIsDialogOpen(false)
              resetSelectedState()
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

export default TabAllStates
