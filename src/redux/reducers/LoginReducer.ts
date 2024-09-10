import { createSlice, createAction, PayloadAction } from '@reduxjs/toolkit'
import { LoggedInUserModel } from '../../models/LoggedInUserModel'
import { ReduxStateModel, LoggedInUserStateModel } from 'src/models/ReduxStateModel'

/* Signout Action */
const signOutAction = createAction('signout')

/* Initial State */
const initialState: LoggedInUserStateModel = {
  loggedInUserData: null
}

/**
 * save user info reducer handler
 * @param {Object} state - redux state
 * @param {Object} action - type and payload
 */
const saveLoggedInUserInfo = (state: LoggedInUserStateModel, action: PayloadAction<LoggedInUserModel>): any => {
  state.loggedInUserData = action?.payload
}

const wipeoutLoggedInUserInfo = (state: LoggedInUserStateModel): any => {
  state.loggedInUserData = null
}

/* Loggedin user slice*/
const loggedInUserSlice: any = createSlice({
  name: 'loggedInUser',
  initialState: initialState,
  extraReducers: builder => {
    builder.addCase(signOutAction, state => {
      return { ...state }
    })
  },
  reducers: { saveLoggedInUser: saveLoggedInUserInfo, wipeoutLoggedInUser: wipeoutLoggedInUserInfo }
})

// ACTIONS
const { saveLoggedInUser, wipeoutLoggedInUser } = loggedInUserSlice.actions

// SELECTOR
const selectIsUserLoggedIn = (state: ReduxStateModel) => {
  if (
    state?.loggedInUser?.loggedInUserData?.user?.id &&
    state.loggedInUser.loggedInUserData.user.id !== '' &&
    state?.loggedInUser?.loggedInUserData?.jwtToken &&
    state.loggedInUser.loggedInUserData.jwtToken !== ''
  ) {
    return true
  }

  return false
}
const selectLoggedInUser = (state: ReduxStateModel) => state?.loggedInUser?.loggedInUserData ?? null
const selectLoggedInUserId = (state: ReduxStateModel) => {
  return state?.loggedInUser?.loggedInUserData?.user?.id ?? null
}
const selectLoggedInUserJwtToken = (state: ReduxStateModel) => {
  return state?.loggedInUser?.loggedInUserData?.jwtToken ?? null
}

const loggedInUserSliceReducer = loggedInUserSlice.reducer

export {
  loggedInUserSliceReducer,
  saveLoggedInUser,
  selectLoggedInUser,
  selectLoggedInUserId,
  selectIsUserLoggedIn,
  selectLoggedInUserJwtToken,
  signOutAction,
  wipeoutLoggedInUser
}
