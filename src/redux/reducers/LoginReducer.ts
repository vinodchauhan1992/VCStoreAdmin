import { createSlice, createAction, PayloadAction } from '@reduxjs/toolkit'
import { LoggedInUserModel } from '../../models/LoggedInUserModel'
import { ReduxStateModel, LoggedInUserStateModel } from 'src/models/ReduxStateModel'
import { CommonReducerDataObjectModel } from 'src/models/CommonModel'

/* Signout Action */
const signOutAction = createAction('signout')

/* Initial State */
const initialState: LoggedInUserStateModel = {
  loggedInUserData: {
    message: null,
    isCompleted: false,
    succeeded: false,
    data: null
  }
}

/**
 * save user info reducer handler
 * @param {Object} state - redux state
 * @param {Object} action - type and payload
 */
const saveLoggedInUserInfo = (
  state: LoggedInUserStateModel,
  action: PayloadAction<CommonReducerDataObjectModel<LoggedInUserModel>>
): any => {
  state.loggedInUserData = action?.payload ?? {
    message: null,
    isCompleted: false,
    succeeded: false,
    data: null
  }
}

const wipeoutLoggedInUserInfo = (state: LoggedInUserStateModel): any => {
  state.loggedInUserData = {
    message: null,
    isCompleted: false,
    succeeded: false,
    data: null
  }
}

const resetLoggedInUserResponseInfo = (state: LoggedInUserStateModel): any => {
  state.loggedInUserData = {
    message: null,
    isCompleted: false,
    succeeded: false,
    data: state?.loggedInUserData?.data ?? null
  }
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
  reducers: {
    saveLoggedInUser: saveLoggedInUserInfo,
    wipeoutLoggedInUser: wipeoutLoggedInUserInfo,
    resetLoggedInUserResponse: resetLoggedInUserResponseInfo
  }
})

// ACTIONS
const { saveLoggedInUser, wipeoutLoggedInUser, resetLoggedInUserResponse } = loggedInUserSlice.actions

// SELECTOR
const selectIsUserLoggedIn = (state: ReduxStateModel) => {
  if (
    state?.loggedInUser?.loggedInUserData?.data?.user?.id &&
    state.loggedInUser.loggedInUserData.data.user.id !== '' &&
    state?.loggedInUser?.loggedInUserData?.data?.jwtToken &&
    state.loggedInUser.loggedInUserData.data.jwtToken !== ''
  ) {
    return true
  }

  return false
}
const selectLoggedInUser = (state: ReduxStateModel) => state?.loggedInUser?.loggedInUserData ?? null
const selectLoggedInUserId = (state: ReduxStateModel) => {
  return state?.loggedInUser?.loggedInUserData?.data?.user?.id ?? null
}
const selectLoggedInUserJwtToken = (state: ReduxStateModel) => {
  return state?.loggedInUser?.loggedInUserData?.data?.jwtToken ?? null
}
const selectLoggedInUserRole = (state: ReduxStateModel) => {
  return state?.loggedInUser?.loggedInUserData?.data?.user?.userRole ?? null
}

const loggedInUserSliceReducer = loggedInUserSlice.reducer

export {
  loggedInUserSliceReducer,
  saveLoggedInUser,
  selectLoggedInUser,
  selectLoggedInUserId,
  selectIsUserLoggedIn,
  selectLoggedInUserJwtToken,
  selectLoggedInUserRole,
  signOutAction,
  wipeoutLoggedInUser,
  resetLoggedInUserResponse
}
