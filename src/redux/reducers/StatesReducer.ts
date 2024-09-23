import { createSlice, createAction, PayloadAction } from '@reduxjs/toolkit'
import {
  AddDataCommonReducerModel,
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
    dataArray: []
  }
}

const saveAllStatesDataInfo = (
  state: StatesStateModel,
  action: PayloadAction<CommonReducerDataArrayModel<StatesModel[]>>
): any => {
  state.statesData = action?.payload ?? []
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
  action: PayloadAction<CommonReducerDataArrayModel<StatesModel[]>>
): any => {
  state.statesDataByCountryId = action?.payload ?? []
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
    dataArray: state?.statesDataByCountryId?.dataArray ?? []
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
    resetAllStatesDataResult: resetAllStatesDataResultInfo,
    resetDeletedStateResponse: resetDeletedStateResponseInfo,
    resetAddedStateResponse: resetAddedStateResponseInfo,
    resetUpdatedStateResponse: resetUpdatedStateResponseInfo,
    resetStatesDataByCountryIdResult: resetStatesDataByCountryIdResultInfo
  }
})

// ACTIONS
const {
  saveAllStatesData,
  saveDeletedStateResponse,
  saveAddStateResponse,
  saveUpdateStateResponse,
  saveStatesDataByCountryId,
  resetAllStatesDataResult,
  resetDeletedStateResponse,
  resetAddedStateResponse,
  resetUpdatedStateResponse,
  resetStatesDataByCountryIdResult
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
    dataArray: state?.states?.statesDataByCountryId?.dataArray ?? []
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
  resetAllStatesDataResult,
  resetDeletedStateResponse,
  resetAddedStateResponse,
  resetUpdatedStateResponse,
  resetStatesDataByCountryIdResult,
  selectAllStatesDataResult,
  selectDeletedStateResponse,
  selectAddedStateResponse,
  selectUpdatedStateResponse,
  selectStatesDataByCountryIdResult,
  signOutAction
}
