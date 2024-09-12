import { createSlice, createAction, PayloadAction } from '@reduxjs/toolkit'
import { ReduxStateModel, UIStateModel } from 'src/models/ReduxStateModel'

/* Signout Action */
const signOutAction = createAction('signout')

/* Initial State */
const initialState: UIStateModel = {
  uiData: {
    showLoaderVisible: false
  }
}

const showLoaderInfo = (state: UIStateModel, action: PayloadAction<boolean>): any => {
  state.uiData.showLoaderVisible = action?.payload ?? false
}

/* UI slice*/
const uiSlice: any = createSlice({
  name: 'ui',
  initialState: initialState,
  extraReducers: builder => {
    builder.addCase(signOutAction, state => {
      return { ...state }
    })
  },
  reducers: { showLoader: showLoaderInfo }
})

// ACTIONS
const { showLoader } = uiSlice.actions

// SELECTOR
const selectShowLoader = (state: ReduxStateModel) => {
  return state?.ui?.uiData?.showLoaderVisible ? true : false
}

const uiSliceReducer = uiSlice.reducer

export { uiSliceReducer, signOutAction, showLoader, selectShowLoader }
