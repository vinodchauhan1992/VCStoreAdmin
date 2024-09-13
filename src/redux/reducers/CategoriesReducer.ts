import { createSlice, createAction, PayloadAction } from '@reduxjs/toolkit'
import { CategoryModel } from 'src/models/CategoryModel'
import { CommonReducerDataArrayModel } from 'src/models/CommonModel'
import { CategoriesStateModel, ReduxStateModel } from 'src/models/ReduxStateModel'

/* Signout Action */
const signOutAction = createAction('signout')

/* Initial State */
const initialState: CategoriesStateModel = {
  categoriesData: {
    message: null,
    succeeded: false,
    isCompleted: false,
    dataArray: []
  }
}

const saveAllCategoriesDataInfo = (
  state: CategoriesStateModel,
  action: PayloadAction<CommonReducerDataArrayModel<CategoryModel[]>>
): any => {
  state.categoriesData = action?.payload ?? []
}

const resetAllCategoriesDataResultInfo = (state: CategoriesStateModel): any => {
  state.categoriesData = {
    message: null,
    succeeded: false,
    isCompleted: false,
    dataArray: state?.categoriesData?.dataArray ?? []
  }
}

const categoriesSlice: any = createSlice({
  name: 'categories',
  initialState: initialState,
  extraReducers: builder => {
    builder.addCase(signOutAction, state => {
      return { ...state }
    })
  },
  reducers: {
    saveAllCategoriesData: saveAllCategoriesDataInfo,
    resetAllCategoriesDataResult: resetAllCategoriesDataResultInfo
  }
})

// ACTIONS
const { saveAllCategoriesData, resetAllCategoriesDataResult } = categoriesSlice.actions

// SELECTOR
const selectAllCategoriesData = (state: ReduxStateModel) => {
  return state?.categories?.categoriesData?.dataArray ?? []
}

const selectAllCategoriesDataResult = (state: ReduxStateModel) => {
  return {
    message: state?.categories?.categoriesData?.message ?? null,
    succeeded: state?.categories?.categoriesData?.succeeded ?? false,
    isCompleted: state?.categories?.categoriesData?.isCompleted ?? false,
    dataArray: state?.categories?.categoriesData?.dataArray ?? [],
  }
}

const categoriesSliceReducer = categoriesSlice.reducer

export {
  categoriesSliceReducer,
  saveAllCategoriesData,
  resetAllCategoriesDataResult,
  selectAllCategoriesData,
  selectAllCategoriesDataResult,
  signOutAction
}
