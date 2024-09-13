import { createSlice, createAction, PayloadAction } from '@reduxjs/toolkit'
import { AdminMenusModel } from 'src/models/AdminMenusModel'
import { CommonReducerDataArrayModel } from 'src/models/CommonModel'
import { AdminMenusStateModel, ReduxStateModel } from 'src/models/ReduxStateModel'

/* Signout Action */
const signOutAction = createAction('signout')

/* Initial State */
const initialState: AdminMenusStateModel = {
  adminMenusData: {
    message: null,
    succeeded: false,
    isCompleted: false,
    dataArray: []
  }
}

const saveAllAdminMenusDataInfo = (
  state: AdminMenusStateModel,
  action: PayloadAction<CommonReducerDataArrayModel<AdminMenusModel[]>>
): any => {
  state.adminMenusData = action?.payload ?? []
}

const resetAllAdminMenusDataResultInfo = (state: AdminMenusStateModel): any => {
  state.adminMenusData = {
    message: null,
    succeeded: false,
    isCompleted: false,
    dataArray: state?.adminMenusData?.dataArray ?? []
  }
}

const adminMenusSlice: any = createSlice({
  name: 'adminMenus',
  initialState: initialState,
  extraReducers: builder => {
    builder.addCase(signOutAction, state => {
      return { ...state }
    })
  },
  reducers: {
    saveAllAdminMenusData: saveAllAdminMenusDataInfo,
    resetAllAdminMenusDataResult: resetAllAdminMenusDataResultInfo
  }
})

// ACTIONS
const { saveAllAdminMenusData, resetAllAdminMenusDataResult } = adminMenusSlice.actions

// SELECTOR
const selectAllAdminMenusData = (state: ReduxStateModel) => {
  return state?.adminMenus?.adminMenusData?.dataArray ?? []
}

const selectAllAdminMenusDataResult = (state: ReduxStateModel) => {
  return {
    message: state?.adminMenus?.adminMenusData?.message ?? null,
    succeeded: state?.adminMenus?.adminMenusData?.succeeded ?? false,
    isCompleted: state?.adminMenus?.adminMenusData?.isCompleted ?? false,
    dataArray: state?.adminMenus?.adminMenusData?.dataArray ?? [],
  }
}

const adminMenusSliceReducer = adminMenusSlice.reducer

export {
  adminMenusSliceReducer,
  saveAllAdminMenusData,
  resetAllAdminMenusDataResult,
  selectAllAdminMenusData,
  selectAllAdminMenusDataResult,
  signOutAction
}
