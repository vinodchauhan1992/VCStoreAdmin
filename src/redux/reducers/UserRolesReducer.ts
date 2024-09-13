import { createSlice, createAction, PayloadAction } from '@reduxjs/toolkit'
import { CommonReducerDataArrayModel } from 'src/models/CommonModel'
import { ReduxStateModel, UserRolesStateModel } from 'src/models/ReduxStateModel'
import { UserRoleModel } from 'src/models/UserRoleModel'

/* Signout Action */
const signOutAction = createAction('signout')

/* Initial State */
const initialState: UserRolesStateModel = {
  userRolesData: {
    message: null,
    succeeded: false,
    isCompleted: false,
    dataArray: []
  }
}

const saveAllUserRolesDataInfo = (
  state: UserRolesStateModel,
  action: PayloadAction<CommonReducerDataArrayModel<UserRoleModel[]>>
): any => {
  state.userRolesData = action?.payload ?? []
}

const resetAllUserRolesDataResultInfo = (state: UserRolesStateModel): any => {
  state.userRolesData = {
    message: null,
    succeeded: false,
    isCompleted: false,
    dataArray: state?.userRolesData?.dataArray ?? []
  }
}

const userRolesSlice: any = createSlice({
  name: 'userRoles',
  initialState: initialState,
  extraReducers: builder => {
    builder.addCase(signOutAction, state => {
      return { ...state }
    })
  },
  reducers: {
    saveAllUserRolesData: saveAllUserRolesDataInfo,
    resetAllUserRolesDataResult: resetAllUserRolesDataResultInfo
  }
})

// ACTIONS
const { saveAllUserRolesData, resetAllUserRolesDataResult } = userRolesSlice.actions

// SELECTOR
const selectAllUserRolesData = (state: ReduxStateModel) => {
  return state?.userRoles?.userRolesData?.dataArray ?? []
}

const selectAllUserRolesDataResult = (state: ReduxStateModel) => {
  return {
    message: state?.userRoles?.userRolesData?.message ?? null,
    succeeded: state?.userRoles?.userRolesData?.succeeded ?? false,
    isCompleted: state?.userRoles?.userRolesData?.isCompleted ?? false,
    dataArray: state?.userRoles?.userRolesData?.dataArray ?? [],
  }
}

const userRolesSliceReducer = userRolesSlice.reducer

export {
  userRolesSliceReducer,
  saveAllUserRolesData,
  resetAllUserRolesDataResult,
  selectAllUserRolesData,
  selectAllUserRolesDataResult,
  signOutAction
}
