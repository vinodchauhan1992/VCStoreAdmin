import { createSlice, createAction, PayloadAction } from '@reduxjs/toolkit'
import {
  AddDataCommonReducerModel,
  CommonReducerByIdDataArrayModel,
  CommonReducerByIdDataObjectModel,
  CommonReducerDataArrayModel,
  CommonReducerDataObjectModel,
  DeleteDataCommonReducerModel,
  UpdateDataCommonReducerModel
} from 'src/models/CommonModel'
import { ReduxStateModel, UserDropdownMenusStateModel } from 'src/models/ReduxStateModel'
import { UDMSMaxPriorityDataModel, UDMSModel } from 'src/models/UserDropdownMenusModel'

/* Signout Action */
const signOutAction = createAction('signout')

/* Initial State */
const initialState: UserDropdownMenusStateModel = {
  allUDMSData: {
    message: null,
    succeeded: false,
    isCompleted: false,
    dataArray: []
  },
  deletedUDMResponse: {
    message: null,
    succeeded: false,
    isCompleted: false,
    data: null
  },
  addUDMResponse: {
    message: null,
    succeeded: false,
    isCompleted: false,
    data: null
  },
  updateUDMResponse: {
    message: null,
    succeeded: false,
    isCompleted: false,
    data: null
  },
  udmsMaxPriorityData: {
    maxPriorityValue: 0
  },
  udmById: {
    message: null,
    succeeded: false,
    isCompleted: false,
    data: null
  },
  udmByPriority: {
    message: null,
    succeeded: false,
    isCompleted: false,
    data: null
  },
  udmsRegisteredPriorities: {
    message: null,
    succeeded: false,
    isCompleted: false,
    data: []
  }
}

const saveAllUDMSDataInfo = (
  state: UserDropdownMenusStateModel,
  action: PayloadAction<CommonReducerDataArrayModel<UDMSModel[]>>
): any => {
  state.allUDMSData = action?.payload ?? {
    message: null,
    succeeded: false,
    isCompleted: false,
    dataArray: []
  }
}

const saveDeletedUDMResponseInfo = (
  state: UserDropdownMenusStateModel,
  action: PayloadAction<DeleteDataCommonReducerModel<null>>
): any => {
  state.deletedUDMResponse = action?.payload ?? {
    message: null,
    succeeded: false,
    isCompleted: false,
    data: null
  }
}

const saveAddUDMResponseInfo = (
  state: UserDropdownMenusStateModel,
  action: PayloadAction<AddDataCommonReducerModel<UDMSModel>>
): any => {
  state.addUDMResponse = action?.payload ?? {
    message: null,
    succeeded: false,
    isCompleted: false,
    data: null
  }
}

const saveUpdateUDMResponseInfo = (
  state: UserDropdownMenusStateModel,
  action: PayloadAction<UpdateDataCommonReducerModel<UDMSModel>>
): any => {
  state.updateUDMResponse = action?.payload ?? {
    message: null,
    succeeded: false,
    isCompleted: false,
    data: null
  }
}

const saveUDMSMaxPriorityDataInfo = (
  state: UserDropdownMenusStateModel,
  action: PayloadAction<UDMSMaxPriorityDataModel>
): any => {
  state.udmsMaxPriorityData = action?.payload ?? {
    maxPriorityValue: 0
  }
}

const saveUDMDataByIdInfo = (
  state: UserDropdownMenusStateModel,
  action: PayloadAction<CommonReducerByIdDataObjectModel<UDMSModel>>
): any => {
  state.udmById = action?.payload ?? {
    message: null,
    succeeded: false,
    isCompleted: false,
    data: null
  }
}

const saveUDMDataByPriorityInfo = (
  state: UserDropdownMenusStateModel,
  action: PayloadAction<CommonReducerDataObjectModel<UDMSModel>>
): any => {
  state.udmByPriority = action?.payload ?? {
    message: null,
    succeeded: false,
    isCompleted: false,
    data: null
  }
}

const saveUDMSRegisteredPrioritiesInfo = (
  state: UserDropdownMenusStateModel,
  action: PayloadAction<CommonReducerByIdDataArrayModel<number[]>>
): any => {
  state.udmsRegisteredPriorities = action?.payload ?? {
    message: null,
    succeeded: false,
    isCompleted: false,
    data: []
  }
}

const resetAllUDMSDataResultInfo = (state: UserDropdownMenusStateModel): any => {
  state.allUDMSData = {
    message: null,
    succeeded: false,
    isCompleted: false,
    dataArray: state?.allUDMSData?.dataArray ?? []
  }
}

const resetDeletedUDMResponseInfo = (state: UserDropdownMenusStateModel): any => {
  state.deletedUDMResponse = {
    message: null,
    succeeded: false,
    isCompleted: false,
    data: null
  }
}

const resetAddedUDMResponseInfo = (state: UserDropdownMenusStateModel): any => {
  state.addUDMResponse = {
    message: null,
    succeeded: false,
    isCompleted: false,
    data: null
  }
}

const resetUDMDataByIdInfo = (state: UserDropdownMenusStateModel): any => {
  state.udmById = {
    message: null,
    succeeded: false,
    isCompleted: false,
    data: state?.udmById?.data ?? null
  }
}

const fullResetUDMDataByIdInfo = (state: UserDropdownMenusStateModel): any => {
  state.udmById = {
    message: null,
    succeeded: false,
    isCompleted: false,
    data: null
  }
}

const resetUDMDataByPriorityInfo = (state: UserDropdownMenusStateModel): any => {
  state.udmByPriority = {
    message: null,
    succeeded: false,
    isCompleted: false,
    data: state?.udmByPriority?.data ?? null
  }
}

const fullResetUDMDataByPriorityInfo = (state: UserDropdownMenusStateModel): any => {
  state.udmByPriority = {
    message: null,
    succeeded: false,
    isCompleted: false,
    data: null
  }
}

const resetUDMSRegisteredPrioritiesInfo = (state: UserDropdownMenusStateModel): any => {
  state.udmsRegisteredPriorities = {
    message: null,
    succeeded: false,
    isCompleted: false,
    data: state?.udmsRegisteredPriorities?.data ?? []
  }
}

const fullResetUDMSRegisteredPrioritiesInfo = (state: UserDropdownMenusStateModel): any => {
  state.udmsRegisteredPriorities = {
    message: null,
    succeeded: false,
    isCompleted: false,
    data: []
  }
}

const resetUpdatedUDMResponseInfo = (state: UserDropdownMenusStateModel): any => {
  state.updateUDMResponse = {
    message: null,
    succeeded: false,
    isCompleted: false,
    data: null
  }
}

const userDropdownMenusSlice: any = createSlice({
  name: 'userDropdownMenus',
  initialState: initialState,
  extraReducers: builder => {
    builder.addCase(signOutAction, state => {
      return { ...state }
    })
  },
  reducers: {
    saveAllUDMSData: saveAllUDMSDataInfo,
    saveDeletedUDMResponse: saveDeletedUDMResponseInfo,
    saveAddUDMResponse: saveAddUDMResponseInfo,
    saveUDMSMaxPriorityData: saveUDMSMaxPriorityDataInfo,
    saveUDMDataById: saveUDMDataByIdInfo,
    saveUDMDataByPriority: saveUDMDataByPriorityInfo,
    saveUDMSRegisteredPriorities: saveUDMSRegisteredPrioritiesInfo,
    saveUpdateUDMResponse: saveUpdateUDMResponseInfo,
    resetAllUDMSDataResult: resetAllUDMSDataResultInfo,
    resetDeletedUDMResponse: resetDeletedUDMResponseInfo,
    resetAddedUDMResponse: resetAddedUDMResponseInfo,
    resetUDMDataById: resetUDMDataByIdInfo,
    fullResetUDMDataById: fullResetUDMDataByIdInfo,
    resetUDMDataByPriority: resetUDMDataByPriorityInfo,
    fullResetUDMDataByPriority: fullResetUDMDataByPriorityInfo,
    resetUDMSRegisteredPriorities: resetUDMSRegisteredPrioritiesInfo,
    fullResetUDMSRegisteredPriorities: fullResetUDMSRegisteredPrioritiesInfo,
    resetUpdatedUDMResponse: resetUpdatedUDMResponseInfo
  }
})

// ACTIONS
const {
  saveAllUDMSData,
  saveDeletedUDMResponse,
  saveAddUDMResponse,
  saveUDMSMaxPriorityData,
  saveUDMDataById,
  saveUDMDataByPriority,
  saveUDMSRegisteredPriorities,
  saveUpdateUDMResponse,
  resetAllUDMSDataResult,
  resetDeletedUDMResponse,
  resetAddedUDMResponse,
  resetUDMDataById,
  fullResetUDMDataById,
  resetUDMDataByPriority,
  fullResetUDMDataByPriority,
  resetUDMSRegisteredPriorities,
  fullResetUDMSRegisteredPriorities,
  resetUpdatedUDMResponse
} = userDropdownMenusSlice.actions

// SELECTOR
const selectAllUDMSDataResult = (state: ReduxStateModel) => {
  return {
    message: state?.userDropdownMenus?.allUDMSData?.message ?? null,
    succeeded: state?.userDropdownMenus?.allUDMSData?.succeeded ?? false,
    isCompleted: state?.userDropdownMenus?.allUDMSData?.isCompleted ?? false,
    dataArray: state?.userDropdownMenus?.allUDMSData?.dataArray ?? []
  }
}

const selectDeletedUDMResponse = (state: ReduxStateModel) => {
  return {
    message: state?.userDropdownMenus?.deletedUDMResponse?.message ?? null,
    succeeded: state?.userDropdownMenus?.deletedUDMResponse?.succeeded ?? false,
    isCompleted: state?.userDropdownMenus?.deletedUDMResponse?.isCompleted ?? false,
    data: state?.userDropdownMenus?.deletedUDMResponse?.data ?? null
  }
}

const selectAddedUDMResponse = (state: ReduxStateModel) => {
  return {
    message: state?.userDropdownMenus?.addUDMResponse?.message ?? null,
    succeeded: state?.userDropdownMenus?.addUDMResponse?.succeeded ?? false,
    isCompleted: state?.userDropdownMenus?.addUDMResponse?.isCompleted ?? false,
    data: state?.userDropdownMenus?.addUDMResponse?.data ?? null
  }
}

const selectUpdatedUDMResponse = (state: ReduxStateModel) => {
  return {
    message: state?.userDropdownMenus?.updateUDMResponse?.message ?? null,
    succeeded: state?.userDropdownMenus?.updateUDMResponse?.succeeded ?? false,
    isCompleted: state?.userDropdownMenus?.updateUDMResponse?.isCompleted ?? false,
    data: state?.userDropdownMenus?.updateUDMResponse?.data ?? null
  }
}

const selectUDMSMaxPriorityDataValue = (state: ReduxStateModel) => {
  return state?.userDropdownMenus?.udmsMaxPriorityData?.maxPriorityValue
    ? state.userDropdownMenus.udmsMaxPriorityData.maxPriorityValue + 1
    : 1
}

const selectUDMDataByIdDataResult = (state: ReduxStateModel) => {
  return {
    message: state?.userDropdownMenus?.udmById?.message ?? null,
    succeeded: state?.userDropdownMenus?.udmById?.succeeded ?? false,
    isCompleted: state?.userDropdownMenus?.udmById?.isCompleted ?? false,
    data: state?.userDropdownMenus?.udmById?.data ?? null
  }
}

const selectUDMDataByPriorityDataResult = (state: ReduxStateModel) => {
  return {
    message: state?.userDropdownMenus?.udmByPriority?.message ?? null,
    succeeded: state?.userDropdownMenus?.udmByPriority?.succeeded ?? false,
    isCompleted: state?.userDropdownMenus?.udmByPriority?.isCompleted ?? false,
    data: state?.userDropdownMenus?.udmByPriority?.data ?? null
  }
}

const selectUDMSRegisteredPrioritiesDataResult = (state: ReduxStateModel) => {
  return {
    message: state?.userDropdownMenus?.udmsRegisteredPriorities?.message ?? null,
    succeeded: state?.userDropdownMenus?.udmsRegisteredPriorities?.succeeded ?? false,
    isCompleted: state?.userDropdownMenus?.udmsRegisteredPriorities?.isCompleted ?? false,
    data: state?.userDropdownMenus?.udmsRegisteredPriorities?.data ?? null
  }
}

const userDropdownMenusSliceReducer = userDropdownMenusSlice.reducer

export {
  userDropdownMenusSliceReducer,
  saveAllUDMSData,
  saveDeletedUDMResponse,
  saveAddUDMResponse,
  saveUDMSMaxPriorityData,
  saveUDMDataById,
  saveUDMDataByPriority,
  saveUDMSRegisteredPriorities,
  saveUpdateUDMResponse,
  resetAllUDMSDataResult,
  resetDeletedUDMResponse,
  resetAddedUDMResponse,
  resetUDMDataById,
  fullResetUDMDataById,
  resetUDMDataByPriority,
  fullResetUDMDataByPriority,
  resetUDMSRegisteredPriorities,
  fullResetUDMSRegisteredPriorities,
  resetUpdatedUDMResponse,
  selectAllUDMSDataResult,
  selectDeletedUDMResponse,
  selectAddedUDMResponse,
  selectUDMSMaxPriorityDataValue,
  selectUDMDataByIdDataResult,
  selectUDMDataByPriorityDataResult,
  selectUDMSRegisteredPrioritiesDataResult,
  selectUpdatedUDMResponse,
  signOutAction
}
