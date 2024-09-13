import * as Api from '../../services'
import { takeLatest, call, put } from 'redux-saga/effects'
import { saveAllAdminMenusData } from '../reducers/AdminMenusReducer'
import { UIReducer } from '../reducers'

const { ApiService, ApiCallTypes } = Api

export function* fetchAllAdminMenus(): any {
  yield put(UIReducer.showLoader(true))
  const data = yield call(ApiService.callApiService, ApiCallTypes.GET_ALL_ADMIN_MENUS_TYPE, null)
  if (
    data.isSucceded &&
    data?.responseData &&
    data?.responseData?.status &&
    data.responseData.status === 'success' &&
    data?.responseData?.data
  ) {
    yield put(
      saveAllAdminMenusData({
        message: null,
        succeeded: true,
        isCompleted: true,
        dataArray: data.responseData.data
      })
    )
  } else {
    yield put(
      saveAllAdminMenusData({
        message: data.responseData.message,
        succeeded: false,
        isCompleted: true,
        dataArray: []
      })
    )
  }
  yield put(UIReducer.showLoader(false))
}

export function* watchFetchAllAdminMenus(): any {
  yield takeLatest('FETCH_ALL_ADMIN_MENUS', fetchAllAdminMenus)
}
