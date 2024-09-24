import { createSlice, createAction, PayloadAction } from '@reduxjs/toolkit'
import { CategoryModel } from 'src/models/CategoryModel'
import {
  AddDataCommonReducerModel,
  CommonReducerDataArrayModel,
  DeleteDataCommonReducerModel,
  UpdateDataCommonReducerModel
} from 'src/models/CommonModel'
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
  },
  deletedCategoryResponse: {
    message: null,
    succeeded: false,
    isCompleted: false,
    data: null
  },
  addCategoryResponse: {
    message: null,
    succeeded: false,
    isCompleted: false,
    data: null
  },
  updateCategoryResponse: {
    message: null,
    succeeded: false,
    isCompleted: false,
    data: null
  }
}

const saveAllCategoriesDataInfo = (
  state: CategoriesStateModel,
  action: PayloadAction<CommonReducerDataArrayModel<CategoryModel[]>>
): any => {
  state.categoriesData = action?.payload ?? {
    message: null,
    succeeded: false,
    isCompleted: false,
    dataArray: []
  }
}

const saveDeletedCategoryResponseInfo = (
  state: CategoriesStateModel,
  action: PayloadAction<DeleteDataCommonReducerModel<null>>
): any => {
  state.deletedCategoryResponse = action?.payload ?? {
    message: null,
    succeeded: false,
    isCompleted: false,
    data: null
  }
}

const saveAddCategoryResponseInfo = (
  state: CategoriesStateModel,
  action: PayloadAction<AddDataCommonReducerModel<CategoryModel>>
): any => {
  state.addCategoryResponse = action?.payload ?? {
    message: null,
    succeeded: false,
    isCompleted: false,
    data: null
  }
}

const saveUpdateCategoryResponseInfo = (
  state: CategoriesStateModel,
  action: PayloadAction<UpdateDataCommonReducerModel<CategoryModel>>
): any => {
  state.updateCategoryResponse = action?.payload ?? {
    message: null,
    succeeded: false,
    isCompleted: false,
    data: null
  }
}

const resetAllCategoriesDataResultInfo = (state: CategoriesStateModel): any => {
  state.categoriesData = {
    message: null,
    succeeded: false,
    isCompleted: false,
    dataArray: state?.categoriesData?.dataArray ?? []
  }
}

const resetDeletedCategoryResponseInfo = (state: CategoriesStateModel): any => {
  state.deletedCategoryResponse = {
    message: null,
    succeeded: false,
    isCompleted: false,
    data: null
  }
}

const resetAddedCategoryResponseInfo = (state: CategoriesStateModel): any => {
  state.addCategoryResponse = {
    message: null,
    succeeded: false,
    isCompleted: false,
    data: null
  }
}

const resetUpdatedCategoryResponseInfo = (state: CategoriesStateModel): any => {
  state.updateCategoryResponse = {
    message: null,
    succeeded: false,
    isCompleted: false,
    data: null
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
    saveDeletedCategoryResponse: saveDeletedCategoryResponseInfo,
    saveAddCategoryResponse: saveAddCategoryResponseInfo,
    saveUpdateCategoryResponse: saveUpdateCategoryResponseInfo,
    resetAllCategoriesDataResult: resetAllCategoriesDataResultInfo,
    resetDeletedCategoryResponse: resetDeletedCategoryResponseInfo,
    resetAddedCategoryResponse: resetAddedCategoryResponseInfo,
    resetUpdatedCategoryResponse: resetUpdatedCategoryResponseInfo
  }
})

// ACTIONS
const {
  saveAllCategoriesData,
  saveDeletedCategoryResponse,
  saveAddCategoryResponse,
  saveUpdateCategoryResponse,
  resetAllCategoriesDataResult,
  resetDeletedCategoryResponse,
  resetAddedCategoryResponse,
  resetUpdatedCategoryResponse
} = categoriesSlice.actions

// SELECTOR
const selectAllCategoriesDataResult = (state: ReduxStateModel) => {
  return {
    message: state?.categories?.categoriesData?.message ?? null,
    succeeded: state?.categories?.categoriesData?.succeeded ?? false,
    isCompleted: state?.categories?.categoriesData?.isCompleted ?? false,
    dataArray: state?.categories?.categoriesData?.dataArray ?? []
  }
}

const selectDeletedCategoryResponse = (state: ReduxStateModel) => {
  return {
    message: state?.categories?.deletedCategoryResponse?.message ?? null,
    succeeded: state?.categories?.deletedCategoryResponse?.succeeded ?? false,
    isCompleted: state?.categories?.deletedCategoryResponse?.isCompleted ?? false,
    data: state?.categories?.deletedCategoryResponse?.data ?? null
  }
}

const selectAddedCategoryResponse = (state: ReduxStateModel) => {
  return {
    message: state?.categories?.addCategoryResponse?.message ?? null,
    succeeded: state?.categories?.addCategoryResponse?.succeeded ?? false,
    isCompleted: state?.categories?.addCategoryResponse?.isCompleted ?? false,
    data: state?.categories?.addCategoryResponse?.data ?? null
  }
}

const selectUpdatedCategoryResponse = (state: ReduxStateModel) => {
  return {
    message: state?.categories?.updateCategoryResponse?.message ?? null,
    succeeded: state?.categories?.updateCategoryResponse?.succeeded ?? false,
    isCompleted: state?.categories?.updateCategoryResponse?.isCompleted ?? false,
    data: state?.categories?.updateCategoryResponse?.data ?? null
  }
}

const categoriesSliceReducer = categoriesSlice.reducer

export {
  categoriesSliceReducer,
  saveAllCategoriesData,
  saveDeletedCategoryResponse,
  saveAddCategoryResponse,
  saveUpdateCategoryResponse,
  resetAllCategoriesDataResult,
  resetDeletedCategoryResponse,
  resetAddedCategoryResponse,
  resetUpdatedCategoryResponse,
  selectAllCategoriesDataResult,
  selectDeletedCategoryResponse,
  selectAddedCategoryResponse,
  selectUpdatedCategoryResponse,
  signOutAction
}
