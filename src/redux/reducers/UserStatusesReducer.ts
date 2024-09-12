import { createSlice, createAction, PayloadAction } from '@reduxjs/toolkit'
import { ReduxStateModel, UserStatusesStateModel } from 'src/models/ReduxStateModel'
import { UserStatusModel } from 'src/models/UserStatusModel'

/* Signout Action */
const signOutAction = createAction('signout')

/* Initial State */
const initialState: UserStatusesStateModel = {
  userStatusesData: []
}

const saveAllUserStatusesDataInfo = (state: UserStatusesStateModel, action: PayloadAction<UserStatusModel[]>): any => {
  state.userStatusesData = action?.payload ?? []
}

const userStatusesSlice: any = createSlice({
  name: 'userStatuses',
  initialState: initialState,
  extraReducers: builder => {
    builder.addCase(signOutAction, state => {
      return { ...state }
    })
  },
  reducers: { saveAllUserStatusesData: saveAllUserStatusesDataInfo }
})

// ACTIONS
const { saveAllUserStatusesData } = userStatusesSlice.actions

// SELECTOR
const selectAllUserStatusesData = (state: ReduxStateModel) => {
  return state?.userStatuses?.userStatusesData ?? []
}

const userStatusesSliceReducer = userStatusesSlice.reducer

export { userStatusesSliceReducer, saveAllUserStatusesData, selectAllUserStatusesData, signOutAction }
