import { createSlice, createAction, PayloadAction } from '@reduxjs/toolkit'
import { CommonReducerDataArrayModel } from 'src/models/CommonModel'
import { ReduxStateModel, UserStateModel } from 'src/models/ReduxStateModel'
import { UserModel } from 'src/models/UserModel'

/* Signout Action */
const signOutAction = createAction('signout')

/* Initial State */
const initialState: UserStateModel = {
  usersData: {
    message: null,
    succeeded: false,
    isCompleted: false,
    dataArray: []
  }
}

/**
 * save user info reducer handler
 * @param {Object} state - redux state
 * @param {Object} action - type and payload
 */
const saveAllUsersDataInfo = (
  state: UserStateModel,
  action: PayloadAction<CommonReducerDataArrayModel<UserModel[]>>
): any => {
  state.usersData = action?.payload ?? []
}

const resetAllUsersDataResultInfo = (state: UserStateModel): any => {
  state.usersData = {
    message: null,
    succeeded: false,
    isCompleted: false,
    dataArray: state?.usersData?.dataArray ?? []
  }
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
  reducers: { saveAllUsersData: saveAllUsersDataInfo, resetAllUsersDataResult: resetAllUsersDataResultInfo }
})

// ACTIONS
const { saveAllUsersData, resetAllUsersDataResult } = userSlice.actions

// SELECTOR
const selectAllUsersData = (state: ReduxStateModel) => {
  return state?.user?.usersData?.dataArray ?? []
}

const selectAllUsersDataResult = (state: ReduxStateModel) => {
  return {
    message: state?.user?.usersData?.message ?? null,
    succeeded: state?.user?.usersData?.succeeded ?? false,
    isCompleted: state?.user?.usersData?.isCompleted ?? false,
    dataArray: state?.user?.usersData?.dataArray ?? [],
  }
}

const userSliceReducer = userSlice.reducer

export {
  userSliceReducer,
  saveAllUsersData,
  resetAllUsersDataResult,
  selectAllUsersData,
  selectAllUsersDataResult,
  signOutAction
}
