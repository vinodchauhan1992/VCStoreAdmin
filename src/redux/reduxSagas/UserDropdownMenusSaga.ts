import * as Api from '../../services'
import { takeLatest, call, put } from 'redux-saga/effects'
import {
  saveAllUDMSData,
  saveDeletedUDMResponse,
  saveAddUDMResponse,
  saveUDMSMaxPriorityData,
  saveUDMDataById,
  saveUDMDataByPriority,
  saveUDMSRegisteredPriorities,
  saveUpdateUDMResponse
} from '../reducers/UserDropdownMenusReducer'
import { UIReducer } from '../reducers'

const { ApiService, ApiCallTypes } = Api

export function* fetchAllUDMS(): any {
  yield put(UIReducer.showLoader(true))
  const data = yield call(ApiService.callApiService, ApiCallTypes.GET_ALL_USER_DROPDOWN_MENUS_TYPE, null)
  if (
    data.isSucceded &&
    data?.responseData &&
    data?.responseData?.status &&
    data.responseData.status === 'success' &&
    data?.responseData?.data
  ) {
    yield put(
      saveAllUDMSData({
        message:
          data.responseData.data.length <= 0 ? 'Admin menus data not found. Please add some admin menus data' : null,
        succeeded: true,
        isCompleted: true,
        dataArray: data.responseData.data
      })
    )
  } else {
    yield put(
      saveAllUDMSData({
        message: data.responseData.message,
        succeeded: false,
        isCompleted: true,
        dataArray: []
      })
    )
  }
  yield put(UIReducer.showLoader(false))
}

export function* deleteUDM(action: any): any {
  yield put(UIReducer.showLoader(true))
  const data = yield call(
    ApiService.callApiService,
    ApiCallTypes.DELETE_USER_DROPDOWN_MENU_TYPE,
    null,
    `/${action?.payload?.userDropdownMenuId}`
  )
  if (
    data.isSucceded &&
    data?.responseData &&
    data?.responseData?.status &&
    data.responseData.status === 'success' &&
    data?.responseData?.data
  ) {
    yield put(
      saveDeletedUDMResponse({
        message: data.responseData.message,
        succeeded: true,
        isCompleted: true,
        data: data.responseData.data
      })
    )
  } else {
    yield put(
      saveDeletedUDMResponse({
        message: data.responseData.message,
        succeeded: false,
        isCompleted: true,
        data: null
      })
    )
  }
  yield put(UIReducer.showLoader(false))
}

export function* addUDM(action: any): any {
  yield put(UIReducer.showLoader(true))
  const data = yield call(ApiService.callApiService, ApiCallTypes.ADD_USER_DROPDOWN_MENU_TYPE, action?.payload)
  if (
    data.isSucceded &&
    data?.responseData &&
    data?.responseData?.status &&
    data.responseData.status === 'success' &&
    data?.responseData?.data
  ) {
    yield put(
      saveAddUDMResponse({
        message: data.responseData.message,
        succeeded: true,
        isCompleted: true,
        data: data.responseData.data
      })
    )
  } else {
    yield put(
      saveAddUDMResponse({
        message: data.responseData.message,
        succeeded: false,
        isCompleted: true,
        data: data?.responseData?.data ?? null
      })
    )
  }
  yield put(UIReducer.showLoader(false))
}

export function* fetchUDMSMaxPriority(): any {
  yield put(UIReducer.showLoader(true))
  const data = yield call(ApiService.callApiService, ApiCallTypes.GET_USER_DROPDOWN_MENUS_HIGHEST_PRIORITY_TYPE, null)
  if (
    data.isSucceded &&
    data?.responseData &&
    data?.responseData?.status &&
    data.responseData.status === 'success' &&
    data?.responseData?.data
  ) {
    yield put(
      saveUDMSMaxPriorityData({
        maxPriorityValue: data.responseData.data.maxPriorityValue
      })
    )
  } else {
    yield put(
      saveUDMSMaxPriorityData({
        maxPriorityValue: 0
      })
    )
  }
  yield put(UIReducer.showLoader(false))
}

export function* fetchUDMByUDMId(action: any): any {
  yield put(UIReducer.showLoader(true))
  const data = yield call(
    ApiService.callApiService,
    ApiCallTypes.GET_USER_DROPDOWN_MENU_BY_ID_TYPE,
    null,
    `/${action?.payload?.userDropdownMenuId}`
  )
  if (
    data.isSucceded &&
    data?.responseData &&
    data?.responseData?.status &&
    data.responseData.status === 'success' &&
    data?.responseData?.data
  ) {
    yield put(
      saveUDMDataById({
        message: data.responseData.message,
        succeeded: true,
        isCompleted: true,
        data: data.responseData.data
      })
    )
  } else {
    yield put(
      saveUDMDataById({
        message: data.responseData.message,
        succeeded: false,
        isCompleted: true,
        data: null
      })
    )
  }
  yield put(UIReducer.showLoader(false))
}

export function* fetchUDMByPriority(action: any): any {
  yield put(UIReducer.showLoader(true))
  const data = yield call(
    ApiService.callApiService,
    ApiCallTypes.GET_USER_DROPDOWN_MENU_BY_PRIORITY_TYPE,
    null,
    `/${action?.payload?.userDropdownPriority}`
  )
  if (
    data.isSucceded &&
    data?.responseData &&
    data?.responseData?.status &&
    data.responseData.status === 'success' &&
    data?.responseData?.data
  ) {
    yield put(
      saveUDMDataByPriority({
        message: data.responseData.message,
        succeeded: true,
        isCompleted: true,
        data: data.responseData.data
      })
    )
  } else {
    yield put(
      saveUDMDataByPriority({
        message: data.responseData.message,
        succeeded: false,
        isCompleted: true,
        data: null
      })
    )
  }
  yield put(UIReducer.showLoader(false))
}

export function* fetchAllUDMSRegisteredPriorities(action: any): any {
  yield put(UIReducer.showLoader(true))
  const data = yield call(
    ApiService.callApiService,
    ApiCallTypes.GET_USER_DROPDOWN_MENUS_ALL_REGISTERED_PRIORITIES_TYPE,
    null
  )
  if (
    data.isSucceded &&
    data?.responseData &&
    data?.responseData?.status &&
    data.responseData.status === 'success' &&
    data?.responseData?.data
  ) {
    yield put(
      saveUDMSRegisteredPriorities({
        message: data.responseData.message,
        succeeded: true,
        isCompleted: true,
        data: data.responseData.data
      })
    )
  } else {
    yield put(
      saveUDMSRegisteredPriorities({
        message: data.responseData.message,
        succeeded: false,
        isCompleted: true,
        data: []
      })
    )
  }
  yield put(UIReducer.showLoader(false))
}

export function* updateUDM(action: any): any {
  yield put(UIReducer.showLoader(true))
  const data = yield call(
    ApiService.callApiService,
    ApiCallTypes.UPDATE_USER_DROPDOWN_MENU_TYPE,
    action?.payload?.jsonData,
    `/${action?.payload?.userDropdownMenuId}`
  )
  if (
    data.isSucceded &&
    data?.responseData &&
    data?.responseData?.status &&
    data.responseData.status === 'success' &&
    data?.responseData?.data
  ) {
    yield put(
      saveUpdateUDMResponse({
        message: data.responseData.message,
        succeeded: true,
        isCompleted: true,
        data: data.responseData.data
      })
    )
  } else {
    yield put(
      saveUpdateUDMResponse({
        message: data.responseData.message,
        succeeded: false,
        isCompleted: true,
        data: data?.responseData?.data ?? null
      })
    )
  }
  yield put(UIReducer.showLoader(false))
}

export function* watchFetchAllUDMS(): any {
  yield takeLatest('FETCH_ALL_UDMS', fetchAllUDMS)
}

export function* watchDeleteUDM(): any {
  yield takeLatest('DELETE_UDM', deleteUDM)
}

export function* watchAddUDM(): any {
  yield takeLatest('ADD_UDM', addUDM)
}

export function* watchUpdateUDM(): any {
  yield takeLatest('UPDATE_UDM', updateUDM)
}

export function* watchFetchUDMSMaxPriority(): any {
  yield takeLatest('FETCH_UDMS_MAX_PRIORITY', fetchUDMSMaxPriority)
}

export function* watchFetchUDMByUDMId(): any {
  yield takeLatest('FETCH_UDM_BY_UDM_ID', fetchUDMByUDMId)
}

export function* watchFetchUDMByPriority(): any {
  yield takeLatest('FETCH_UDM_BY_UDM_PRIORITY', fetchUDMByPriority)
}

export function* watchFetchAllUDMSRegisteredPriorities(): any {
  yield takeLatest('FETCH_ALL_UDMS_REGISTERED_PRIORITIES', fetchAllUDMSRegisteredPriorities)
}
