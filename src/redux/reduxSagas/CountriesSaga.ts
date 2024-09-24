import * as Api from '../../services'
import { takeLatest, call, put } from 'redux-saga/effects'
import {
  saveAllCountriesData,
  saveDeletedCountryResponse,
  saveAddCountryResponse,
  saveUpdateCountryResponse,
  saveCountryDataByCountryId
} from '../reducers/CountriesReducer'
import { UIReducer } from '../reducers'

const { ApiService, ApiCallTypes } = Api

export function* fetchAllCountries(): any {
  yield put(UIReducer.showLoader(true))
  const data = yield call(ApiService.callApiService, ApiCallTypes.GET_ALL_COUNTRIES_TYPE, null)

  if (
    data.isSucceded &&
    data?.responseData &&
    data?.responseData?.status &&
    data.responseData.status === 'success' &&
    data?.responseData?.data
  ) {
    yield put(
      saveAllCountriesData({
        message: data.responseData.data.length <= 0 ? 'Countries data not found. Please add some countries data' : null,
        succeeded: true,
        isCompleted: true,
        dataArray: data.responseData.data
      })
    )
  } else {
    yield put(
      saveAllCountriesData({
        message: data.responseData.message,
        succeeded: false,
        isCompleted: true,
        dataArray: []
      })
    )
  }
  yield put(UIReducer.showLoader(false))
}

export function* deleteCountry(action: any): any {
  yield put(UIReducer.showLoader(true))
  const data = yield call(
    ApiService.callApiService,
    ApiCallTypes.DELETE_COUNTRY_TYPE,
    null,
    `/${action?.payload?.countryId}`
  )
  if (
    data.isSucceded &&
    data?.responseData &&
    data?.responseData?.status &&
    data.responseData.status === 'success' &&
    data?.responseData?.data
  ) {
    yield put(
      saveDeletedCountryResponse({
        message: data.responseData.message,
        succeeded: true,
        isCompleted: true,
        data: data.responseData.data
      })
    )
  } else {
    yield put(
      saveDeletedCountryResponse({
        message: data.responseData.message,
        succeeded: false,
        isCompleted: true,
        data: null
      })
    )
  }
  yield put(UIReducer.showLoader(false))
}

export function* addCountry(action: any): any {
  yield put(UIReducer.showLoader(true))
  const data = yield call(ApiService.callApiService, ApiCallTypes.ADD_COUNTRY_TYPE, action?.payload)
  if (
    data.isSucceded &&
    data?.responseData &&
    data?.responseData?.status &&
    data.responseData.status === 'success' &&
    data?.responseData?.data
  ) {
    yield put(
      saveAddCountryResponse({
        message: data.responseData.message,
        succeeded: true,
        isCompleted: true,
        data: data.responseData.data
      })
    )
  } else {
    yield put(
      saveAddCountryResponse({
        message: data.responseData.message,
        succeeded: false,
        isCompleted: true,
        data: data?.responseData?.data ?? null
      })
    )
  }
  yield put(UIReducer.showLoader(false))
}

export function* updateCountry(action: any): any {
  yield put(UIReducer.showLoader(true))
  const data = yield call(
    ApiService.callApiService,
    ApiCallTypes.UPDATE_COUNTRY_TYPE,
    action?.payload?.jsonData,
    `/${action?.payload?.countryId}`
  )
  if (
    data.isSucceded &&
    data?.responseData &&
    data?.responseData?.status &&
    data.responseData.status === 'success' &&
    data?.responseData?.data
  ) {
    yield put(
      saveUpdateCountryResponse({
        message: data.responseData.message,
        succeeded: true,
        isCompleted: true,
        data: data.responseData.data
      })
    )
  } else {
    yield put(
      saveUpdateCountryResponse({
        message: data.responseData.message,
        succeeded: false,
        isCompleted: true,
        data: data?.responseData?.data ?? null
      })
    )
  }
  yield put(UIReducer.showLoader(false))
}

export function* fetchCountryByCountryId(action: any): any {
  yield put(UIReducer.showLoader(true))
  const data = yield call(
    ApiService.callApiService,
    ApiCallTypes.GET_COUNTRY_BY_COUNTRY_ID_TYPE,
    null,
    `/${action?.payload?.countryId}`
  )
  if (
    data.isSucceded &&
    data?.responseData &&
    data?.responseData?.status &&
    data.responseData.status === 'success' &&
    data?.responseData?.data
  ) {
    yield put(
      saveCountryDataByCountryId({
        message: data.responseData.message,
        succeeded: true,
        isCompleted: true,
        data: data.responseData.data
      })
    )
  } else {
    yield put(
      saveCountryDataByCountryId({
        message: data.responseData.message,
        succeeded: false,
        isCompleted: true,
        data: data?.responseData?.data ?? null
      })
    )
  }
  yield put(UIReducer.showLoader(false))
}

export function* watchFetchAllCountries(): any {
  yield takeLatest('FETCH_ALL_COUNTRIES', fetchAllCountries)
}

export function* watchDeleteCountry(): any {
  yield takeLatest('DELETE_COUNTRY', deleteCountry)
}

export function* watchAddCountry(): any {
  yield takeLatest('ADD_COUNTRY', addCountry)
}

export function* watchUpdateCountry(): any {
  yield takeLatest('UPDATE_COUNTRY', updateCountry)
}

export function* watchFetchCountryByCountryId(): any {
  yield takeLatest('FETCH_COUNTRY_BY_COUNTRY_ID', fetchCountryByCountryId)
}
