import { createSlice, createAction, PayloadAction } from '@reduxjs/toolkit'
import { AdminMenusModel } from 'src/models/AdminMenusModel'
import { AdminMenusStateModel, ReduxStateModel } from 'src/models/ReduxStateModel'

/* Signout Action */
const signOutAction = createAction('signout')

/* Initial State */
const initialState: AdminMenusStateModel = {
  adminMenusData: []
}

const saveAllAdminMenusDataInfo = (state: AdminMenusStateModel, action: PayloadAction<AdminMenusModel[]>): any => {
  state.adminMenusData = action?.payload ?? []
}

const adminMenusSlice: any = createSlice({
  name: 'adminMenus',
  initialState: initialState,
  extraReducers: builder => {
    builder.addCase(signOutAction, state => {
      return { ...state }
    })
  },
  reducers: { saveAllAdminMenusData: saveAllAdminMenusDataInfo }
})

// ACTIONS
const { saveAllAdminMenusData } = adminMenusSlice.actions

// SELECTOR
const selectAllAdminMenusData = (state: ReduxStateModel) => {
  return state?.adminMenus?.adminMenusData ?? []
}

const adminMenusSliceReducer = adminMenusSlice.reducer

export { adminMenusSliceReducer, saveAllAdminMenusData, selectAllAdminMenusData, signOutAction }
