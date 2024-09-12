import { createSlice, createAction, PayloadAction } from '@reduxjs/toolkit'
import { FileFoldersModel } from 'src/models/FileFoldersModel'
import { FileFoldersStateModel, ReduxStateModel } from 'src/models/ReduxStateModel'

/* Signout Action */
const signOutAction = createAction('signout')

/* Initial State */
const initialState: FileFoldersStateModel = {
  fileFoldersData: []
}

const saveAllFileFoldersDataInfo = (state: FileFoldersStateModel, action: PayloadAction<FileFoldersModel[]>): any => {
  state.fileFoldersData = action?.payload ?? []
}

const fileFoldersSlice: any = createSlice({
  name: 'fileFolders',
  initialState: initialState,
  extraReducers: builder => {
    builder.addCase(signOutAction, state => {
      return { ...state }
    })
  },
  reducers: { saveAllFileFoldersData: saveAllFileFoldersDataInfo }
})

// ACTIONS
const { saveAllFileFoldersData } = fileFoldersSlice.actions

// SELECTOR
const selectAllFileFoldersData = (state: ReduxStateModel) => {
  return state?.fileFolders?.fileFoldersData ?? []
}

const fileFoldersSliceReducer = fileFoldersSlice.reducer

export { fileFoldersSliceReducer, saveAllFileFoldersData, selectAllFileFoldersData, signOutAction }
