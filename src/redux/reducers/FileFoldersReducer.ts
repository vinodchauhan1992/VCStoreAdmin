import { createSlice, createAction, PayloadAction } from '@reduxjs/toolkit'
import {
  AddDataCommonReducerModel,
  CommonReducerDataArrayModel,
  DeleteDataCommonReducerModel
} from 'src/models/CommonModel'
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
  },
  deletedFileFolderResponse: {
    message: null,
    succeeded: false,
    isCompleted: false,
    data: null
  },
  addFileFolderResponse: {
    message: null,
    succeeded: false,
    isCompleted: false,
    data: null
  }
}

const saveAllFileFoldersDataInfo = (
  state: FileFoldersStateModel,
  action: PayloadAction<CommonReducerDataArrayModel<FileFoldersModel[]>>
): any => {
  state.fileFoldersData = action?.payload ?? []
}

const saveDeletedFileFolderResponseInfo = (
  state: FileFoldersStateModel,
  action: PayloadAction<DeleteDataCommonReducerModel<null>>
): any => {
  state.deletedFileFolderResponse = action?.payload ?? {
    message: null,
    succeeded: false,
    isCompleted: false,
    data: null
  }
}

const saveAddFileFolderResponseInfo = (
  state: FileFoldersStateModel,
  action: PayloadAction<AddDataCommonReducerModel<FileFoldersModel>>
): any => {
  state.addFileFolderResponse = action?.payload ?? {
    message: null,
    succeeded: false,
    isCompleted: false,
    data: null
  }
}

const resetAllFileFoldersDataResultInfo = (state: FileFoldersStateModel): any => {
  state.fileFoldersData = {
    message: null,
    succeeded: false,
    isCompleted: false,
    dataArray: state?.fileFoldersData?.dataArray ?? []
  }
}

const resetDeletedFileFolderResponseInfo = (state: FileFoldersStateModel): any => {
  state.deletedFileFolderResponse = {
    message: null,
    succeeded: false,
    isCompleted: false,
    data: null
  }
}

const resetAddedFileFolderResponseInfo = (state: FileFoldersStateModel): any => {
  state.addFileFolderResponse = {
    message: null,
    succeeded: false,
    isCompleted: false,
    data: null
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
    resetAllFileFoldersDataResult: resetAllFileFoldersDataResultInfo,
    saveDeletedFileFolderResponse: saveDeletedFileFolderResponseInfo,
    saveAddFileFolderResponse: saveAddFileFolderResponseInfo,
    resetDeletedFileFolderResponse: resetDeletedFileFolderResponseInfo,
    resetAddedFileFolderResponse: resetAddedFileFolderResponseInfo
  }
})

// ACTIONS
const {
  saveAllFileFoldersData,
  saveDeletedFileFolderResponse,
  saveAddFileFolderResponse,
  resetAllFileFoldersDataResult,
  resetDeletedFileFolderResponse,
  resetAddedFileFolderResponse
} = fileFoldersSlice.actions

// SELECTOR
const selectAllFileFoldersDataResult = (state: ReduxStateModel) => {
  return {
    message: state?.fileFolders?.fileFoldersData?.message ?? null,
    succeeded: state?.fileFolders?.fileFoldersData?.succeeded ?? false,
    isCompleted: state?.fileFolders?.fileFoldersData?.isCompleted ?? false,
    dataArray: state?.fileFolders?.fileFoldersData?.dataArray ?? []
  }
}

const selectDeletedFileFolderResponse = (state: ReduxStateModel) => {
  return {
    message: state?.fileFolders?.deletedFileFolderResponse?.message ?? null,
    succeeded: state?.fileFolders?.deletedFileFolderResponse?.succeeded ?? false,
    isCompleted: state?.fileFolders?.deletedFileFolderResponse?.isCompleted ?? false,
    data: state?.fileFolders?.deletedFileFolderResponse?.data ?? null
  }
}

const selectAddedFileFolderResponse = (state: ReduxStateModel) => {
  return {
    message: state?.fileFolders?.addFileFolderResponse?.message ?? null,
    succeeded: state?.fileFolders?.addFileFolderResponse?.succeeded ?? false,
    isCompleted: state?.fileFolders?.addFileFolderResponse?.isCompleted ?? false,
    data: state?.fileFolders?.addFileFolderResponse?.data ?? null
  }
}

const fileFoldersSliceReducer = fileFoldersSlice.reducer

export {
  fileFoldersSliceReducer,
  saveAllFileFoldersData,
  saveDeletedFileFolderResponse,
  saveAddFileFolderResponse,
  resetAllFileFoldersDataResult,
  resetDeletedFileFolderResponse,
  resetAddedFileFolderResponse,
  selectAllFileFoldersDataResult,
  selectDeletedFileFolderResponse,
  selectAddedFileFolderResponse,
  signOutAction
}
