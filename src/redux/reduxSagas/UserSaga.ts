import * as Api from '../../services'
import { takeLatest, call, put } from 'redux-saga/effects'
import { saveAllUsersData } from '../reducers/UserReducer'
import { UIReducer } from '../reducers'

const { ApiService, ApiCallTypes } = Api

/**
 * register mobile generator function for api calling for user register mobile in app
 * @param {Object} action - contains type and payload
 */
export function* fetchAllUsers(action: any): any {
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
    yield put(saveAllUsersData(data.responseData.data))
  } else {
    yield put(saveAllUsersData([]))
  }
  yield put(UIReducer.showLoader(false))
}

/**
 * Watch login function
 */
export function* watchFetchAllUsers(): any {
  yield takeLatest('FETCH_ALL_USERS', fetchAllUsers)
}
