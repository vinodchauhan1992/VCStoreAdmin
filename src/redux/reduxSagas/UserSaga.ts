import * as Api from '../../services'
import { takeLatest, call, put } from 'redux-saga/effects'
import { saveAllUsersData } from '../reducers/UserReducer'
import { UIReducer } from '../reducers'

const { ApiService, ApiCallTypes } = Api

export function* fetchAllUsers(): any {
  yield put(UIReducer.showLoader(true))
  const data = yield call(ApiService.callApiService, ApiCallTypes.GET_ALL_USERS_TYPE, null)
  console.log('allUsers', data)
  if (
    data.isSucceded &&
    data?.responseData &&
    data?.responseData?.status &&
    data.responseData.status === 'success' &&
    data?.responseData?.data
  ) {
    yield put(
      saveAllUsersData({
        message: data.responseData.data.length <= 0 ? 'Users data not found. Please add some users data' : null,
        succeeded: true,
        isCompleted: true,
        dataArray: data.responseData.data
      })
    )
  } else {
    yield put(
      saveAllUsersData({
        message: data.responseData.message,
        succeeded: false,
        isCompleted: true,
        dataArray: []
      })
    )
  }
  yield put(UIReducer.showLoader(false))
}

/**
 * Watch login function
 */
export function* watchFetchAllUsers(): any {
  yield takeLatest('FETCH_ALL_USERS', fetchAllUsers)
}
