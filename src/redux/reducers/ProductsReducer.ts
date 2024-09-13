import { createSlice, createAction, PayloadAction } from '@reduxjs/toolkit'
import { CommonReducerDataArrayModel } from 'src/models/CommonModel'
import { ProductsModel } from 'src/models/ProductsModel'
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
  }
}

const saveAllProductsDataInfo = (
  state: ProductsStateModel,
  action: PayloadAction<CommonReducerDataArrayModel<ProductsModel[]>>
): any => {
  state.productsData = action?.payload ?? []
}

const resetAllProductsDataResultInfo = (state: ProductsStateModel): any => {
  state.productsData = {
    message: null,
    succeeded: false,
    isCompleted: false,
    dataArray: state?.productsData?.dataArray ?? []
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
  reducers: { saveAllProductsData: saveAllProductsDataInfo, resetAllProductsDataResult: resetAllProductsDataResultInfo }
})

// ACTIONS
const { saveAllProductsData, resetAllProductsDataResult } = productsSlice.actions

// SELECTOR
const selectAllProductsDataResult = (state: ReduxStateModel) => {
  return {
    message: state?.products?.productsData?.message ?? null,
    succeeded: state?.products?.productsData?.succeeded ?? false,
    isCompleted: state?.products?.productsData?.isCompleted ?? false,
    dataArray: state?.products?.productsData?.dataArray ?? []
  }
}

const productsSliceReducer = productsSlice.reducer

export {
  productsSliceReducer,
  saveAllProductsData,
  resetAllProductsDataResult,
  selectAllProductsDataResult,
  signOutAction
}
