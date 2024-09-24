import { createSlice, createAction, PayloadAction } from '@reduxjs/toolkit'
import {
  AddDataCommonReducerModel,
  CommonReducerDataArrayModel,
  DeleteDataCommonReducerModel
} from 'src/models/CommonModel'
import { ProductsDataModel } from 'src/models/ProductsModel'
import { ProductsStateModel, ReduxStateModel } from 'src/models/ReduxStateModel'

/* Signout Action */
const signOutAction = createAction('signout')

/* Initial State */
const initialState: ProductsStateModel = {
  productsData: {
    message: null,
    succeeded: false,
    isCompleted: false,
    dataArray: []
  },
  deletedProductResponse: {
    message: null,
    succeeded: false,
    isCompleted: false,
    data: null
  },
  addProductResponse: {
    message: null,
    succeeded: false,
    isCompleted: false,
    data: null
  }
}

const saveAllProductsDataInfo = (
  state: ProductsStateModel,
  action: PayloadAction<CommonReducerDataArrayModel<ProductsDataModel[]>>
): any => {
  state.productsData = action?.payload ?? {
    message: null,
    succeeded: false,
    isCompleted: false,
    dataArray: []
  }
}

const saveDeletedProductResponseInfo = (
  state: ProductsStateModel,
  action: PayloadAction<DeleteDataCommonReducerModel<null>>
): any => {
  state.deletedProductResponse = action?.payload ?? {
    message: null,
    succeeded: false,
    isCompleted: false,
    data: null
  }
}

const saveAddProductResponseInfo = (
  state: ProductsStateModel,
  action: PayloadAction<AddDataCommonReducerModel<ProductsDataModel>>
): any => {
  state.addProductResponse = action?.payload ?? {
    message: null,
    succeeded: false,
    isCompleted: false,
    data: null
  }
}

const resetAllProductsDataResultInfo = (state: ProductsStateModel): any => {
  state.productsData = {
    message: null,
    succeeded: false,
    isCompleted: false,
    dataArray: state?.productsData?.dataArray ?? []
  }
}

const resetDeletedProductResponseInfo = (state: ProductsStateModel): any => {
  state.deletedProductResponse = {
    message: null,
    succeeded: false,
    isCompleted: false,
    data: null
  }
}

const resetAddedProductResponseInfo = (state: ProductsStateModel): any => {
  state.addProductResponse = {
    message: null,
    succeeded: false,
    isCompleted: false,
    data: null
  }
}

const productsSlice: any = createSlice({
  name: 'products',
  initialState: initialState,
  extraReducers: builder => {
    builder.addCase(signOutAction, state => {
      return { ...state }
    })
  },
  reducers: {
    saveAllProductsData: saveAllProductsDataInfo,
    saveDeletedProductResponse: saveDeletedProductResponseInfo,
    saveAddProductResponse: saveAddProductResponseInfo,
    resetAllProductsDataResult: resetAllProductsDataResultInfo,
    resetDeletedProductResponse: resetDeletedProductResponseInfo,
    resetAddedProductResponse: resetAddedProductResponseInfo
  }
})

// ACTIONS
const {
  saveAllProductsData,
  saveDeletedProductResponse,
  saveAddProductResponse,
  resetAllProductsDataResult,
  resetDeletedProductResponse,
  resetAddedProductResponse
} = productsSlice.actions

// SELECTOR
const selectAllProductsDataResult = (state: ReduxStateModel) => {
  return {
    message: state?.products?.productsData?.message ?? null,
    succeeded: state?.products?.productsData?.succeeded ?? false,
    isCompleted: state?.products?.productsData?.isCompleted ?? false,
    dataArray: state?.products?.productsData?.dataArray ?? []
  }
}

const selectDeletedProductResponse = (state: ReduxStateModel) => {
  return {
    message: state?.products?.deletedProductResponse?.message ?? null,
    succeeded: state?.products?.deletedProductResponse?.succeeded ?? false,
    isCompleted: state?.products?.deletedProductResponse?.isCompleted ?? false,
    data: state?.products?.deletedProductResponse?.data ?? null
  }
}

const selectAddedProductResponse = (state: ReduxStateModel) => {
  return {
    message: state?.products?.addProductResponse?.message ?? null,
    succeeded: state?.products?.addProductResponse?.succeeded ?? false,
    isCompleted: state?.products?.addProductResponse?.isCompleted ?? false,
    data: state?.products?.addProductResponse?.data ?? null
  }
}

const productsSliceReducer = productsSlice.reducer

export {
  productsSliceReducer,
  saveAllProductsData,
  saveDeletedProductResponse,
  saveAddProductResponse,
  resetAllProductsDataResult,
  resetDeletedProductResponse,
  resetAddedProductResponse,
  selectAllProductsDataResult,
  selectDeletedProductResponse,
  selectAddedProductResponse,
  signOutAction
}
