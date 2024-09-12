import { createSlice, createAction, PayloadAction } from '@reduxjs/toolkit'
import { ReduxStateModel, UserRolesStateModel } from 'src/models/ReduxStateModel'
import { UserRoleModel } from 'src/models/UserRoleModel'

/* Signout Action */
const signOutAction = createAction('signout')

/* Initial State */
const initialState: UserRolesStateModel = {
  userRolesData: []
}

const saveAllUserRolesDataInfo = (state: UserRolesStateModel, action: PayloadAction<UserRoleModel[]>): any => {
  state.userRolesData = action?.payload ?? []
}

const userRolesSlice: any = createSlice({
  name: 'userRoles',
  initialState: initialState,
  extraReducers: builder => {
    builder.addCase(signOutAction, state => {
      return { ...state }
    })
  },
  reducers: { saveAllUserRolesData: saveAllUserRolesDataInfo }
})

// ACTIONS
const { saveAllUserRolesData } = userRolesSlice.actions

// SELECTOR
const selectAllUserRolesData = (state: ReduxStateModel) => {
  return state?.userRoles?.userRolesData ?? []
}

const userRolesSliceReducer = userRolesSlice.reducer

export { userRolesSliceReducer, saveAllUserRolesData, selectAllUserRolesData, signOutAction }
