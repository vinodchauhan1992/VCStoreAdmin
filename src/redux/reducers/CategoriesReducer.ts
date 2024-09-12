import { createSlice, createAction, PayloadAction } from '@reduxjs/toolkit'
import { CategoryModel } from 'src/models/CategoryModel'
import { CategoriesStateModel, ReduxStateModel } from 'src/models/ReduxStateModel'

/* Signout Action */
const signOutAction = createAction('signout')

/* Initial State */
const initialState: CategoriesStateModel = {
  categoriesData: []
}

const saveAllCategoriesDataInfo = (state: CategoriesStateModel, action: PayloadAction<CategoryModel[]>): any => {
  state.categoriesData = action?.payload ?? []
}

const categoriesSlice: any = createSlice({
  name: 'categories',
  initialState: initialState,
  extraReducers: builder => {
    builder.addCase(signOutAction, state => {
      return { ...state }
    })
  },
  reducers: { saveAllCategoriesData: saveAllCategoriesDataInfo }
})

// ACTIONS
const { saveAllCategoriesData } = categoriesSlice.actions

// SELECTOR
const selectAllCategoriesData = (state: ReduxStateModel) => {
  return state?.categories?.categoriesData ?? []
}

const categoriesSliceReducer = categoriesSlice.reducer

export { categoriesSliceReducer, saveAllCategoriesData, selectAllCategoriesData, signOutAction }
