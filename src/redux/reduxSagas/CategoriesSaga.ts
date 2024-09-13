import * as Api from '../../services'
import { takeLatest, call, put } from 'redux-saga/effects'
import { saveAllCategoriesData } from '../reducers/CategoriesReducer'
import { UIReducer } from '../reducers'

const { ApiService, ApiCallTypes } = Api

export function* fetchAllCategories(): any {
  yield put(UIReducer.showLoader(true))
  const data = yield call(ApiService.callApiService, ApiCallTypes.GET_ALL_CATEGORIES_TYPE, null)

  if (
    data.isSucceded &&
    data?.responseData &&
    data?.responseData?.status &&
    data.responseData.status === 'success' &&
    data?.responseData?.data
  ) {
    yield put(
      saveAllCategoriesData({
        message: null,
        succeeded: true,
        isCompleted: true,
        dataArray: data.responseData.data
      })
    )
  } else {
    yield put(
      saveAllCategoriesData({
        message: data.responseData.message,
        succeeded: false,
        isCompleted: true,
        dataArray: []
      })
    )
  }
  yield put(UIReducer.showLoader(false))
}

export function* watchFetchAllCategories(): any {
  yield takeLatest('FETCH_ALL_CATEGORIES', fetchAllCategories)
}
