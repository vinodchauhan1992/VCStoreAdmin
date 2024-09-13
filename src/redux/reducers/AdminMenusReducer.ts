import { createSlice, createAction, PayloadAction } from '@reduxjs/toolkit'
import { AdminMenusModel } from 'src/models/AdminMenusModel'
import {
  AddDataCommonReducerModel,
  CommonReducerDataArrayModel,
  DeleteDataCommonReducerModel
} from 'src/models/CommonModel'
import { AdminMenusStateModel, ReduxStateModel } from 'src/models/ReduxStateModel'

/* Signout Action */
const signOutAction = createAction('signout')

/* Initial State */
const initialState: AdminMenusStateModel = {
  adminMenusData: {
    message: null,
    succeeded: false,
    isCompleted: false,
    dataArray: []
  },
  deletedAdminMenuResponse: {
    message: null,
    succeeded: false,
    isCompleted: false,
    data: null
  },
  addAdminMenuResponse: {
    message: null,
    succeeded: false,
    isCompleted: false,
    data: null
  }
}

const saveAllAdminMenusDataInfo = (
  state: AdminMenusStateModel,
  action: PayloadAction<CommonReducerDataArrayModel<AdminMenusModel[]>>
): any => {
  state.adminMenusData = action?.payload ?? []
}

const saveDeletedAdminMenuResponseInfo = (
  state: AdminMenusStateModel,
  action: PayloadAction<DeleteDataCommonReducerModel<null>>
): any => {
  state.deletedAdminMenuResponse = action?.payload ?? {
    message: null,
    succeeded: false,
    isCompleted: false,
    data: null
  }
}

const saveAddAdminMenuResponseInfo = (
  state: AdminMenusStateModel,
  action: PayloadAction<AddDataCommonReducerModel<AdminMenusModel>>
): any => {
  state.addAdminMenuResponse = action?.payload ?? {
    message: null,
    succeeded: false,
    isCompleted: false,
    data: null
  }
}

const resetAllAdminMenusDataResultInfo = (state: AdminMenusStateModel): any => {
  state.adminMenusData = {
    message: null,
    succeeded: false,
    isCompleted: false,
    dataArray: state?.adminMenusData?.dataArray ?? []
  }
}

const resetDeletedAdminMenuResponseInfo = (state: AdminMenusStateModel): any => {
  state.deletedAdminMenuResponse = {
    message: null,
    succeeded: false,
    isCompleted: false,
    data: null
  }
}

const resetAddedAdminMenuResponseInfo = (state: AdminMenusStateModel): any => {
  state.addAdminMenuResponse = {
    message: null,
    succeeded: false,
    isCompleted: false,
    data: null
  }
}

const adminMenusSlice: any = createSlice({
  name: 'adminMenus',
  initialState: initialState,
  extraReducers: builder => {
    builder.addCase(signOutAction, state => {
      return { ...state }
    })
  },
  reducers: {
    saveAllAdminMenusData: saveAllAdminMenusDataInfo,
    saveDeletedAdminMenuResponse: saveDeletedAdminMenuResponseInfo,
    saveAddAdminMenuResponse: saveAddAdminMenuResponseInfo,
    resetAllAdminMenusDataResult: resetAllAdminMenusDataResultInfo,
    resetDeletedAdminMenuResponse: resetDeletedAdminMenuResponseInfo,
    resetAddedAdminMenuResponse: resetAddedAdminMenuResponseInfo
  }
})

// ACTIONS
const {
  saveAllAdminMenusData,
  saveDeletedAdminMenuResponse,
  saveAddAdminMenuResponse,
  resetAllAdminMenusDataResult,
  resetDeletedAdminMenuResponse,
  resetAddedAdminMenuResponse
} = adminMenusSlice.actions

// SELECTOR
const selectAllAdminMenusDataResult = (state: ReduxStateModel) => {
  return {
    message: state?.adminMenus?.adminMenusData?.message ?? null,
    succeeded: state?.adminMenus?.adminMenusData?.succeeded ?? false,
    isCompleted: state?.adminMenus?.adminMenusData?.isCompleted ?? false,
    dataArray: state?.adminMenus?.adminMenusData?.dataArray ?? []
  }
}

const selectDeletedAdminMenuResponse = (state: ReduxStateModel) => {
  return {
    message: state?.adminMenus?.deletedAdminMenuResponse?.message ?? null,
    succeeded: state?.adminMenus?.deletedAdminMenuResponse?.succeeded ?? false,
    isCompleted: state?.adminMenus?.deletedAdminMenuResponse?.isCompleted ?? false,
    data: state?.adminMenus?.deletedAdminMenuResponse?.data ?? null
  }
}

const selectAddedAdminMenuResponse = (state: ReduxStateModel) => {
  return {
    message: state?.adminMenus?.addAdminMenuResponse?.message ?? null,
    succeeded: state?.adminMenus?.addAdminMenuResponse?.succeeded ?? false,
    isCompleted: state?.adminMenus?.addAdminMenuResponse?.isCompleted ?? false,
    data: state?.adminMenus?.addAdminMenuResponse?.data ?? null
  }
}

const adminMenusSliceReducer = adminMenusSlice.reducer

export {
  adminMenusSliceReducer,
  saveAllAdminMenusData,
  saveDeletedAdminMenuResponse,
  saveAddAdminMenuResponse,
  resetAllAdminMenusDataResult,
  resetDeletedAdminMenuResponse,
  resetAddedAdminMenuResponse,
  selectAllAdminMenusDataResult,
  selectDeletedAdminMenuResponse,
  selectAddedAdminMenuResponse,
  signOutAction
}
