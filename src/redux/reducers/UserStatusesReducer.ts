import { createSlice, createAction, PayloadAction } from '@reduxjs/toolkit'
import { CommonReducerDataArrayModel } from 'src/models/CommonModel'
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
  }
}

const saveAllUserStatusesDataInfo = (
  state: UserStatusesStateModel,
  action: PayloadAction<CommonReducerDataArrayModel<UserStatusModel[]>>
): any => {
  state.userStatusesData = action?.payload ?? []
}

const resetAllUserStatusesDataResultInfo = (state: UserStatusesStateModel): any => {
  state.userStatusesData = {
    message: null,
    succeeded: false,
    isCompleted: false,
    dataArray: state?.userStatusesData?.dataArray ?? []
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
    resetAllUserStatusesDataResult: resetAllUserStatusesDataResultInfo
  }
})

// ACTIONS
const { saveAllUserStatusesData, resetAllUserStatusesDataResult } = userStatusesSlice.actions

// SELECTOR
const selectAllUserStatusesDataResult = (state: ReduxStateModel) => {
  return {
    message: state?.userStatuses?.userStatusesData?.message ?? null,
    succeeded: state?.userStatuses?.userStatusesData?.succeeded ?? false,
    isCompleted: state?.userStatuses?.userStatusesData?.isCompleted ?? false,
    dataArray: state?.userStatuses?.userStatusesData?.dataArray ?? []
  }
}

const userStatusesSliceReducer = userStatusesSlice.reducer

export {
  userStatusesSliceReducer,
  saveAllUserStatusesData,
  resetAllUserStatusesDataResult,
  selectAllUserStatusesDataResult,
  signOutAction
}
