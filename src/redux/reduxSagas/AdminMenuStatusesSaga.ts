import * as Api from '../../services'
import { takeLatest, call, put } from 'redux-saga/effects'
import {
  saveAllAdminMenuStatusesData,
  saveDeletedAdminMenuStatusResponse,
  saveAddAdminMenuStatusResponse
} from '../reducers/AdminMenuStatusesReducer'
import { UIReducer } from '../reducers'

const { ApiService, ApiCallTypes } = Api

export function* fetchAllAdminMenuStatuses(): any {
  yield put(UIReducer.showLoader(true))
  const data = yield call(ApiService.callApiService, ApiCallTypes.GET_ALL_ADMIN_MENU_STATUSES_TYPE, null)
  if (
    data.isSucceded &&
    data?.responseData &&
    data?.responseData?.status &&
    data.responseData.status === 'success' &&
    data?.responseData?.data
  ) {
    yield put(
      saveAllAdminMenuStatusesData({
        message:
          data.responseData.data.length <= 0
            ? 'Admin menu statuses data not found. Please add some admin menu statuses data'
            : null,
        succeeded: true,
        isCompleted: true,
        dataArray: data.responseData.data
      })
    )
  } else {
    yield put(
      saveAllAdminMenuStatusesData({
        message: data.responseData.message,
        succeeded: false,
        isCompleted: true,
        dataArray: []
      })
    )
  }
  yield put(UIReducer.showLoader(false))
}

export function* deleteAdminMenuStatus(action: any): any {
  yield put(UIReducer.showLoader(true))
  const data = yield call(
    ApiService.callApiService,
    ApiCallTypes.DELETE_ADMIN_MENU_STATUS_TYPE,
    null,
    `/${action?.payload?.adminMenuStatusId}`
  )
  if (
    data.isSucceded &&
    data?.responseData &&
    data?.responseData?.status &&
    data.responseData.status === 'success' &&
    data?.responseData?.data
  ) {
    yield put(
      saveDeletedAdminMenuStatusResponse({
        message: data.responseData.message,
        succeeded: true,
        isCompleted: true,
        data: data.responseData.data
      })
    )
  } else {
    yield put(
      saveDeletedAdminMenuStatusResponse({
        message: data.responseData.message,
        succeeded: false,
        isCompleted: true,
        data: null
      })
    )
  }
  yield put(UIReducer.showLoader(false))
}

export function* addAdminMenuStatus(action: any): any {
  yield put(UIReducer.showLoader(true))
  const data = yield call(ApiService.callApiService, ApiCallTypes.ADD_ADMIN_MENU_STATUS_TYPE, action?.payload)
  if (
    data.isSucceded &&
    data?.responseData &&
    data?.responseData?.status &&
    data.responseData.status === 'success' &&
    data?.responseData?.data
  ) {
    yield put(
      saveAddAdminMenuStatusResponse({
        message: data.responseData.message,
        succeeded: true,
        isCompleted: true,
        data: data.responseData.data
      })
    )
  } else {
    yield put(
      saveAddAdminMenuStatusResponse({
        message: data.responseData.message,
        succeeded: false,
        isCompleted: true,
        data: data?.responseData?.data ?? null
      })
    )
  }
  yield put(UIReducer.showLoader(false))
}

export function* watchFetchAllAdminMenuStatuses(): any {
  yield takeLatest('FETCH_ALL_ADMIN_MENU_STATUSES', fetchAllAdminMenuStatuses)
}

export function* watchDeleteAdminMenuStatus(): any {
  yield takeLatest('DELETE_ADMIN_MENU_STATUS', deleteAdminMenuStatus)
}

export function* watchAddAdminMenuStatus(): any {
  yield takeLatest('ADD_ADMIN_MENU_STATUS', addAdminMenuStatus)
}
