import { createSlice, createAction, PayloadAction } from '@reduxjs/toolkit'
import { AdminSubmenusModel } from 'src/models/AdminSubmenusModel'
import {
  AddDataCommonReducerModel,
  CommonReducerDataArrayModel,
  DeleteDataCommonReducerModel
} from 'src/models/CommonModel'
import { AdminSubmenusStateModel, ReduxStateModel } from 'src/models/ReduxStateModel'

/* Signout Action */
const signOutAction = createAction('signout')

/* Initial State */
const initialState: AdminSubmenusStateModel = {
  adminSubmenusData: {
    message: null,
    succeeded: false,
    isCompleted: false,
    dataArray: []
  },
  deletedAdminSubmenuResponse: {
    message: null,
    succeeded: false,
    isCompleted: false,
    data: null
  },
  addAdminSubmenuResponse: {
    message: null,
    succeeded: false,
    isCompleted: false,
    data: null
  }
}

const saveAllAdminSubmenusDataInfo = (
  state: AdminSubmenusStateModel,
  action: PayloadAction<CommonReducerDataArrayModel<AdminSubmenusModel[]>>
): any => {
  state.adminSubmenusData = action?.payload ?? []
}

const saveDeletedAdminSubmenuResponseInfo = (
  state: AdminSubmenusStateModel,
  action: PayloadAction<DeleteDataCommonReducerModel<null>>
): any => {
  state.deletedAdminSubmenuResponse = action?.payload ?? {
    message: null,
    succeeded: false,
    isCompleted: false,
    data: null
  }
}

const saveAddAdminSubmenuResponseInfo = (
  state: AdminSubmenusStateModel,
  action: PayloadAction<AddDataCommonReducerModel<AdminSubmenusModel>>
): any => {
  state.addAdminSubmenuResponse = action?.payload ?? {
    message: null,
    succeeded: false,
    isCompleted: false,
    data: null
  }
}

const resetAllAdminSubmenusDataResultInfo = (state: AdminSubmenusStateModel): any => {
  state.adminSubmenusData = {
    message: null,
    succeeded: false,
    isCompleted: false,
    dataArray: state?.adminSubmenusData?.dataArray ?? []
  }
}

const resetDeletedAdminSubmenuResponseInfo = (state: AdminSubmenusStateModel): any => {
  state.deletedAdminSubmenuResponse = {
    message: null,
    succeeded: false,
    isCompleted: false,
    data: null
  }
}

const resetAddedAdminSubmenuResponseInfo = (state: AdminSubmenusStateModel): any => {
  state.addAdminSubmenuResponse = {
    message: null,
    succeeded: false,
    isCompleted: false,
    data: null
  }
}

const adminSubmenusSlice: any = createSlice({
  name: 'adminSubmenus',
  initialState: initialState,
  extraReducers: builder => {
    builder.addCase(signOutAction, state => {
      return { ...state }
    })
  },
  reducers: {
    saveAllAdminSubmenusData: saveAllAdminSubmenusDataInfo,
    saveDeletedAdminSubmenuResponse: saveDeletedAdminSubmenuResponseInfo,
    saveAddAdminSubmenuResponse: saveAddAdminSubmenuResponseInfo,
    resetAllAdminSubmenusDataResult: resetAllAdminSubmenusDataResultInfo,
    resetDeletedAdminSubmenuResponse: resetDeletedAdminSubmenuResponseInfo,
    resetAddedAdminSubmenuResponse: resetAddedAdminSubmenuResponseInfo
  }
})

// ACTIONS
const {
  saveAllAdminSubmenusData,
  saveDeletedAdminSubmenuResponse,
  saveAddAdminSubmenuResponse,
  resetAllAdminSubmenusDataResult,
  resetDeletedAdminSubmenuResponse,
  resetAddedAdminSubmenuResponse
} = adminSubmenusSlice.actions

// SELECTOR
const selectAllAdminSubmenusDataResult = (state: ReduxStateModel) => {
  return {
    message: state?.adminSubmenus?.adminSubmenusData?.message ?? null,
    succeeded: state?.adminSubmenus?.adminSubmenusData?.succeeded ?? false,
    isCompleted: state?.adminSubmenus?.adminSubmenusData?.isCompleted ?? false,
    dataArray: state?.adminSubmenus?.adminSubmenusData?.dataArray ?? []
  }
}

const selectDeletedAdminSubmenuResponse = (state: ReduxStateModel) => {
  return {
    message: state?.adminSubmenus?.deletedAdminSubmenuResponse?.message ?? null,
    succeeded: state?.adminSubmenus?.deletedAdminSubmenuResponse?.succeeded ?? false,
    isCompleted: state?.adminSubmenus?.deletedAdminSubmenuResponse?.isCompleted ?? false,
    data: state?.adminSubmenus?.deletedAdminSubmenuResponse?.data ?? null
  }
}

const selectAddedAdminSubmenuResponse = (state: ReduxStateModel) => {
  return {
    message: state?.adminSubmenus?.addAdminSubmenuResponse?.message ?? null,
    succeeded: state?.adminSubmenus?.addAdminSubmenuResponse?.succeeded ?? false,
    isCompleted: state?.adminSubmenus?.addAdminSubmenuResponse?.isCompleted ?? false,
    data: state?.adminSubmenus?.addAdminSubmenuResponse?.data ?? null
  }
}

const adminSubmenusSliceReducer = adminSubmenusSlice.reducer

export {
  adminSubmenusSliceReducer,
  saveAllAdminSubmenusData,
  saveDeletedAdminSubmenuResponse,
  saveAddAdminSubmenuResponse,
  resetAllAdminSubmenusDataResult,
  resetDeletedAdminSubmenuResponse,
  resetAddedAdminSubmenuResponse,
  selectAllAdminSubmenusDataResult,
  selectDeletedAdminSubmenuResponse,
  selectAddedAdminSubmenuResponse,
  signOutAction
}
