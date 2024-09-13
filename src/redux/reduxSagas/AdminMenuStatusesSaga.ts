import * as Api from '../../services'
import { takeLatest, call, put } from 'redux-saga/effects'
import { saveAllAdminMenuStatusesData } from '../reducers/AdminMenuStatusesReducer'
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
        message: null,
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

export function* watchFetchAllAdminMenuStatuses(): any {
  yield takeLatest('FETCH_ALL_ADMIN_MENU_STATUSES', fetchAllAdminMenuStatuses)
}
