import { createSlice, createAction, PayloadAction } from '@reduxjs/toolkit'
import { AdminMenuStatusesModel } from 'src/models/AdminMenuStatusesModel'
import { CommonReducerDataArrayModel } from 'src/models/CommonModel'
import { AdminMenuStatusesStateModel, ReduxStateModel } from 'src/models/ReduxStateModel'

/* Signout Action */
const signOutAction = createAction('signout')

/* Initial State */
const initialState: AdminMenuStatusesStateModel = {
  adminMenuStatusesData: {
    message: null,
    succeeded: false,
    isCompleted: false,
    dataArray: []
  }
}

const saveAllAdminMenuStatusesDataInfo = (
  state: AdminMenuStatusesStateModel,
  action: PayloadAction<CommonReducerDataArrayModel<AdminMenuStatusesModel[]>>
): any => {
  state.adminMenuStatusesData = action?.payload ?? []
}

const resetAllAdminMenuStatusesDataResultInfo = (state: AdminMenuStatusesStateModel): any => {
  state.adminMenuStatusesData = {
    message: null,
    succeeded: false,
    isCompleted: false,
    dataArray: state?.adminMenuStatusesData?.dataArray ?? []
  }
}

const adminMenuStatusesSlice: any = createSlice({
  name: 'adminMenuStatuses',
  initialState: initialState,
  extraReducers: builder => {
    builder.addCase(signOutAction, state => {
      return { ...state }
    })
  },
  reducers: {
    saveAllAdminMenuStatusesData: saveAllAdminMenuStatusesDataInfo,
    resetAllAdminMenuStatusesDataResult: resetAllAdminMenuStatusesDataResultInfo
  }
})

// ACTIONS
const { saveAllAdminMenuStatusesData, resetAllAdminMenuStatusesDataResult } = adminMenuStatusesSlice.actions

// SELECTOR
const selectAllAdminMenuStatusesData = (state: ReduxStateModel) => {
  return state?.adminMenuStatuses?.adminMenuStatusesData?.dataArray ?? []
}

const selectAllAdminMenuStatusesDataResult = (state: ReduxStateModel) => {
  return {
    message: state?.adminMenuStatuses?.adminMenuStatusesData?.message ?? null,
    succeeded: state?.adminMenuStatuses?.adminMenuStatusesData?.succeeded ?? false,
    isCompleted: state?.adminMenuStatuses?.adminMenuStatusesData?.isCompleted ?? false,
    dataArray: state?.adminMenuStatuses?.adminMenuStatusesData?.dataArray ?? [],
  }
}

const adminMenuStatusesSliceReducer = adminMenuStatusesSlice.reducer

export {
  adminMenuStatusesSliceReducer,
  saveAllAdminMenuStatusesData,
  resetAllAdminMenuStatusesDataResult,
  selectAllAdminMenuStatusesData,
  selectAllAdminMenuStatusesDataResult,
  signOutAction
}
