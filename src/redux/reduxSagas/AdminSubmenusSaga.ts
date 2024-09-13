import * as Api from '../../services'
import { takeLatest, call, put } from 'redux-saga/effects'
import { saveAllAdminSubmenusData } from '../reducers/AdminSubmenusReducer'
import { UIReducer } from '../reducers'

const { ApiService, ApiCallTypes } = Api

export function* fetchAllAdminSubmenus(): any {
  yield put(UIReducer.showLoader(true))
  const data = yield call(ApiService.callApiService, ApiCallTypes.GET_ALL_ADMIN_SUBMENUS_TYPE, null)
  if (
    data.isSucceded &&
    data?.responseData &&
    data?.responseData?.status &&
    data.responseData.status === 'success' &&
    data?.responseData?.data
  ) {
    yield put(
      saveAllAdminSubmenusData({
        message:
          data.responseData.data.length <= 0
            ? 'Admin submenus data not found. Please add some admin submenus data'
            : null,
        succeeded: true,
        isCompleted: true,
        dataArray: data.responseData.data
      })
    )
  } else {
    yield put(
      saveAllAdminSubmenusData({
        message: data.responseData.message,
        succeeded: false,
        isCompleted: true,
        dataArray: []
      })
    )
  }
  yield put(UIReducer.showLoader(false))
}

export function* watchFetchAllAdminSubmenus(): any {
  yield takeLatest('FETCH_ALL_ADMIN_SUBMENUS', fetchAllAdminSubmenus)
}
