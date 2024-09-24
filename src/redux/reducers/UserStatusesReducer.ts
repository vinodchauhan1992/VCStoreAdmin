import { createSlice, createAction, PayloadAction } from '@reduxjs/toolkit'
import {
  AddDataCommonReducerModel,
  CommonReducerDataArrayModel,
  DeleteDataCommonReducerModel
} from 'src/models/CommonModel'
import { ReduxStateModel, UserStatusesStateModel } from 'src/models/ReduxStateModel'
import { UserStatusModel } from 'src/models/UserStatusModel'

/* Signout Action */
const signOutAction = createAction('signout')

/* Initial State */
const initialState: UserStatusesStateModel = {
  userStatusesData: {
    message: null,
    succeeded: false,
    isCompleted: false,
    dataArray: []
  },
  deletedUserStatusResponse: {
    message: null,
    succeeded: false,
    isCompleted: false,
    data: null
  },
  addUserStatusResponse: {
    message: null,
    succeeded: false,
    isCompleted: false,
    data: null
  }
}

const saveAllUserStatusesDataInfo = (
  state: UserStatusesStateModel,
  action: PayloadAction<CommonReducerDataArrayModel<UserStatusModel[]>>
): any => {
  state.userStatusesData = action?.payload ?? {
    message: null,
    succeeded: false,
    isCompleted: false,
    dataArray: []
  }
}

const saveDeletedUserStatusResponseInfo = (
  state: UserStatusesStateModel,
  action: PayloadAction<DeleteDataCommonReducerModel<null>>
): any => {
  state.deletedUserStatusResponse = action?.payload ?? {
    message: null,
    succeeded: false,
    isCompleted: false,
    data: null
  }
}

const saveAddUserStatusResponseInfo = (
  state: UserStatusesStateModel,
  action: PayloadAction<AddDataCommonReducerModel<UserStatusModel>>
): any => {
  state.addUserStatusResponse = action?.payload ?? {
    message: null,
    succeeded: false,
    isCompleted: false,
    data: null
  }
}

const resetAllUserStatusesDataResultInfo = (state: UserStatusesStateModel): any => {
  state.userStatusesData = {
    message: null,
    succeeded: false,
    isCompleted: false,
    dataArray: state?.userStatusesData?.dataArray ?? []
  }
}

const resetDeletedUserStatusResponseInfo = (state: UserStatusesStateModel): any => {
  state.deletedUserStatusResponse = {
    message: null,
    succeeded: false,
    isCompleted: false,
    data: null
  }
}

const resetAddedUserStatusResponseInfo = (state: UserStatusesStateModel): any => {
  state.addUserStatusResponse = {
    message: null,
    succeeded: false,
    isCompleted: false,
    data: null
  }
}

const userStatusesSlice: any = createSlice({
  name: 'userStatuses',
  initialState: initialState,
  extraReducers: builder => {
    builder.addCase(signOutAction, state => {
      return { ...state }
    })
  },
  reducers: {
    saveAllUserStatusesData: saveAllUserStatusesDataInfo,
    saveDeletedUserStatusResponse: saveDeletedUserStatusResponseInfo,
    saveAddUserStatusResponse: saveAddUserStatusResponseInfo,
    resetAllUserStatusesDataResult: resetAllUserStatusesDataResultInfo,
    resetDeletedUserStatusResponse: resetDeletedUserStatusResponseInfo,
    resetAddedUserStatusResponse: resetAddedUserStatusResponseInfo
  }
})

// ACTIONS
const {
  saveAllUserStatusesData,
  saveDeletedUserStatusResponse,
  saveAddUserStatusResponse,
  resetAllUserStatusesDataResult,
  resetDeletedUserStatusResponse,
  resetAddedUserStatusResponse
} = userStatusesSlice.actions

// SELECTOR
const selectAllUserStatusesDataResult = (state: ReduxStateModel) => {
  return {
    message: state?.userStatuses?.userStatusesData?.message ?? null,
    succeeded: state?.userStatuses?.userStatusesData?.succeeded ?? false,
    isCompleted: state?.userStatuses?.userStatusesData?.isCompleted ?? false,
    dataArray: state?.userStatuses?.userStatusesData?.dataArray ?? []
  }
}

const selectDeletedUserStatusResponse = (state: ReduxStateModel) => {
  return {
    message: state?.userStatuses?.deletedUserStatusResponse?.message ?? null,
    succeeded: state?.userStatuses?.deletedUserStatusResponse?.succeeded ?? false,
    isCompleted: state?.userStatuses?.deletedUserStatusResponse?.isCompleted ?? false,
    data: state?.userStatuses?.deletedUserStatusResponse?.data ?? null
  }
}

const selectAddedUserStatusResponse = (state: ReduxStateModel) => {
  return {
    message: state?.userStatuses?.addUserStatusResponse?.message ?? null,
    succeeded: state?.userStatuses?.addUserStatusResponse?.succeeded ?? false,
    isCompleted: state?.userStatuses?.addUserStatusResponse?.isCompleted ?? false,
    data: state?.userStatuses?.addUserStatusResponse?.data ?? null
  }
}

const userStatusesSliceReducer = userStatusesSlice.reducer

export {
  userStatusesSliceReducer,
  saveAllUserStatusesData,
  saveDeletedUserStatusResponse,
  saveAddUserStatusResponse,
  resetAllUserStatusesDataResult,
  resetDeletedUserStatusResponse,
  resetAddedUserStatusResponse,
  selectAllUserStatusesDataResult,
  selectDeletedUserStatusResponse,
  selectAddedUserStatusResponse,
  signOutAction
}
