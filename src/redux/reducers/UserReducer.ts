import { createSlice, createAction, PayloadAction } from '@reduxjs/toolkit'
import {
  AddDataCommonReducerModel,
  CommonReducerDataArrayModel,
  DeleteDataCommonReducerModel
} from 'src/models/CommonModel'
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
  },
  deletedUserResponse: {
    message: null,
    succeeded: false,
    isCompleted: false,
    data: null
  },
  addUserResponse: {
    message: null,
    succeeded: false,
    isCompleted: false,
    data: null
  }
}

const saveAllUsersDataInfo = (
  state: UserStateModel,
  action: PayloadAction<CommonReducerDataArrayModel<UserModel[]>>
): any => {
  state.usersData = action?.payload ?? {
    message: null,
    succeeded: false,
    isCompleted: false,
    dataArray: []
  }
}

const saveDeletedUserResponseInfo = (
  state: UserStateModel,
  action: PayloadAction<DeleteDataCommonReducerModel<null>>
): any => {
  state.deletedUserResponse = action?.payload ?? {
    message: null,
    succeeded: false,
    isCompleted: false,
    data: null
  }
}

const saveAddUserResponseInfo = (
  state: UserStateModel,
  action: PayloadAction<AddDataCommonReducerModel<UserModel>>
): any => {
  state.addUserResponse = action?.payload ?? {
    message: null,
    succeeded: false,
    isCompleted: false,
    data: null
  }
}

const resetAllUsersDataResultInfo = (state: UserStateModel): any => {
  state.usersData = {
    message: null,
    succeeded: false,
    isCompleted: false,
    dataArray: state?.usersData?.dataArray ?? []
  }
}

const resetDeletedUserResponseInfo = (state: UserStateModel): any => {
  state.deletedUserResponse = {
    message: null,
    succeeded: false,
    isCompleted: false,
    data: null
  }
}

const resetAddedUserResponseInfo = (state: UserStateModel): any => {
  state.addUserResponse = {
    message: null,
    succeeded: false,
    isCompleted: false,
    data: null
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
  reducers: {
    saveAllUsersData: saveAllUsersDataInfo,
    saveDeletedUserResponse: saveDeletedUserResponseInfo,
    saveAddUserResponse: saveAddUserResponseInfo,
    resetAllUsersDataResult: resetAllUsersDataResultInfo,
    resetDeletedUserResponse: resetDeletedUserResponseInfo,
    resetAddedUserResponse: resetAddedUserResponseInfo
  }
})

// ACTIONS
const {
  saveAllUsersData,
  saveDeletedUserResponse,
  saveAddUserResponse,
  resetAllUsersDataResult,
  resetDeletedUserResponse,
  resetAddedUserResponse
} = userSlice.actions

// SELECTOR
const selectAllUsersDataResult = (state: ReduxStateModel) => {
  return {
    message: state?.user?.usersData?.message ?? null,
    succeeded: state?.user?.usersData?.succeeded ?? false,
    isCompleted: state?.user?.usersData?.isCompleted ?? false,
    dataArray: state?.user?.usersData?.dataArray ?? []
  }
}

const selectDeletedUserResponse = (state: ReduxStateModel) => {
  return {
    message: state?.user?.deletedUserResponse?.message ?? null,
    succeeded: state?.user?.deletedUserResponse?.succeeded ?? false,
    isCompleted: state?.user?.deletedUserResponse?.isCompleted ?? false,
    data: state?.user?.deletedUserResponse?.data ?? null
  }
}

const selectAddedUserResponse = (state: ReduxStateModel) => {
  return {
    message: state?.user?.addUserResponse?.message ?? null,
    succeeded: state?.user?.addUserResponse?.succeeded ?? false,
    isCompleted: state?.user?.addUserResponse?.isCompleted ?? false,
    data: state?.user?.addUserResponse?.data ?? null
  }
}

const userSliceReducer = userSlice.reducer

export {
  userSliceReducer,
  saveAllUsersData,
  saveDeletedUserResponse,
  saveAddUserResponse,
  resetAllUsersDataResult,
  resetDeletedUserResponse,
  resetAddedUserResponse,
  selectAllUsersDataResult,
  selectDeletedUserResponse,
  selectAddedUserResponse,
  signOutAction
}
