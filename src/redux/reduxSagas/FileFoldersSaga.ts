import * as Api from '../../services'
import { takeLatest, call, put } from 'redux-saga/effects'
import { saveAllFileFoldersData } from '../reducers/FileFoldersReducer'
import { UIReducer } from '../reducers'

const { ApiService, ApiCallTypes } = Api

export function* fetchAllFileFolders(): any {
  yield put(UIReducer.showLoader(true))
  const data = yield call(ApiService.callApiService, ApiCallTypes.GET_ALL_FILE_FOLDERS_TYPE, null)
  if (
    data.isSucceded &&
    data?.responseData &&
    data?.responseData?.status &&
    data.responseData.status === 'success' &&
    data?.responseData?.data
  ) {
    yield put(
      saveAllFileFoldersData({
        message: null,
        succeeded: true,
        isCompleted: true,
        dataArray: data.responseData.data
      })
    )
  } else {
    yield put(
      saveAllFileFoldersData({
        message: data.responseData.message,
        succeeded: false,
        isCompleted: true,
        dataArray: []
      })
    )
  }
  yield put(UIReducer.showLoader(false))
}

export function* watchFetchAllFileFolders(): any {
  yield takeLatest('FETCH_ALL_FILE_FOLDERS', fetchAllFileFolders)
}
