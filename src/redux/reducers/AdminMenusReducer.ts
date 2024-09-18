import { createSlice, createAction, PayloadAction } from '@reduxjs/toolkit'
import { NavLink } from 'src/@core/layouts/types'
import { AdminMenusMaxPriorityDataModel, AdminMenusModel } from 'src/models/AdminMenusModel'
import {
  AddDataCommonReducerModel,
  CommonReducerDataArrayModel,
  DeleteDataCommonReducerModel
} from 'src/models/CommonModel'
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
  },
  deletedAdminMenuResponse: {
    message: null,
    succeeded: false,
    isCompleted: false,
    data: null
  },
  addAdminMenuResponse: {
    message: null,
    succeeded: false,
    isCompleted: false,
    data: null
  },
  menusMaxPriorityData: {
    maxPriorityValue: 0
  },
  selectedVerticalNavMenu: null
}

const saveAllAdminMenusDataInfo = (
  state: AdminMenusStateModel,
  action: PayloadAction<CommonReducerDataArrayModel<AdminMenusModel[]>>
): any => {
  state.adminMenusData = action?.payload ?? []
}

const saveDeletedAdminMenuResponseInfo = (
  state: AdminMenusStateModel,
  action: PayloadAction<DeleteDataCommonReducerModel<null>>
): any => {
  state.deletedAdminMenuResponse = action?.payload ?? {
    message: null,
    succeeded: false,
    isCompleted: false,
    data: null
  }
}

const saveAddAdminMenuResponseInfo = (
  state: AdminMenusStateModel,
  action: PayloadAction<AddDataCommonReducerModel<AdminMenusModel>>
): any => {
  state.addAdminMenuResponse = action?.payload ?? {
    message: null,
    succeeded: false,
    isCompleted: false,
    data: null
  }
}

const saveMenusMaxPriorityDataInfo = (
  state: AdminMenusStateModel,
  action: PayloadAction<AdminMenusMaxPriorityDataModel>
): any => {
  state.menusMaxPriorityData = action?.payload ?? {
    maxPriorityValue: 0
  }
}

const saveSelectedVerticalNavMenuDataInfo = (state: AdminMenusStateModel, action: PayloadAction<NavLink>): any => {
  state.selectedVerticalNavMenu = action?.payload
}

const resetAllAdminMenusDataResultInfo = (state: AdminMenusStateModel): any => {
  state.adminMenusData = {
    message: null,
    succeeded: false,
    isCompleted: false,
    dataArray: state?.adminMenusData?.dataArray ?? []
  }
}

const resetDeletedAdminMenuResponseInfo = (state: AdminMenusStateModel): any => {
  state.deletedAdminMenuResponse = {
    message: null,
    succeeded: false,
    isCompleted: false,
    data: null
  }
}

const resetAddedAdminMenuResponseInfo = (state: AdminMenusStateModel): any => {
  state.addAdminMenuResponse = {
    message: null,
    succeeded: false,
    isCompleted: false,
    data: null
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
    saveDeletedAdminMenuResponse: saveDeletedAdminMenuResponseInfo,
    saveAddAdminMenuResponse: saveAddAdminMenuResponseInfo,
    saveMenusMaxPriorityData: saveMenusMaxPriorityDataInfo,
    saveSelectedVerticalNavMenuData: saveSelectedVerticalNavMenuDataInfo,
    resetAllAdminMenusDataResult: resetAllAdminMenusDataResultInfo,
    resetDeletedAdminMenuResponse: resetDeletedAdminMenuResponseInfo,
    resetAddedAdminMenuResponse: resetAddedAdminMenuResponseInfo
  }
})

// ACTIONS
const {
  saveAllAdminMenusData,
  saveDeletedAdminMenuResponse,
  saveAddAdminMenuResponse,
  saveMenusMaxPriorityData,
  saveSelectedVerticalNavMenuData,
  resetAllAdminMenusDataResult,
  resetDeletedAdminMenuResponse,
  resetAddedAdminMenuResponse
} = adminMenusSlice.actions

// SELECTOR
const selectAllAdminMenusDataResult = (state: ReduxStateModel) => {
  return {
    message: state?.adminMenus?.adminMenusData?.message ?? null,
    succeeded: state?.adminMenus?.adminMenusData?.succeeded ?? false,
    isCompleted: state?.adminMenus?.adminMenusData?.isCompleted ?? false,
    dataArray: state?.adminMenus?.adminMenusData?.dataArray ?? []
  }
}

const selectDeletedAdminMenuResponse = (state: ReduxStateModel) => {
  return {
    message: state?.adminMenus?.deletedAdminMenuResponse?.message ?? null,
    succeeded: state?.adminMenus?.deletedAdminMenuResponse?.succeeded ?? false,
    isCompleted: state?.adminMenus?.deletedAdminMenuResponse?.isCompleted ?? false,
    data: state?.adminMenus?.deletedAdminMenuResponse?.data ?? null
  }
}

const selectAddedAdminMenuResponse = (state: ReduxStateModel) => {
  return {
    message: state?.adminMenus?.addAdminMenuResponse?.message ?? null,
    succeeded: state?.adminMenus?.addAdminMenuResponse?.succeeded ?? false,
    isCompleted: state?.adminMenus?.addAdminMenuResponse?.isCompleted ?? false,
    data: state?.adminMenus?.addAdminMenuResponse?.data ?? null
  }
}

const selectMenusMaxPriorityDataValue = (state: ReduxStateModel) => {
  return state?.adminMenus?.menusMaxPriorityData?.maxPriorityValue
    ? state.adminMenus.menusMaxPriorityData.maxPriorityValue + 1
    : 1
}

const selectSelectedVerticalNavMenu = (state: ReduxStateModel) => {
  return state?.adminMenus?.selectedVerticalNavMenu ?? null
}

const selectSelectedVerticalNavMenuExtraData = (state: ReduxStateModel) => {
  return state?.adminMenus?.selectedVerticalNavMenu?.extraData ?? null
}

const selectSelectedVerticalNavMenuIcon = (state: ReduxStateModel) => {
  return state?.adminMenus?.selectedVerticalNavMenu?.icon ?? null
}

const selectSelectedVerticalNavMenuTitle = (state: ReduxStateModel) => {
  return state?.adminMenus?.selectedVerticalNavMenu?.title ?? null
}

const selectSelectedVerticalNavMenuPath = (state: ReduxStateModel) => {
  return state?.adminMenus?.selectedVerticalNavMenu?.path ?? null
}

const adminMenusSliceReducer = adminMenusSlice.reducer

export {
  adminMenusSliceReducer,
  saveAllAdminMenusData,
  saveDeletedAdminMenuResponse,
  saveAddAdminMenuResponse,
  saveMenusMaxPriorityData,
  saveSelectedVerticalNavMenuData,
  resetAllAdminMenusDataResult,
  resetDeletedAdminMenuResponse,
  resetAddedAdminMenuResponse,
  selectAllAdminMenusDataResult,
  selectDeletedAdminMenuResponse,
  selectAddedAdminMenuResponse,
  selectMenusMaxPriorityDataValue,
  selectSelectedVerticalNavMenu,
  selectSelectedVerticalNavMenuExtraData,
  selectSelectedVerticalNavMenuIcon,
  selectSelectedVerticalNavMenuTitle,
  selectSelectedVerticalNavMenuPath,
  signOutAction
}
