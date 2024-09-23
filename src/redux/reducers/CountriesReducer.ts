import { createSlice, createAction, PayloadAction } from '@reduxjs/toolkit'
import { CountriesModel } from 'src/models/CountriesModel'
import {
  AddDataCommonReducerModel,
  CommonReducerDataArrayModel,
  DeleteDataCommonReducerModel,
  UpdateDataCommonReducerModel
} from 'src/models/CommonModel'
import { CountriesStateModel, ReduxStateModel } from 'src/models/ReduxStateModel'

/* Signout Action */
const signOutAction = createAction('signout')

/* Initial State */
const initialState: CountriesStateModel = {
  countriesData: {
    message: null,
    succeeded: false,
    isCompleted: false,
    dataArray: []
  },
  deletedCountryResponse: {
    message: null,
    succeeded: false,
    isCompleted: false,
    data: null
  },
  addCountryResponse: {
    message: null,
    succeeded: false,
    isCompleted: false,
    data: null
  },
  updateCountryResponse: {
    message: null,
    succeeded: false,
    isCompleted: false,
    data: null
  }
}

const saveAllCountriesDataInfo = (
  state: CountriesStateModel,
  action: PayloadAction<CommonReducerDataArrayModel<CountriesModel[]>>
): any => {
  state.countriesData = action?.payload ?? []
}

const saveDeletedCountryResponseInfo = (
  state: CountriesStateModel,
  action: PayloadAction<DeleteDataCommonReducerModel<null>>
): any => {
  state.deletedCountryResponse = action?.payload ?? {
    message: null,
    succeeded: false,
    isCompleted: false,
    data: null
  }
}

const saveAddCountryResponseInfo = (
  state: CountriesStateModel,
  action: PayloadAction<AddDataCommonReducerModel<CountriesModel>>
): any => {
  state.addCountryResponse = action?.payload ?? {
    message: null,
    succeeded: false,
    isCompleted: false,
    data: null
  }
}

const saveUpdateCountryResponseInfo = (
  state: CountriesStateModel,
  action: PayloadAction<UpdateDataCommonReducerModel<CountriesModel>>
): any => {
  state.updateCountryResponse = action?.payload ?? {
    message: null,
    succeeded: false,
    isCompleted: false,
    data: null
  }
}

const resetAllCountriesDataResultInfo = (state: CountriesStateModel): any => {
  state.countriesData = {
    message: null,
    succeeded: false,
    isCompleted: false,
    dataArray: state?.countriesData?.dataArray ?? []
  }
}

const resetDeletedCountryResponseInfo = (state: CountriesStateModel): any => {
  state.deletedCountryResponse = {
    message: null,
    succeeded: false,
    isCompleted: false,
    data: null
  }
}

const resetAddedCountryResponseInfo = (state: CountriesStateModel): any => {
  state.addCountryResponse = {
    message: null,
    succeeded: false,
    isCompleted: false,
    data: null
  }
}

const resetUpdatedCountryResponseInfo = (state: CountriesStateModel): any => {
  state.updateCountryResponse = {
    message: null,
    succeeded: false,
    isCompleted: false,
    data: null
  }
}

const countriesSlice: any = createSlice({
  name: 'countries',
  initialState: initialState,
  extraReducers: builder => {
    builder.addCase(signOutAction, state => {
      return { ...state }
    })
  },
  reducers: {
    saveAllCountriesData: saveAllCountriesDataInfo,
    saveDeletedCountryResponse: saveDeletedCountryResponseInfo,
    saveAddCountryResponse: saveAddCountryResponseInfo,
    saveUpdateCountryResponse: saveUpdateCountryResponseInfo,
    resetAllCountriesDataResult: resetAllCountriesDataResultInfo,
    resetDeletedCountryResponse: resetDeletedCountryResponseInfo,
    resetAddedCountryResponse: resetAddedCountryResponseInfo,
    resetUpdatedCountryResponse: resetUpdatedCountryResponseInfo
  }
})

// ACTIONS
const {
  saveAllCountriesData,
  saveDeletedCountryResponse,
  saveAddCountryResponse,
  saveUpdateCountryResponse,
  resetAllCountriesDataResult,
  resetDeletedCountryResponse,
  resetAddedCountryResponse,
  resetUpdatedCountryResponse
} = countriesSlice.actions

// SELECTOR
const selectAllCountriesDataResult = (state: ReduxStateModel) => {
  return {
    message: state?.countries?.countriesData?.message ?? null,
    succeeded: state?.countries?.countriesData?.succeeded ?? false,
    isCompleted: state?.countries?.countriesData?.isCompleted ?? false,
    dataArray: state?.countries?.countriesData?.dataArray ?? []
  }
}

const selectDeletedCountryResponse = (state: ReduxStateModel) => {
  return {
    message: state?.countries?.deletedCountryResponse?.message ?? null,
    succeeded: state?.countries?.deletedCountryResponse?.succeeded ?? false,
    isCompleted: state?.countries?.deletedCountryResponse?.isCompleted ?? false,
    data: state?.countries?.deletedCountryResponse?.data ?? null
  }
}

const selectAddedCountryResponse = (state: ReduxStateModel) => {
  return {
    message: state?.countries?.addCountryResponse?.message ?? null,
    succeeded: state?.countries?.addCountryResponse?.succeeded ?? false,
    isCompleted: state?.countries?.addCountryResponse?.isCompleted ?? false,
    data: state?.countries?.addCountryResponse?.data ?? null
  }
}

const selectUpdatedCountryResponse = (state: ReduxStateModel) => {
  return {
    message: state?.countries?.updateCountryResponse?.message ?? null,
    succeeded: state?.countries?.updateCountryResponse?.succeeded ?? false,
    isCompleted: state?.countries?.updateCountryResponse?.isCompleted ?? false,
    data: state?.countries?.updateCountryResponse?.data ?? null
  }
}

const countriesSliceReducer = countriesSlice.reducer

export {
  countriesSliceReducer,
  saveAllCountriesData,
  saveDeletedCountryResponse,
  saveAddCountryResponse,
  saveUpdateCountryResponse,
  resetAllCountriesDataResult,
  resetDeletedCountryResponse,
  resetAddedCountryResponse,
  resetUpdatedCountryResponse,
  selectAllCountriesDataResult,
  selectDeletedCountryResponse,
  selectAddedCountryResponse,
  selectUpdatedCountryResponse,
  signOutAction
}
