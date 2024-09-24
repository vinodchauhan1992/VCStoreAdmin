import { createSlice, createAction, PayloadAction } from '@reduxjs/toolkit'
import {
  AddDataCommonReducerModel,
  CommonReducerByIdDataArrayModel,
  CommonReducerByIdDataObjectModel,
  CommonReducerDataArrayModel,
  DeleteDataCommonReducerModel,
  UpdateDataCommonReducerModel
} from 'src/models/CommonModel'
import { ReduxStateModel, StatesStateModel } from 'src/models/ReduxStateModel'
import { StatesModel } from 'src/models/StatesModel'

/* Signout Action */
const signOutAction = createAction('signout')

/* Initial State */
const initialState: StatesStateModel = {
  statesData: {
    message: null,
    succeeded: false,
    isCompleted: false,
    dataArray: []
  },
  deletedStateResponse: {
    message: null,
    succeeded: false,
    isCompleted: false,
    data: null
  },
  addStateResponse: {
    message: null,
    succeeded: false,
    isCompleted: false,
    data: null
  },
  updateStateResponse: {
    message: null,
    succeeded: false,
    isCompleted: false,
    data: null
  },
  statesDataByCountryId: {
    message: null,
    succeeded: false,
    isCompleted: false,
    data: []
  },
  stateDataByStateId: {
    message: null,
    succeeded: false,
    isCompleted: false,
    data: null
  }
}

const saveAllStatesDataInfo = (
  state: StatesStateModel,
  action: PayloadAction<CommonReducerDataArrayModel<StatesModel[]>>
): any => {
  state.statesData = action?.payload ?? {
    message: null,
    succeeded: false,
    isCompleted: false,
    dataArray: []
  }
}

const saveDeletedStateResponseInfo = (
  state: StatesStateModel,
  action: PayloadAction<DeleteDataCommonReducerModel<null>>
): any => {
  state.deletedStateResponse = action?.payload ?? {
    message: null,
    succeeded: false,
    isCompleted: false,
    data: null
  }
}

const saveAddStateResponseInfo = (
  state: StatesStateModel,
  action: PayloadAction<AddDataCommonReducerModel<StatesModel>>
): any => {
  state.addStateResponse = action?.payload ?? {
    message: null,
    succeeded: false,
    isCompleted: false,
    data: null
  }
}

const saveUpdateStateResponseInfo = (
  state: StatesStateModel,
  action: PayloadAction<UpdateDataCommonReducerModel<StatesModel>>
): any => {
  state.updateStateResponse = action?.payload ?? {
    message: null,
    succeeded: false,
    isCompleted: false,
    data: null
  }
}

const saveStatesDataByCountryIdInfo = (
  state: StatesStateModel,
  action: PayloadAction<CommonReducerByIdDataArrayModel<StatesModel[]>>
): any => {
  state.statesDataByCountryId = action?.payload ?? {
    message: null,
    succeeded: false,
    isCompleted: false,
    data: []
  }
}

const saveStateDataByStateIdInfo = (
  state: StatesStateModel,
  action: PayloadAction<CommonReducerByIdDataObjectModel<StatesModel>>
): any => {
  state.stateDataByStateId = action?.payload ?? {
    message: null,
    succeeded: false,
    isCompleted: false,
    data: null
  }
}

const resetAllStatesDataResultInfo = (state: StatesStateModel): any => {
  state.statesData = {
    message: null,
    succeeded: false,
    isCompleted: false,
    dataArray: state?.statesData?.dataArray ?? []
  }
}

const resetDeletedStateResponseInfo = (state: StatesStateModel): any => {
  state.deletedStateResponse = {
    message: null,
    succeeded: false,
    isCompleted: false,
    data: null
  }
}

const resetAddedStateResponseInfo = (state: StatesStateModel): any => {
  state.addStateResponse = {
    message: null,
    succeeded: false,
    isCompleted: false,
    data: null
  }
}

const resetUpdatedStateResponseInfo = (state: StatesStateModel): any => {
  state.updateStateResponse = {
    message: null,
    succeeded: false,
    isCompleted: false,
    data: null
  }
}

const resetStatesDataByCountryIdResultInfo = (state: StatesStateModel): any => {
  state.statesDataByCountryId = {
    message: null,
    succeeded: false,
    isCompleted: false,
    data: state?.statesDataByCountryId?.data ?? []
  }
}

const resetAllStatesDataByCountryIdResultInfo = (state: StatesStateModel): any => {
  state.statesDataByCountryId = {
    message: null,
    succeeded: false,
    isCompleted: false,
    data: []
  }
}

const resetStateDataByStateIdInfo = (state: StatesStateModel): any => {
  state.stateDataByStateId = {
    message: null,
    succeeded: false,
    isCompleted: false,
    data: null
  }
}

const statesSlice: any = createSlice({
  name: 'states',
  initialState: initialState,
  extraReducers: builder => {
    builder.addCase(signOutAction, state => {
      return { ...state }
    })
  },
  reducers: {
    saveAllStatesData: saveAllStatesDataInfo,
    saveDeletedStateResponse: saveDeletedStateResponseInfo,
    saveAddStateResponse: saveAddStateResponseInfo,
    saveUpdateStateResponse: saveUpdateStateResponseInfo,
    saveStatesDataByCountryId: saveStatesDataByCountryIdInfo,
    saveStateDataByStateId: saveStateDataByStateIdInfo,
    resetAllStatesDataResult: resetAllStatesDataResultInfo,
    resetDeletedStateResponse: resetDeletedStateResponseInfo,
    resetAddedStateResponse: resetAddedStateResponseInfo,
    resetUpdatedStateResponse: resetUpdatedStateResponseInfo,
    resetStatesDataByCountryIdResult: resetStatesDataByCountryIdResultInfo,
    resetAllStatesDataByCountryIdResult: resetAllStatesDataByCountryIdResultInfo,
    resetStateDataByStateId: resetStateDataByStateIdInfo
  }
})

// ACTIONS
const {
  saveAllStatesData,
  saveDeletedStateResponse,
  saveAddStateResponse,
  saveUpdateStateResponse,
  saveStatesDataByCountryId,
  saveStateDataByStateId,
  resetAllStatesDataResult,
  resetDeletedStateResponse,
  resetAddedStateResponse,
  resetUpdatedStateResponse,
  resetStatesDataByCountryIdResult,
  resetAllStatesDataByCountryIdResult,
  resetStateDataByStateId
} = statesSlice.actions

// SELECTOR
const selectAllStatesDataResult = (state: ReduxStateModel) => {
  return {
    message: state?.states?.statesData?.message ?? null,
    succeeded: state?.states?.statesData?.succeeded ?? false,
    isCompleted: state?.states?.statesData?.isCompleted ?? false,
    dataArray: state?.states?.statesData?.dataArray ?? []
  }
}

const selectDeletedStateResponse = (state: ReduxStateModel) => {
  return {
    message: state?.states?.deletedStateResponse?.message ?? null,
    succeeded: state?.states?.deletedStateResponse?.succeeded ?? false,
    isCompleted: state?.states?.deletedStateResponse?.isCompleted ?? false,
    data: state?.states?.deletedStateResponse?.data ?? null
  }
}

const selectAddedStateResponse = (state: ReduxStateModel) => {
  return {
    message: state?.states?.addStateResponse?.message ?? null,
    succeeded: state?.states?.addStateResponse?.succeeded ?? false,
    isCompleted: state?.states?.addStateResponse?.isCompleted ?? false,
    data: state?.states?.addStateResponse?.data ?? null
  }
}

const selectUpdatedStateResponse = (state: ReduxStateModel) => {
  return {
    message: state?.states?.updateStateResponse?.message ?? null,
    succeeded: state?.states?.updateStateResponse?.succeeded ?? false,
    isCompleted: state?.states?.updateStateResponse?.isCompleted ?? false,
    data: state?.states?.updateStateResponse?.data ?? null
  }
}

const selectStatesDataByCountryIdResult = (state: ReduxStateModel) => {
  return {
    message: state?.states?.statesDataByCountryId?.message ?? null,
    succeeded: state?.states?.statesDataByCountryId?.succeeded ?? false,
    isCompleted: state?.states?.statesDataByCountryId?.isCompleted ?? false,
    data: state?.states?.statesDataByCountryId?.data ?? []
  }
}

const selectStateDataByStateIdResult = (state: ReduxStateModel) => {
  return {
    message: state?.states?.stateDataByStateId?.message ?? null,
    succeeded: state?.states?.stateDataByStateId?.succeeded ?? false,
    isCompleted: state?.states?.stateDataByStateId?.isCompleted ?? false,
    data: state?.states?.stateDataByStateId?.data ?? null
  }
}

const statesSliceReducer = statesSlice.reducer

export {
  statesSliceReducer,
  saveAllStatesData,
  saveDeletedStateResponse,
  saveAddStateResponse,
  saveUpdateStateResponse,
  saveStatesDataByCountryId,
  saveStateDataByStateId,
  resetAllStatesDataResult,
  resetDeletedStateResponse,
  resetAddedStateResponse,
  resetUpdatedStateResponse,
  resetStatesDataByCountryIdResult,
  resetAllStatesDataByCountryIdResult,
  resetStateDataByStateId,
  selectAllStatesDataResult,
  selectDeletedStateResponse,
  selectAddedStateResponse,
  selectUpdatedStateResponse,
  selectStatesDataByCountryIdResult,
  selectStateDataByStateIdResult,
  signOutAction
}
