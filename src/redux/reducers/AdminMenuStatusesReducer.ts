import { createSlice, createAction, PayloadAction } from '@reduxjs/toolkit'
import { AdminMenuStatusesModel } from 'src/models/AdminMenuStatusesModel'
import { AdminMenuStatusesStateModel, ReduxStateModel } from 'src/models/ReduxStateModel'

/* Signout Action */
const signOutAction = createAction('signout')

/* Initial State */
const initialState: AdminMenuStatusesStateModel = {
  adminMenuStatusesData: []
}

const saveAllAdminMenuStatusesDataInfo = (
  state: AdminMenuStatusesStateModel,
  action: PayloadAction<AdminMenuStatusesModel[]>
): any => {
  state.adminMenuStatusesData = action?.payload ?? []
}

const adminMenuStatusesSlice: any = createSlice({
  name: 'adminMenuStatuses',
  initialState: initialState,
  extraReducers: builder => {
    builder.addCase(signOutAction, state => {
      return { ...state }
    })
  },
  reducers: { saveAllAdminMenuStatusesData: saveAllAdminMenuStatusesDataInfo }
})

// ACTIONS
const { saveAllAdminMenuStatusesData } = adminMenuStatusesSlice.actions

// SELECTOR
const selectAllAdminMenuStatusesData = (state: ReduxStateModel) => {
  return state?.adminMenuStatuses?.adminMenuStatusesData ?? []
}

const adminMenuStatusesSliceReducer = adminMenuStatusesSlice.reducer

export { adminMenuStatusesSliceReducer, saveAllAdminMenuStatusesData, selectAllAdminMenuStatusesData, signOutAction }
