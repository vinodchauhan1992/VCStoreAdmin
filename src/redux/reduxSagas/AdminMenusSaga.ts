import * as Api from '../../services'
import { takeLatest, call, put } from 'redux-saga/effects'
import {
  saveAllAdminMenusData,
  saveDeletedAdminMenuResponse,
  saveAddAdminMenuResponse
} from '../reducers/AdminMenusReducer'
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
        message:
          data.responseData.data.length <= 0 ? 'Admin menus data not found. Please add some admin menus data' : null,
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

export function* deleteAdminMenu(action: any): any {
  yield put(UIReducer.showLoader(true))
  const data = yield call(
    ApiService.callApiService,
    ApiCallTypes.DELETE_ADMIN_MENU_TYPE,
    null,
    `/${action?.payload?.adminMenuId}`
  )
  if (
    data.isSucceded &&
    data?.responseData &&
    data?.responseData?.status &&
    data.responseData.status === 'success' &&
    data?.responseData?.data
  ) {
    yield put(
      saveDeletedAdminMenuResponse({
        message: data.responseData.message,
        succeeded: true,
        isCompleted: true,
        data: data.responseData.data
      })
    )
  } else {
    yield put(
      saveDeletedAdminMenuResponse({
        message: data.responseData.message,
        succeeded: false,
        isCompleted: true,
        data: null
      })
    )
  }
  yield put(UIReducer.showLoader(false))
}

export function* addAdminMenu(action: any): any {
  yield put(UIReducer.showLoader(true))
  const data = yield call(ApiService.callApiService, ApiCallTypes.ADD_ADMIN_MENU_TYPE, action?.payload)
  if (
    data.isSucceded &&
    data?.responseData &&
    data?.responseData?.status &&
    data.responseData.status === 'success' &&
    data?.responseData?.data
  ) {
    yield put(
      saveAddAdminMenuResponse({
        message: data.responseData.message,
        succeeded: true,
        isCompleted: true,
        data: data.responseData.data
      })
    )
  } else {
    yield put(
      saveAddAdminMenuResponse({
        message: data.responseData.message,
        succeeded: false,
        isCompleted: true,
        data: data?.responseData?.data ?? null
      })
    )
  }
  yield put(UIReducer.showLoader(false))
}

export function* watchFetchAllAdminMenus(): any {
  yield takeLatest('FETCH_ALL_ADMIN_MENUS', fetchAllAdminMenus)
}

export function* watchDeleteAdminMenu(): any {
  yield takeLatest('DELETE_ADMIN_MENU', deleteAdminMenu)
}

export function* watchAddAdminMenu(): any {
  yield takeLatest('ADD_ADMIN_MENU', addAdminMenu)
}
