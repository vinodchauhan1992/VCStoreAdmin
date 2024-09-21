import * as Api from '../../services'
import { takeLatest, call, put } from 'redux-saga/effects'
import { saveLoggedInUser } from '../reducers/LoginReducer'
import { UIReducer } from '../reducers'

const { ApiService, ApiCallTypes } = Api

/**
 * register mobile generator function for api calling for user register mobile in app
 * @param {Object} action - contains type and payload
 */
export function* loginUser(action: any): any {
  yield put(UIReducer.showLoader(true))
  const data = yield call(ApiService.callApiService, ApiCallTypes.AUTH_LOGIN_TYPE, action?.payload)
  if (
    data.isSucceded &&
    data?.responseData &&
    data?.responseData?.status &&
    data.responseData.status === 'success' &&
    data?.responseData?.data
  ) {
    yield put(saveLoggedInUser(data.responseData.data))
  } else {
    yield put(saveLoggedInUser(null))
  }
  yield put(UIReducer.showLoader(false))
}

/**
 * Watch login function
 */
export function* watchLoginUser(): any {
  yield takeLatest('LOGIN_USER', loginUser)
}
