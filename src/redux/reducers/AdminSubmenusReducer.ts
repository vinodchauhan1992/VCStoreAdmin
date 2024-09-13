import { createSlice, createAction, PayloadAction } from '@reduxjs/toolkit'
import { AdminSubmenusModel } from 'src/models/AdminSubmenusModel'
import { CommonReducerDataArrayModel } from 'src/models/CommonModel'
import { AdminSubmenusStateModel, ReduxStateModel } from 'src/models/ReduxStateModel'

/* Signout Action */
const signOutAction = createAction('signout')

/* Initial State */
const initialState: AdminSubmenusStateModel = {
  adminSubmenusData: {
    message: null,
    succeeded: false,
    isCompleted: false,
    dataArray: []
  }
}

const saveAllAdminSubmenusDataInfo = (
  state: AdminSubmenusStateModel,
  action: PayloadAction<CommonReducerDataArrayModel<AdminSubmenusModel[]>>
): any => {
  state.adminSubmenusData = action?.payload ?? []
}

const resetAllAdminSubmenusDataResultInfo = (state: AdminSubmenusStateModel): any => {
  state.adminSubmenusData = {
    message: null,
    succeeded: false,
    isCompleted: false,
    dataArray: state?.adminSubmenusData?.dataArray ?? []
  }
}

const adminSubmenusSlice: any = createSlice({
  name: 'adminSubmenus',
  initialState: initialState,
  extraReducers: builder => {
    builder.addCase(signOutAction, state => {
      return { ...state }
    })
  },
  reducers: {
    saveAllAdminSubmenusData: saveAllAdminSubmenusDataInfo,
    resetAllAdminSubmenusDataResult: resetAllAdminSubmenusDataResultInfo
  }
})

// ACTIONS
const { saveAllAdminSubmenusData, resetAllAdminSubmenusDataResult } = adminSubmenusSlice.actions

// SELECTOR
const selectAllAdminSubmenusData = (state: ReduxStateModel) => {
  return state?.adminSubmenus?.adminSubmenusData?.dataArray ?? []
}

const selectAllAdminSubmenusDataResult = (state: ReduxStateModel) => {
  return {
    message: state?.adminSubmenus?.adminSubmenusData?.message ?? null,
    succeeded: state?.adminSubmenus?.adminSubmenusData?.succeeded ?? false,
    isCompleted: state?.adminSubmenus?.adminSubmenusData?.isCompleted ?? false,
    dataArray: state?.adminSubmenus?.adminSubmenusData?.dataArray ?? [],
  }
}

const adminSubmenusSliceReducer = adminSubmenusSlice.reducer

export {
  adminSubmenusSliceReducer,
  saveAllAdminSubmenusData,
  resetAllAdminSubmenusDataResult,
  selectAllAdminSubmenusData,
  selectAllAdminSubmenusDataResult,
  signOutAction
}
