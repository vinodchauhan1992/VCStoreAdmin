import * as Api from '../../services'
import { takeLatest, call, put } from 'redux-saga/effects'
import { saveAllUserRolesData } from '../reducers/UserRolesReducer'
import { UIReducer } from '../reducers'

const { ApiService, ApiCallTypes } = Api

export function* fetchAllUserRoles(): any {
  yield put(UIReducer.showLoader(true))
  const data = yield call(ApiService.callApiService, ApiCallTypes.GET_ALL_USER_ROLES_TYPE, null)
  console.log('data', data)
  if (
    data.isSucceded &&
    data?.responseData &&
    data?.responseData?.status &&
    data.responseData.status === 'success' &&
    data?.responseData?.data
  ) {
    yield put(
      saveAllUserRolesData({
        message: null,
        succeeded: true,
        isCompleted: true,
        dataArray: data.responseData.data
      })
    )
  } else {
    yield put(
      saveAllUserRolesData({
        message: data.responseData.message,
        succeeded: false,
        isCompleted: true,
        dataArray: []
      })
    )
  }
  yield put(UIReducer.showLoader(false))
}

export function* watchFetchAllUserRoles(): any {
  yield takeLatest('FETCH_ALL_USER_ROLES', fetchAllUserRoles)
}
