// ** React Imports
import { useState, useEffect } from 'react'

// ** MUI Imports
import CardContent from '@mui/material/CardContent'
import CustomisedErrorEmpty from 'src/@core/components/customised-error-empty/CustomisedErrorEmpty'
import CustomisedAlertDialog from 'src/@core/components/customised-alert-dialog/CustomisedAlertDialog'
import { UserDropdownMenusReducer, useAppDispatch, useAppSelector } from 'src/redux/reducers'
import EnhancedTable from 'src/@core/components/enhanced-table-view/EnhancedTable'
import EditUDM from 'src/views/userDropdownMenu/components/editUDM/EditUDM'
import { UDMSModel } from 'src/models/UserDropdownMenusModel'

const TabAllUDMS = () => {
  // ** State
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
  const [selectedUDM, setSelectedUDM] = useState<UDMSModel | null>(null)

  const dispatch = useAppDispatch()

  // @ts-ignore
  const allUDMSDataResult = useAppSelector(UserDropdownMenusReducer.selectAllUDMSDataResult)
  // @ts-ignore
  const deletedUDMResponse = useAppSelector(UserDropdownMenusReducer.selectDeletedUDMResponse)

  const callAllUDMSApi = () => {
    dispatch({ type: 'FETCH_ALL_UDMS' })
  }

  useEffect(() => {
    callAllUDMSApi()
  }, [])

  const resetSelectedUDM = () => {
    setSelectedUDM(null)
    setIsDialogOpen(false)
  }

  useEffect(() => {
    if (deletedUDMResponse?.isCompleted) {
      resetSelectedUDM()
      if (deletedUDMResponse?.succeeded) {
        dispatch(UserDropdownMenusReducer.resetDeletedUDMResponse())
        callAllUDMSApi()
      } else {
        dispatch(UserDropdownMenusReducer.resetDeletedUDMResponse())
      }
    }
  }, [deletedUDMResponse])

  const deleteUDM = async () => {
    dispatch({ type: 'DELETE_UDM', payload: { udmId: selectedUDM?.id } })
  }

  const onDeleteClick = async (udmData: UDMSModel) => {
    setSelectedUDM(udmData)
    setIsDialogOpen(true)
  }

  const handleDialogOpen = () => {
    setIsDialogOpen(!isDialogOpen)
  }

  const renderDataTable = () => {
    if (allUDMSDataResult?.dataArray && allUDMSDataResult.dataArray.length > 0) {
      return (
        <EnhancedTable
          tableDataArray={allUDMSDataResult.dataArray}
          onDeleteClick={(data: any) => {
            onDeleteClick(data)
          }}
          deletionResponse={deletedUDMResponse}
          renderEditComponent={({ labelId, row, isItemSelected, resetSelectedState }) => {
            return (
              <EditUDM
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
        title='No user dropdown menus found!'
        type='empty'
        message={allUDMSDataResult?.message ?? ''}
      ></CustomisedErrorEmpty>
    )
  }

  const renderError = () => {
    return (
      <CustomisedErrorEmpty
        title='Error!'
        type='empty'
        message={allUDMSDataResult?.message ?? ''}
      ></CustomisedErrorEmpty>
    )
  }

  const renderData = () => {
    if (allUDMSDataResult?.isCompleted && !allUDMSDataResult?.succeeded) {
      return renderError()
    }
    if (!allUDMSDataResult?.dataArray || allUDMSDataResult.dataArray.length <= 0) {
      return renderEmpty()
    }

    return renderDataTable()
  }

  const renderAlertDialog = () => {
    return (
      <CustomisedAlertDialog
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={handleDialogOpen}
        dialogTitle='Delete user dropdown menu!'
        dialogMessage={`Are you sure you want to delete ${selectedUDM?.title} user dropdown menu?`}
        dialogButtons={[
          {
            title: 'Yes',
            onClick: () => {
              deleteUDM()
            },
            autoFocus: true,
            color: 'error'
          },
          {
            title: 'No',
            onClick: () => {
              setIsDialogOpen(false)
              resetSelectedUDM()
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

export default TabAllUDMS
