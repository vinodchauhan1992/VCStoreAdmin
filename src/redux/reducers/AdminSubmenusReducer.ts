import { createSlice, createAction, PayloadAction } from '@reduxjs/toolkit'
import { AdminSubmenusMaxPriorityDataModel, AdminSubmenusModel } from 'src/models/AdminSubmenusModel'
import {
  AddDataCommonReducerModel,
  CommonReducerDataArrayModel,
  CommonReducerByIdDataArrayModel,
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
  },
  submenusMaxPriorityData: {
    maxPriorityValue: 0
  },
  adminSubmenusDataByMenuId: {
    isCompleted: false,
    succeeded: false,
    message: null,
    data: []
  }
}

const saveAllAdminSubmenusDataInfo = (
  state: AdminSubmenusStateModel,
  action: PayloadAction<CommonReducerDataArrayModel<AdminSubmenusModel[]>>
): any => {
  state.adminSubmenusData = action?.payload ?? {
    message: null,
    succeeded: false,
    isCompleted: false,
    dataArray: []
  }
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

const saveSubmenusMaxPriorityDataInfo = (
  state: AdminSubmenusStateModel,
  action: PayloadAction<AdminSubmenusMaxPriorityDataModel>
): any => {
  state.submenusMaxPriorityData = action?.payload ?? {
    maxPriorityValue: 0
  }
}

const saveAdminSubmenusDataByMenuIdInfo = (
  state: AdminSubmenusStateModel,
  action: PayloadAction<CommonReducerByIdDataArrayModel<AdminSubmenusModel[]>>
): any => {
  state.adminSubmenusDataByMenuId = action?.payload ?? {
    isCompleted: false,
    succeeded: false,
    message: null,
    data: []
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

const resetAdminSubmenusByMenuIdDataResultInfo = (state: AdminSubmenusStateModel): any => {
  state.adminSubmenusDataByMenuId = {
    message: null,
    succeeded: false,
    isCompleted: false,
    data: state?.adminSubmenusDataByMenuId?.data ?? []
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
    saveSubmenusMaxPriorityData: saveSubmenusMaxPriorityDataInfo,
    saveAdminSubmenusDataByMenuId: saveAdminSubmenusDataByMenuIdInfo,
    resetAllAdminSubmenusDataResult: resetAllAdminSubmenusDataResultInfo,
    resetDeletedAdminSubmenuResponse: resetDeletedAdminSubmenuResponseInfo,
    resetAddedAdminSubmenuResponse: resetAddedAdminSubmenuResponseInfo,
    resetAdminSubmenusByMenuIdDataResult: resetAdminSubmenusByMenuIdDataResultInfo
  }
})

// ACTIONS
const {
  saveAllAdminSubmenusData,
  saveDeletedAdminSubmenuResponse,
  saveAddAdminSubmenuResponse,
  saveSubmenusMaxPriorityData,
  saveAdminSubmenusDataByMenuId,
  resetAllAdminSubmenusDataResult,
  resetDeletedAdminSubmenuResponse,
  resetAddedAdminSubmenuResponse,
  resetAdminSubmenusByMenuIdDataResult
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

const selectSubmenusMaxPriorityDataValue = (state: ReduxStateModel) => {
  return state?.adminSubmenus?.submenusMaxPriorityData?.maxPriorityValue
    ? state.adminSubmenus.submenusMaxPriorityData.maxPriorityValue + 1
    : 1
}

const selectAdminSubmenusDataByMenuIdResponse = (state: ReduxStateModel) => {
  return {
    message: state?.adminSubmenus?.adminSubmenusDataByMenuId?.message ?? null,
    succeeded: state?.adminSubmenus?.adminSubmenusDataByMenuId?.succeeded ?? false,
    isCompleted: state?.adminSubmenus?.adminSubmenusDataByMenuId?.isCompleted ?? false,
    data: state?.adminSubmenus?.adminSubmenusDataByMenuId?.data ?? []
  }
}

const adminSubmenusSliceReducer = adminSubmenusSlice.reducer

export {
  adminSubmenusSliceReducer,
  saveAllAdminSubmenusData,
  saveDeletedAdminSubmenuResponse,
  saveAddAdminSubmenuResponse,
  saveSubmenusMaxPriorityData,
  saveAdminSubmenusDataByMenuId,
  resetAllAdminSubmenusDataResult,
  resetDeletedAdminSubmenuResponse,
  resetAddedAdminSubmenuResponse,
  resetAdminSubmenusByMenuIdDataResult,
  selectAllAdminSubmenusDataResult,
  selectDeletedAdminSubmenuResponse,
  selectAddedAdminSubmenuResponse,
  selectSubmenusMaxPriorityDataValue,
  selectAdminSubmenusDataByMenuIdResponse,
  signOutAction
}
