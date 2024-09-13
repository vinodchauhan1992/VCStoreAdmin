import * as Api from '../../services'
import { takeLatest, call, put } from 'redux-saga/effects'
import { saveAllUserStatusesData } from '../reducers/UserStatusesReducer'
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

export function* watchFetchAllUserStatuses(): any {
  yield takeLatest('FETCH_ALL_USER_STATUSES', fetchAllUserStatuses)
}
