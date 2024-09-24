import { createSlice, createAction, PayloadAction } from '@reduxjs/toolkit'
import { AdminMenuStatusesModel } from 'src/models/AdminMenuStatusesModel'
import {
  AddDataCommonReducerModel,
  CommonReducerDataArrayModel,
  DeleteDataCommonReducerModel
} from 'src/models/CommonModel'
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
  },
  deletedAdminMenuStatusResponse: {
    message: null,
    succeeded: false,
    isCompleted: false,
    data: null
  },
  addAdminMenuStatusResponse: {
    message: null,
    succeeded: false,
    isCompleted: false,
    data: null
  }
}

const saveAllAdminMenuStatusesDataInfo = (
  state: AdminMenuStatusesStateModel,
  action: PayloadAction<CommonReducerDataArrayModel<AdminMenuStatusesModel[]>>
): any => {
  state.adminMenuStatusesData = action?.payload ?? {
    message: null,
    succeeded: false,
    isCompleted: false,
    dataArray: []
  }
}

const saveDeletedAdminMenuStatusResponseInfo = (
  state: AdminMenuStatusesStateModel,
  action: PayloadAction<DeleteDataCommonReducerModel<null>>
): any => {
  state.deletedAdminMenuStatusResponse = action?.payload ?? {
    message: null,
    succeeded: false,
    isCompleted: false,
    data: null
  }
}

const saveAddAdminMenuStatusResponseInfo = (
  state: AdminMenuStatusesStateModel,
  action: PayloadAction<AddDataCommonReducerModel<AdminMenuStatusesModel>>
): any => {
  state.addAdminMenuStatusResponse = action?.payload ?? {
    message: null,
    succeeded: false,
    isCompleted: false,
    data: null
  }
}

const resetAllAdminMenuStatusesDataResultInfo = (state: AdminMenuStatusesStateModel): any => {
  state.adminMenuStatusesData = {
    message: null,
    succeeded: false,
    isCompleted: false,
    dataArray: state?.adminMenuStatusesData?.dataArray ?? []
  }
}

const resetDeletedAdminMenuStatusResponseInfo = (state: AdminMenuStatusesStateModel): any => {
  state.deletedAdminMenuStatusResponse = {
    message: null,
    succeeded: false,
    isCompleted: false,
    data: null
  }
}

const resetAddedAdminMenuStatusResponseInfo = (state: AdminMenuStatusesStateModel): any => {
  state.addAdminMenuStatusResponse = {
    message: null,
    succeeded: false,
    isCompleted: false,
    data: null
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
    saveDeletedAdminMenuStatusResponse: saveDeletedAdminMenuStatusResponseInfo,
    saveAddAdminMenuStatusResponse: saveAddAdminMenuStatusResponseInfo,
    resetAllAdminMenuStatusesDataResult: resetAllAdminMenuStatusesDataResultInfo,
    resetDeletedAdminMenuStatusResponse: resetDeletedAdminMenuStatusResponseInfo,
    resetAddedAdminMenuStatusResponse: resetAddedAdminMenuStatusResponseInfo
  }
})

// ACTIONS
const {
  saveAllAdminMenuStatusesData,
  saveDeletedAdminMenuStatusResponse,
  saveAddAdminMenuStatusResponse,
  resetAllAdminMenuStatusesDataResult,
  resetDeletedAdminMenuStatusResponse,
  resetAddedAdminMenuStatusResponse
} = adminMenuStatusesSlice.actions

// SELECTOR
const selectAllAdminMenuStatusesDataResult = (state: ReduxStateModel) => {
  return {
    message: state?.adminMenuStatuses?.adminMenuStatusesData?.message ?? null,
    succeeded: state?.adminMenuStatuses?.adminMenuStatusesData?.succeeded ?? false,
    isCompleted: state?.adminMenuStatuses?.adminMenuStatusesData?.isCompleted ?? false,
    dataArray: state?.adminMenuStatuses?.adminMenuStatusesData?.dataArray ?? []
  }
}

const selectDeletedAdminMenuStatusResponse = (state: ReduxStateModel) => {
  return {
    message: state?.adminMenuStatuses?.deletedAdminMenuStatusResponse?.message ?? null,
    succeeded: state?.adminMenuStatuses?.deletedAdminMenuStatusResponse?.succeeded ?? false,
    isCompleted: state?.adminMenuStatuses?.deletedAdminMenuStatusResponse?.isCompleted ?? false,
    data: state?.adminMenuStatuses?.deletedAdminMenuStatusResponse?.data ?? null
  }
}

const selectAddedAdminMenuStatusResponse = (state: ReduxStateModel) => {
  return {
    message: state?.adminMenuStatuses?.addAdminMenuStatusResponse?.message ?? null,
    succeeded: state?.adminMenuStatuses?.addAdminMenuStatusResponse?.succeeded ?? false,
    isCompleted: state?.adminMenuStatuses?.addAdminMenuStatusResponse?.isCompleted ?? false,
    data: state?.adminMenuStatuses?.addAdminMenuStatusResponse?.data ?? null
  }
}

const adminMenuStatusesSliceReducer = adminMenuStatusesSlice.reducer

export {
  adminMenuStatusesSliceReducer,
  saveAllAdminMenuStatusesData,
  saveDeletedAdminMenuStatusResponse,
  saveAddAdminMenuStatusResponse,
  resetAllAdminMenuStatusesDataResult,
  resetDeletedAdminMenuStatusResponse,
  resetAddedAdminMenuStatusResponse,
  selectAllAdminMenuStatusesDataResult,
  selectDeletedAdminMenuStatusResponse,
  selectAddedAdminMenuStatusResponse,
  signOutAction
}
