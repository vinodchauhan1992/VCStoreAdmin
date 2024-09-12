import { createSlice, createAction, PayloadAction } from '@reduxjs/toolkit'
import { ProductsModel } from 'src/models/ProductsModel'
import { ProductsStateModel, ReduxStateModel } from 'src/models/ReduxStateModel'

/* Signout Action */
const signOutAction = createAction('signout')

/* Initial State */
const initialState: ProductsStateModel = {
  productsData: []
}

const saveAllProductsDataInfo = (state: ProductsStateModel, action: PayloadAction<ProductsModel[]>): any => {
  state.productsData = action?.payload ?? []
}

const productsSlice: any = createSlice({
  name: 'products',
  initialState: initialState,
  extraReducers: builder => {
    builder.addCase(signOutAction, state => {
      return { ...state }
    })
  },
  reducers: { saveAllProductsData: saveAllProductsDataInfo }
})

// ACTIONS
const { saveAllProductsData } = productsSlice.actions

// SELECTOR
const selectAllProductsData = (state: ReduxStateModel) => {
  return state?.products?.productsData ?? []
}

const productsSliceReducer = productsSlice.reducer

export { productsSliceReducer, saveAllProductsData, selectAllProductsData, signOutAction }
