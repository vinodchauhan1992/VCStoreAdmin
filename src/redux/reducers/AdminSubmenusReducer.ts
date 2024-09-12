import { createSlice, createAction, PayloadAction } from '@reduxjs/toolkit'
import { AdminSubmenusModel } from 'src/models/AdminSubmenusModel'
import { AdminSubmenusStateModel, ReduxStateModel } from 'src/models/ReduxStateModel'

/* Signout Action */
const signOutAction = createAction('signout')

/* Initial State */
const initialState: AdminSubmenusStateModel = {
  adminSubmenusData: []
}

const saveAllAdminSubmenusDataInfo = (
  state: AdminSubmenusStateModel,
  action: PayloadAction<AdminSubmenusModel[]>
): any => {
  state.adminSubmenusData = action?.payload ?? []
}

const adminSubmenusSlice: any = createSlice({
  name: 'adminSubmenus',
  initialState: initialState,
  extraReducers: builder => {
    builder.addCase(signOutAction, state => {
      return { ...state }
    })
  },
  reducers: { saveAllAdminSubmenusData: saveAllAdminSubmenusDataInfo }
})

// ACTIONS
const { saveAllAdminSubmenusData } = adminSubmenusSlice.actions

// SELECTOR
const selectAllAdminSubmenusData = (state: ReduxStateModel) => {
  return state?.adminSubmenus?.adminSubmenusData ?? []
}

const adminSubmenusSliceReducer = adminSubmenusSlice.reducer

export { adminSubmenusSliceReducer, saveAllAdminSubmenusData, selectAllAdminSubmenusData, signOutAction }
