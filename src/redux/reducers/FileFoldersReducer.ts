import { createSlice, createAction, PayloadAction } from '@reduxjs/toolkit'
import { CommonReducerDataArrayModel } from 'src/models/CommonModel'
import { FileFoldersModel } from 'src/models/FileFoldersModel'
import { FileFoldersStateModel, ReduxStateModel } from 'src/models/ReduxStateModel'

/* Signout Action */
const signOutAction = createAction('signout')

/* Initial State */
const initialState: FileFoldersStateModel = {
  fileFoldersData: {
    message: null,
    succeeded: false,
    isCompleted: false,
    dataArray: []
  }
}

const saveAllFileFoldersDataInfo = (
  state: FileFoldersStateModel,
  action: PayloadAction<CommonReducerDataArrayModel<FileFoldersModel[]>>
): any => {
  state.fileFoldersData = action?.payload ?? []
}

const resetAllFileFoldersDataResultInfo = (state: FileFoldersStateModel): any => {
  state.fileFoldersData = {
    message: null,
    succeeded: false,
    isCompleted: false,
    dataArray: state?.fileFoldersData?.dataArray ?? []
  }
}

const fileFoldersSlice: any = createSlice({
  name: 'fileFolders',
  initialState: initialState,
  extraReducers: builder => {
    builder.addCase(signOutAction, state => {
      return { ...state }
    })
  },
  reducers: {
    saveAllFileFoldersData: saveAllFileFoldersDataInfo,
    resetAllFileFoldersDataResult: resetAllFileFoldersDataResultInfo
  }
})

// ACTIONS
const { saveAllFileFoldersData, resetAllFileFoldersDataResult } = fileFoldersSlice.actions

// SELECTOR
const selectAllFileFoldersDataResult = (state: ReduxStateModel) => {
  return {
    message: state?.fileFolders?.fileFoldersData?.message ?? null,
    succeeded: state?.fileFolders?.fileFoldersData?.succeeded ?? false,
    isCompleted: state?.fileFolders?.fileFoldersData?.isCompleted ?? false,
    dataArray: state?.fileFolders?.fileFoldersData?.dataArray ?? [],
  }
}

const fileFoldersSliceReducer = fileFoldersSlice.reducer

export {
  fileFoldersSliceReducer,
  saveAllFileFoldersData,
  resetAllFileFoldersDataResult,
  selectAllFileFoldersDataResult,
  signOutAction
}
