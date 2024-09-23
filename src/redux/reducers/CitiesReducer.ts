import { createSlice, createAction, PayloadAction } from '@reduxjs/toolkit'
import {
  AddDataCommonReducerModel,
  CommonReducerDataArrayModel,
  DeleteDataCommonReducerModel,
  UpdateDataCommonReducerModel
} from 'src/models/CommonModel'
import { ReduxStateModel, CitiesStateModel } from 'src/models/ReduxStateModel'
import { CitiesModel } from 'src/models/CitiesModel'

/* Signout Action */
const signOutAction = createAction('signout')

/* Initial State */
const initialState: CitiesStateModel = {
  citiesData: {
    message: null,
    succeeded: false,
    isCompleted: false,
    dataArray: []
  },
  deletedCityResponse: {
    message: null,
    succeeded: false,
    isCompleted: false,
    data: null
  },
  addCityResponse: {
    message: null,
    succeeded: false,
    isCompleted: false,
    data: null
  },
  updateCityResponse: {
    message: null,
    succeeded: false,
    isCompleted: false,
    data: null
  },
  citiesDataByStateId: {
    message: null,
    succeeded: false,
    isCompleted: false,
    dataArray: []
  }
}

const saveAllCitiesDataInfo = (
  state: CitiesStateModel,
  action: PayloadAction<CommonReducerDataArrayModel<CitiesModel[]>>
): any => {
  state.citiesData = action?.payload ?? []
}

const saveDeletedCityResponseInfo = (
  state: CitiesStateModel,
  action: PayloadAction<DeleteDataCommonReducerModel<null>>
): any => {
  state.deletedCityResponse = action?.payload ?? {
    message: null,
    succeeded: false,
    isCompleted: false,
    data: null
  }
}

const saveAddCityResponseInfo = (
  state: CitiesStateModel,
  action: PayloadAction<AddDataCommonReducerModel<CitiesModel>>
): any => {
  state.addCityResponse = action?.payload ?? {
    message: null,
    succeeded: false,
    isCompleted: false,
    data: null
  }
}

const saveUpdateCityResponseInfo = (
  state: CitiesStateModel,
  action: PayloadAction<UpdateDataCommonReducerModel<CitiesModel>>
): any => {
  state.updateCityResponse = action?.payload ?? {
    message: null,
    succeeded: false,
    isCompleted: false,
    data: null
  }
}

const saveCitiesDataByStateIdInfo = (
  state: CitiesStateModel,
  action: PayloadAction<CommonReducerDataArrayModel<CitiesModel[]>>
): any => {
  state.citiesDataByStateId = action?.payload ?? []
}

const resetAllCitiesDataResultInfo = (state: CitiesStateModel): any => {
  state.citiesData = {
    message: null,
    succeeded: false,
    isCompleted: false,
    dataArray: state?.citiesData?.dataArray ?? []
  }
}

const resetDeletedCityResponseInfo = (state: CitiesStateModel): any => {
  state.deletedCityResponse = {
    message: null,
    succeeded: false,
    isCompleted: false,
    data: null
  }
}

const resetAddedCityResponseInfo = (state: CitiesStateModel): any => {
  state.addCityResponse = {
    message: null,
    succeeded: false,
    isCompleted: false,
    data: null
  }
}

const resetUpdatedCityResponseInfo = (state: CitiesStateModel): any => {
  state.updateCityResponse = {
    message: null,
    succeeded: false,
    isCompleted: false,
    data: null
  }
}

const resetCitiesDataByStateIdResultInfo = (state: CitiesStateModel): any => {
  state.citiesDataByStateId = {
    message: null,
    succeeded: false,
    isCompleted: false,
    dataArray: state?.citiesDataByStateId?.dataArray ?? []
  }
}

const citiesSlice: any = createSlice({
  name: 'cities',
  initialState: initialState,
  extraReducers: builder => {
    builder.addCase(signOutAction, state => {
      return { ...state }
    })
  },
  reducers: {
    saveAllCitiesData: saveAllCitiesDataInfo,
    saveDeletedCityResponse: saveDeletedCityResponseInfo,
    saveAddCityResponse: saveAddCityResponseInfo,
    saveUpdateCityResponse: saveUpdateCityResponseInfo,
    saveCitiesDataByStateId: saveCitiesDataByStateIdInfo,
    resetAllCitiesDataResult: resetAllCitiesDataResultInfo,
    resetDeletedCityResponse: resetDeletedCityResponseInfo,
    resetAddedCityResponse: resetAddedCityResponseInfo,
    resetUpdatedCityResponse: resetUpdatedCityResponseInfo,
    resetCitiesDataByStateIdResult: resetCitiesDataByStateIdResultInfo
  }
})

// ACTIONS
const {
  saveAllCitiesData,
  saveDeletedCityResponse,
  saveAddCityResponse,
  saveUpdateCityResponse,
  saveCitiesDataByStateId,
  resetAllCitiesDataResult,
  resetDeletedCityResponse,
  resetAddedCityResponse,
  resetUpdatedCityResponse,
  resetCitiesDataByStateIdResult
} = citiesSlice.actions

// SELECTOR
const selectAllCitiesDataResult = (state: ReduxStateModel) => {
  return {
    message: state?.cities?.citiesData?.message ?? null,
    succeeded: state?.cities?.citiesData?.succeeded ?? false,
    isCompleted: state?.cities?.citiesData?.isCompleted ?? false,
    dataArray: state?.cities?.citiesData?.dataArray ?? []
  }
}

const selectDeletedCityResponse = (state: ReduxStateModel) => {
  return {
    message: state?.cities?.deletedCityResponse?.message ?? null,
    succeeded: state?.cities?.deletedCityResponse?.succeeded ?? false,
    isCompleted: state?.cities?.deletedCityResponse?.isCompleted ?? false,
    data: state?.cities?.deletedCityResponse?.data ?? null
  }
}

const selectAddedCityResponse = (state: ReduxStateModel) => {
  return {
    message: state?.cities?.addCityResponse?.message ?? null,
    succeeded: state?.cities?.addCityResponse?.succeeded ?? false,
    isCompleted: state?.cities?.addCityResponse?.isCompleted ?? false,
    data: state?.cities?.addCityResponse?.data ?? null
  }
}

const selectUpdatedCityResponse = (state: ReduxStateModel) => {
  return {
    message: state?.cities?.updateCityResponse?.message ?? null,
    succeeded: state?.cities?.updateCityResponse?.succeeded ?? false,
    isCompleted: state?.cities?.updateCityResponse?.isCompleted ?? false,
    data: state?.cities?.updateCityResponse?.data ?? null
  }
}

const selectCitiesDataByStateIdResult = (state: ReduxStateModel) => {
  return {
    message: state?.cities?.citiesDataByStateId?.message ?? null,
    succeeded: state?.cities?.citiesDataByStateId?.succeeded ?? false,
    isCompleted: state?.cities?.citiesDataByStateId?.isCompleted ?? false,
    dataArray: state?.cities?.citiesDataByStateId?.dataArray ?? []
  }
}

const citiesSliceReducer = citiesSlice.reducer

export {
  citiesSliceReducer,
  saveAllCitiesData,
  saveDeletedCityResponse,
  saveAddCityResponse,
  saveUpdateCityResponse,
  saveCitiesDataByStateId,
  resetAllCitiesDataResult,
  resetDeletedCityResponse,
  resetAddedCityResponse,
  resetUpdatedCityResponse,
  resetCitiesDataByStateIdResult,
  selectAllCitiesDataResult,
  selectDeletedCityResponse,
  selectAddedCityResponse,
  selectUpdatedCityResponse,
  selectCitiesDataByStateIdResult,
  signOutAction
}
