import * as Api from '../../services'
import { takeLatest, call, put } from 'redux-saga/effects'
import { saveAllProductsData, saveDeletedProductResponse, saveAddProductResponse } from '../reducers/ProductsReducer'
import { UIReducer } from '../reducers'

const { ApiService, ApiCallTypes } = Api

export function* fetchAllProducts(): any {
  yield put(UIReducer.showLoader(true))
  const data = yield call(ApiService.callApiService, ApiCallTypes.GET_ALL_PRODUCTS_TYPE, null)
  if (
    data.isSucceded &&
    data?.responseData &&
    data?.responseData?.status &&
    data.responseData.status === 'success' &&
    data?.responseData?.data
  ) {
    yield put(
      saveAllProductsData({
        message: data.responseData.data.length <= 0 ? 'Products data not found. Please add products data' : null,
        succeeded: true,
        isCompleted: true,
        dataArray: data.responseData.data
      })
    )
  } else {
    yield put(
      saveAllProductsData({
        message: data.responseData.message,
        succeeded: false,
        isCompleted: true,
        dataArray: []
      })
    )
  }
  yield put(UIReducer.showLoader(false))
}

export function* deleteProduct(action: any): any {
  yield put(UIReducer.showLoader(true))
  const data = yield call(
    ApiService.callApiService,
    ApiCallTypes.DELETE_PRODUCT_TYPE,
    null,
    `/${action?.payload?.productId}`
  )
  if (
    data.isSucceded &&
    data?.responseData &&
    data?.responseData?.status &&
    data.responseData.status === 'success' &&
    data?.responseData?.data
  ) {
    yield put(
      saveDeletedProductResponse({
        message: data.responseData.message,
        succeeded: true,
        isCompleted: true,
        data: data.responseData.data
      })
    )
  } else {
    yield put(
      saveDeletedProductResponse({
        message: data.responseData.message,
        succeeded: false,
        isCompleted: true,
        data: null
      })
    )
  }
  yield put(UIReducer.showLoader(false))
}

export function* addProduct(action: any): any {
  yield put(UIReducer.showLoader(true))
  const data = yield call(ApiService.callApiService, ApiCallTypes.ADD_PRODUCT_TYPE, action?.payload)
  if (
    data.isSucceded &&
    data?.responseData &&
    data?.responseData?.status &&
    data.responseData.status === 'success' &&
    data?.responseData?.data
  ) {
    yield put(
      saveAddProductResponse({
        message: data.responseData.message,
        succeeded: true,
        isCompleted: true,
        data: data.responseData.data
      })
    )
  } else {
    yield put(
      saveAddProductResponse({
        message: data.responseData.message,
        succeeded: false,
        isCompleted: true,
        data: data?.responseData?.data ?? null
      })
    )
  }
  yield put(UIReducer.showLoader(false))
}

export function* watchFetchAllProducts(): any {
  yield takeLatest('FETCH_ALL_PRODUCTS', fetchAllProducts)
}

export function* watchDeleteProduct(): any {
  yield takeLatest('DELETE_PRODUCT', deleteProduct)
}

export function* watchAddProduct(): any {
  yield takeLatest('ADD_PRODUCT', addProduct)
}
