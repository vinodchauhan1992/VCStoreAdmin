import { createSlice, createAction, PayloadAction } from '@reduxjs/toolkit'
import { ReduxStateModel, UserStateModel } from 'src/models/ReduxStateModel'
import { UserModel } from 'src/models/UserModel'

/* Signout Action */
const signOutAction = createAction('signout')

/* Initial State */
const initialState: UserStateModel = {
  usersData: []
}

/**
 * save user info reducer handler
 * @param {Object} state - redux state
 * @param {Object} action - type and payload
 */
const saveAllUsersDataInfo = (state: UserStateModel, action: PayloadAction<UserModel[]>): any => {
  state.usersData = action?.payload ?? []
}

/* User slice*/
const userSlice: any = createSlice({
  name: 'user',
  initialState: initialState,
  extraReducers: builder => {
    builder.addCase(signOutAction, state => {
      return { ...state }
    })
  },
  reducers: { saveAllUsersData: saveAllUsersDataInfo }
})

// ACTIONS
const { saveAllUsersData } = userSlice.actions

// SELECTOR
const selectAllUsersData = (state: ReduxStateModel) => {
  return state?.user?.usersData ?? []
}

const userSliceReducer = userSlice.reducer

export { userSliceReducer, saveAllUsersData, selectAllUsersData, signOutAction }
