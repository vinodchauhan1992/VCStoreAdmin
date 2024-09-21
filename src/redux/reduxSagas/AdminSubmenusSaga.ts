import * as Api from '../../services'
import { takeLatest, call, put } from 'redux-saga/effects'
import {
  saveAllAdminSubmenusData,
  saveDeletedAdminSubmenuResponse,
  saveAddAdminSubmenuResponse,
  saveSubmenusMaxPriorityData,
  saveAdminSubmenusDataByMenuId
} from '../reducers/AdminSubmenusReducer'
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

export function* deleteAdminSubmenu(action: any): any {
  yield put(UIReducer.showLoader(true))
  const data = yield call(
    ApiService.callApiService,
    ApiCallTypes.DELETE_ADMIN_SUBMENU_TYPE,
    null,
    `/${action?.payload?.adminSubmenuId}`,
    { panel_type: action?.payload?.panelType }
  )
  if (
    data.isSucceded &&
    data?.responseData &&
    data?.responseData?.status &&
    data.responseData.status === 'success' &&
    data?.responseData?.data
  ) {
    yield put(
      saveDeletedAdminSubmenuResponse({
        message: data.responseData.message,
        succeeded: true,
        isCompleted: true,
        data: data.responseData.data
      })
    )
  } else {
    yield put(
      saveDeletedAdminSubmenuResponse({
        message: data.responseData.message,
        succeeded: false,
        isCompleted: true,
        data: null
      })
    )
  }
  yield put(UIReducer.showLoader(false))
}

export function* addAdminSubmenu(action: any): any {
  yield put(UIReducer.showLoader(true))
  const data = yield call(ApiService.callApiService, ApiCallTypes.ADD_ADMIN_SUBMENU_TYPE, action?.payload)
  if (
    data.isSucceded &&
    data?.responseData &&
    data?.responseData?.status &&
    data.responseData.status === 'success' &&
    data?.responseData?.data
  ) {
    yield put(
      saveAddAdminSubmenuResponse({
        message: data.responseData.message,
        succeeded: true,
        isCompleted: true,
        data: data.responseData.data
      })
    )
  } else {
    yield put(
      saveAddAdminSubmenuResponse({
        message: data.responseData.message,
        succeeded: false,
        isCompleted: true,
        data: data?.responseData?.data ?? null
      })
    )
  }
  yield put(UIReducer.showLoader(false))
}

export function* fetchSubmenusMaxPriority(): any {
  yield put(UIReducer.showLoader(true))
  const data = yield call(ApiService.callApiService, ApiCallTypes.GET_SUBMENUS_MAX_PRIORITY_TYPE, null)
  if (
    data.isSucceded &&
    data?.responseData &&
    data?.responseData?.status &&
    data.responseData.status === 'success' &&
    data?.responseData?.data
  ) {
    yield put(
      saveSubmenusMaxPriorityData({
        maxPriorityValue: data.responseData.data.maxPriorityValue
      })
    )
  } else {
    yield put(
      saveSubmenusMaxPriorityData({
        maxPriorityValue: 0
      })
    )
  }
  yield put(UIReducer.showLoader(false))
}

export function* fetchSubmenusByMenuId(action: any): any {
  yield put(UIReducer.showLoader(true))
  const data = yield call(
    ApiService.callApiService,
    ApiCallTypes.GET_SUBMENU_BY_MENU_ID_TYPE,
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
      saveAdminSubmenusDataByMenuId({
        message: data.responseData.message,
        succeeded: true,
        isCompleted: true,
        data: data.responseData.data
      })
    )
  } else {
    yield put(
      saveAdminSubmenusDataByMenuId({
        message: data.responseData.message,
        succeeded: false,
        isCompleted: true,
        data: []
      })
    )
  }
  yield put(UIReducer.showLoader(false))
}

export function* watchFetchAllAdminSubmenus(): any {
  yield takeLatest('FETCH_ALL_ADMIN_SUBMENUS', fetchAllAdminSubmenus)
}

export function* watchDeleteAdminSubmenu(): any {
  yield takeLatest('DELETE_ADMIN_SUBMENU', deleteAdminSubmenu)
}

export function* watchAddAdminSubmenu(): any {
  yield takeLatest('ADD_ADMIN_SUBMENU', addAdminSubmenu)
}

export function* watchFetchSubmenusMaxPriority(): any {
  yield takeLatest('FETCH_SUBMENUS_MAX_PRIORITY', fetchSubmenusMaxPriority)
}

export function* watchFetchSubmenusByMenuId(): any {
  yield takeLatest('FETCH_SUBMENUS_BY_MENU_ID', fetchSubmenusByMenuId)
}
