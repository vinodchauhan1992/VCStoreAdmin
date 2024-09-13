import * as Api from '../../services'
import { takeLatest, call, put } from 'redux-saga/effects'
import {
  saveAllUserStatusesData,
  saveDeletedUserStatusResponse,
  saveAddUserStatusResponse
} from '../reducers/UserStatusesReducer'
import { UIReducer } from '../reducers'

const { ApiService, ApiCallTypes } = Api

export function* fetchAllUserStatuses(): any {
  yield put(UIReducer.showLoader(true))
  const data = yield call(ApiService.callApiService, ApiCallTypes.GET_ALL_USER_STATUSES_TYPE, null)
  if (
    data.isSucceded &&
    data?.responseData &&
    data?.responseData?.status &&
    data.responseData.status === 'success' &&
    data?.responseData?.data
  ) {
    yield put(
      saveAllUserStatusesData({
        message:
          data.responseData.data.length <= 0
            ? 'User statuses data not found. Please add some user statuses data'
            : null,
        succeeded: true,
        isCompleted: true,
        dataArray: data.responseData.data
      })
    )
  } else {
    yield put(
      saveAllUserStatusesData({
        message: data.responseData.message,
        succeeded: false,
        isCompleted: true,
        dataArray: []
      })
    )
  }
  yield put(UIReducer.showLoader(false))
}

export function* deleteUserStatus(action: any): any {
  yield put(UIReducer.showLoader(true))
  const data = yield call(
    ApiService.callApiService,
    ApiCallTypes.DELETE_USER_STATUS_TYPE,
    null,
    `/${action?.payload?.userStatusId}`
  )
  if (
    data.isSucceded &&
    data?.responseData &&
    data?.responseData?.status &&
    data.responseData.status === 'success' &&
    data?.responseData?.data
  ) {
    yield put(
      saveDeletedUserStatusResponse({
        message: data.responseData.message,
        succeeded: true,
        isCompleted: true,
        data: data.responseData.data
      })
    )
  } else {
    yield put(
      saveDeletedUserStatusResponse({
        message: data.responseData.message,
        succeeded: false,
        isCompleted: true,
        data: null
      })
    )
  }
  yield put(UIReducer.showLoader(false))
}

export function* addUserStatus(action: any): any {
  yield put(UIReducer.showLoader(true))
  const data = yield call(ApiService.callApiService, ApiCallTypes.ADD_USER_STATUS_TYPE, action?.payload)
  if (
    data.isSucceded &&
    data?.responseData &&
    data?.responseData?.status &&
    data.responseData.status === 'success' &&
    data?.responseData?.data
  ) {
    yield put(
      saveAddUserStatusResponse({
        message: data.responseData.message,
        succeeded: true,
        isCompleted: true,
        data: data.responseData.data
      })
    )
  } else {
    yield put(
      saveAddUserStatusResponse({
        message: data.responseData.message,
        succeeded: false,
        isCompleted: true,
        data: data?.responseData?.data ?? null
      })
    )
  }
  yield put(UIReducer.showLoader(false))
}

export function* watchFetchAllUserStatuses(): any {
  yield takeLatest('FETCH_ALL_USER_STATUSES', fetchAllUserStatuses)
}

export function* watchDeleteUserStatus(): any {
  yield takeLatest('DELETE_USER_STATUS', deleteUserStatus)
}

export function* watchAddUserStatus(): any {
  yield takeLatest('ADD_USER_STATUS', addUserStatus)
}
