import * as Api from '../../services'
import { takeLatest, call, put } from 'redux-saga/effects'
import {
  saveAllBrandsData,
  saveDeletedBrandResponse,
  saveAddBrandResponse,
  saveUpdateBrandResponse
} from '../reducers/BrandsReducer'
import { UIReducer } from '../reducers'

const { ApiService, ApiCallTypes } = Api

export function* fetchAllBrands(): any {
  yield put(UIReducer.showLoader(true))
  const data = yield call(ApiService.callApiService, ApiCallTypes.GET_ALL_BRANDS_TYPE, null)

  if (
    data.isSucceded &&
    data?.responseData &&
    data?.responseData?.status &&
    data.responseData.status === 'success' &&
    data?.responseData?.data
  ) {
    yield put(
      saveAllBrandsData({
        message: data.responseData.data.length <= 0 ? 'Brands data not found. Please add some brands data' : null,
        succeeded: true,
        isCompleted: true,
        dataArray: data.responseData.data
      })
    )
  } else {
    yield put(
      saveAllBrandsData({
        message: data.responseData.message,
        succeeded: false,
        isCompleted: true,
        dataArray: []
      })
    )
  }
  yield put(UIReducer.showLoader(false))
}

export function* deleteBrand(action: any): any {
  yield put(UIReducer.showLoader(true))
  const data = yield call(
    ApiService.callApiService,
    ApiCallTypes.DELETE_BRAND_TYPE,
    null,
    `/${action?.payload?.brandId}`
  )
  if (
    data.isSucceded &&
    data?.responseData &&
    data?.responseData?.status &&
    data.responseData.status === 'success' &&
    data?.responseData?.data
  ) {
    yield put(
      saveDeletedBrandResponse({
        message: data.responseData.message,
        succeeded: true,
        isCompleted: true,
        data: data.responseData.data
      })
    )
  } else {
    yield put(
      saveDeletedBrandResponse({
        message: data.responseData.message,
        succeeded: false,
        isCompleted: true,
        data: null
      })
    )
  }
  yield put(UIReducer.showLoader(false))
}

export function* addBrand(action: any): any {
  yield put(UIReducer.showLoader(true))
  const data = yield call(ApiService.callApiService, ApiCallTypes.ADD_BRAND_TYPE, action?.payload)
  if (
    data.isSucceded &&
    data?.responseData &&
    data?.responseData?.status &&
    data.responseData.status === 'success' &&
    data?.responseData?.data
  ) {
    yield put(
      saveAddBrandResponse({
        message: data.responseData.message,
        succeeded: true,
        isCompleted: true,
        data: data.responseData.data
      })
    )
  } else {
    yield put(
      saveAddBrandResponse({
        message: data.responseData.message,
        succeeded: false,
        isCompleted: true,
        data: data?.responseData?.data ?? null
      })
    )
  }
  yield put(UIReducer.showLoader(false))
}

export function* updateBrand(action: any): any {
  yield put(UIReducer.showLoader(true))
  const data = yield call(
    ApiService.callApiService,
    ApiCallTypes.UPDATE_BRAND_TYPE,
    action?.payload?.formData,
    `/${action?.payload?.brandId}`
  )
  if (
    data.isSucceded &&
    data?.responseData &&
    data?.responseData?.status &&
    data.responseData.status === 'success' &&
    data?.responseData?.data
  ) {
    yield put(
      saveUpdateBrandResponse({
        message: data.responseData.message,
        succeeded: true,
        isCompleted: true,
        data: data.responseData.data
      })
    )
  } else {
    yield put(
      saveUpdateBrandResponse({
        message: data.responseData.message,
        succeeded: false,
        isCompleted: true,
        data: data?.responseData?.data ?? null
      })
    )
  }
  yield put(UIReducer.showLoader(false))
}

export function* watchFetchAllBrands(): any {
  yield takeLatest('FETCH_ALL_BRANDS', fetchAllBrands)
}

export function* watchDeleteBrand(): any {
  yield takeLatest('DELETE_BRAND', deleteBrand)
}

export function* watchAddBrand(): any {
  yield takeLatest('ADD_BRAND', addBrand)
}

export function* watchUpdateBrand(): any {
  yield takeLatest('UPDATE_BRAND', updateBrand)
}
