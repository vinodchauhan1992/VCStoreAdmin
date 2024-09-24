import { createSlice, createAction, PayloadAction } from '@reduxjs/toolkit'
import {
  AddDataCommonReducerModel,
  CommonReducerDataArrayModel,
  DeleteDataCommonReducerModel,
  UpdateDataCommonReducerModel
} from 'src/models/CommonModel'
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
  },
  deletedUserRoleResponse: {
    message: null,
    succeeded: false,
    isCompleted: false,
    data: null
  },
  addUserRoleResponse: {
    message: null,
    succeeded: false,
    isCompleted: false,
    data: null
  },
  updateUserRoleResponse: {
    message: null,
    succeeded: false,
    isCompleted: false,
    data: null
  }
}

const saveAllUserRolesDataInfo = (
  state: UserRolesStateModel,
  action: PayloadAction<CommonReducerDataArrayModel<UserRoleModel[]>>
): any => {
  state.userRolesData = action?.payload ?? {
    message: null,
    succeeded: false,
    isCompleted: false,
    dataArray: []
  }
}

const saveDeletedUserRoleResponseInfo = (
  state: UserRolesStateModel,
  action: PayloadAction<DeleteDataCommonReducerModel<null>>
): any => {
  state.deletedUserRoleResponse = action?.payload ?? {
    message: null,
    succeeded: false,
    isCompleted: false,
    data: null
  }
}

const saveAddUserRoleResponseInfo = (
  state: UserRolesStateModel,
  action: PayloadAction<AddDataCommonReducerModel<UserRoleModel>>
): any => {
  state.addUserRoleResponse = action?.payload ?? {
    message: null,
    succeeded: false,
    isCompleted: false,
    data: null
  }
}

const saveUpdateUserRoleResponseInfo = (
  state: UserRolesStateModel,
  action: PayloadAction<UpdateDataCommonReducerModel<UserRoleModel>>
): any => {
  state.updateUserRoleResponse = action?.payload ?? {
    message: null,
    succeeded: false,
    isCompleted: false,
    data: null
  }
}

const resetAllUserRolesDataResultInfo = (state: UserRolesStateModel): any => {
  state.userRolesData = {
    message: null,
    succeeded: false,
    isCompleted: false,
    dataArray: state?.userRolesData?.dataArray ?? []
  }
}

const resetDeletedUserRoleResponseInfo = (state: UserRolesStateModel): any => {
  state.deletedUserRoleResponse = {
    message: null,
    succeeded: false,
    isCompleted: false,
    data: null
  }
}

const resetAddedUserRoleResponseInfo = (state: UserRolesStateModel): any => {
  state.addUserRoleResponse = {
    message: null,
    succeeded: false,
    isCompleted: false,
    data: null
  }
}

const resetUpdatedUserRoleResponseInfo = (state: UserRolesStateModel): any => {
  state.updateUserRoleResponse = {
    message: null,
    succeeded: false,
    isCompleted: false,
    data: null
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
    saveDeletedUserRoleResponse: saveDeletedUserRoleResponseInfo,
    saveAddUserRoleResponse: saveAddUserRoleResponseInfo,
    saveUpdateUserRoleResponse: saveUpdateUserRoleResponseInfo,
    resetAllUserRolesDataResult: resetAllUserRolesDataResultInfo,
    resetDeletedUserRoleResponse: resetDeletedUserRoleResponseInfo,
    resetAddedUserRoleResponse: resetAddedUserRoleResponseInfo,
    resetUpdatedUserRoleResponse: resetUpdatedUserRoleResponseInfo
  }
})

// ACTIONS
const {
  saveAllUserRolesData,
  saveDeletedUserRoleResponse,
  saveAddUserRoleResponse,
  saveUpdateUserRoleResponse,
  resetAllUserRolesDataResult,
  resetDeletedUserRoleResponse,
  resetAddedUserRoleResponse,
  resetUpdatedUserRoleResponse
} = userRolesSlice.actions

// SELECTOR
const selectAllUserRolesDataResult = (state: ReduxStateModel) => {
  return {
    message: state?.userRoles?.userRolesData?.message ?? null,
    succeeded: state?.userRoles?.userRolesData?.succeeded ?? false,
    isCompleted: state?.userRoles?.userRolesData?.isCompleted ?? false,
    dataArray: state?.userRoles?.userRolesData?.dataArray ?? []
  }
}

const selectDeletedUserRoleResponse = (state: ReduxStateModel) => {
  return {
    message: state?.userRoles?.deletedUserRoleResponse?.message ?? null,
    succeeded: state?.userRoles?.deletedUserRoleResponse?.succeeded ?? false,
    isCompleted: state?.userRoles?.deletedUserRoleResponse?.isCompleted ?? false,
    data: state?.userRoles?.deletedUserRoleResponse?.data ?? null
  }
}

const selectAddedUserRoleResponse = (state: ReduxStateModel) => {
  return {
    message: state?.userRoles?.addUserRoleResponse?.message ?? null,
    succeeded: state?.userRoles?.addUserRoleResponse?.succeeded ?? false,
    isCompleted: state?.userRoles?.addUserRoleResponse?.isCompleted ?? false,
    data: state?.userRoles?.addUserRoleResponse?.data ?? null
  }
}

const selectUpdatedUserRoleResponse = (state: ReduxStateModel) => {
  return {
    message: state?.userRoles?.updateUserRoleResponse?.message ?? null,
    succeeded: state?.userRoles?.updateUserRoleResponse?.succeeded ?? false,
    isCompleted: state?.userRoles?.updateUserRoleResponse?.isCompleted ?? false,
    data: state?.userRoles?.updateUserRoleResponse?.data ?? null
  }
}

const userRolesSliceReducer = userRolesSlice.reducer

export {
  userRolesSliceReducer,
  saveAllUserRolesData,
  saveDeletedUserRoleResponse,
  saveAddUserRoleResponse,
  saveUpdateUserRoleResponse,
  resetAllUserRolesDataResult,
  resetDeletedUserRoleResponse,
  resetAddedUserRoleResponse,
  resetUpdatedUserRoleResponse,
  selectAllUserRolesDataResult,
  selectDeletedUserRoleResponse,
  selectAddedUserRoleResponse,
  selectUpdatedUserRoleResponse,
  signOutAction
}
