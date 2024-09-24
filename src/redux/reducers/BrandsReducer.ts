import { createSlice, createAction, PayloadAction } from '@reduxjs/toolkit'
import { BrandsModel } from 'src/models/BrandsModel'
import {
  AddDataCommonReducerModel,
  CommonReducerDataArrayModel,
  DeleteDataCommonReducerModel,
  UpdateDataCommonReducerModel
} from 'src/models/CommonModel'
import { BrandsStateModel, ReduxStateModel } from 'src/models/ReduxStateModel'

/* Signout Action */
const signOutAction = createAction('signout')

/* Initial State */
const initialState: BrandsStateModel = {
  brandsData: {
    message: null,
    succeeded: false,
    isCompleted: false,
    dataArray: []
  },
  deletedBrandResponse: {
    message: null,
    succeeded: false,
    isCompleted: false,
    data: null
  },
  addBrandResponse: {
    message: null,
    succeeded: false,
    isCompleted: false,
    data: null
  },
  updateBrandResponse: {
    message: null,
    succeeded: false,
    isCompleted: false,
    data: null
  }
}

const saveAllBrandsDataInfo = (
  state: BrandsStateModel,
  action: PayloadAction<CommonReducerDataArrayModel<BrandsModel[]>>
): any => {
  state.brandsData = action?.payload ?? {
    message: null,
    succeeded: false,
    isCompleted: false,
    dataArray: []
  }
}

const saveDeletedBrandResponseInfo = (
  state: BrandsStateModel,
  action: PayloadAction<DeleteDataCommonReducerModel<null>>
): any => {
  state.deletedBrandResponse = action?.payload ?? {
    message: null,
    succeeded: false,
    isCompleted: false,
    data: null
  }
}

const saveAddBrandResponseInfo = (
  state: BrandsStateModel,
  action: PayloadAction<AddDataCommonReducerModel<BrandsModel>>
): any => {
  state.addBrandResponse = action?.payload ?? {
    message: null,
    succeeded: false,
    isCompleted: false,
    data: null
  }
}

const saveUpdateBrandResponseInfo = (
  state: BrandsStateModel,
  action: PayloadAction<UpdateDataCommonReducerModel<BrandsModel>>
): any => {
  state.updateBrandResponse = action?.payload ?? {
    message: null,
    succeeded: false,
    isCompleted: false,
    data: null
  }
}

const resetAllBrandsDataResultInfo = (state: BrandsStateModel): any => {
  state.brandsData = {
    message: null,
    succeeded: false,
    isCompleted: false,
    dataArray: state?.brandsData?.dataArray ?? []
  }
}

const resetDeletedBrandResponseInfo = (state: BrandsStateModel): any => {
  state.deletedBrandResponse = {
    message: null,
    succeeded: false,
    isCompleted: false,
    data: null
  }
}

const resetAddedBrandResponseInfo = (state: BrandsStateModel): any => {
  state.addBrandResponse = {
    message: null,
    succeeded: false,
    isCompleted: false,
    data: null
  }
}

const resetUpdatedBrandResponseInfo = (state: BrandsStateModel): any => {
  state.updateBrandResponse = {
    message: null,
    succeeded: false,
    isCompleted: false,
    data: null
  }
}

const brandsSlice: any = createSlice({
  name: 'brands',
  initialState: initialState,
  extraReducers: builder => {
    builder.addCase(signOutAction, state => {
      return { ...state }
    })
  },
  reducers: {
    saveAllBrandsData: saveAllBrandsDataInfo,
    saveDeletedBrandResponse: saveDeletedBrandResponseInfo,
    saveAddBrandResponse: saveAddBrandResponseInfo,
    saveUpdateBrandResponse: saveUpdateBrandResponseInfo,
    resetAllBrandsDataResult: resetAllBrandsDataResultInfo,
    resetDeletedBrandResponse: resetDeletedBrandResponseInfo,
    resetAddedBrandResponse: resetAddedBrandResponseInfo,
    resetUpdatedBrandResponse: resetUpdatedBrandResponseInfo
  }
})

// ACTIONS
const {
  saveAllBrandsData,
  saveDeletedBrandResponse,
  saveAddBrandResponse,
  saveUpdateBrandResponse,
  resetAllBrandsDataResult,
  resetDeletedBrandResponse,
  resetAddedBrandResponse,
  resetUpdatedBrandResponse
} = brandsSlice.actions

// SELECTOR
const selectAllBrandsDataResult = (state: ReduxStateModel) => {
  return {
    message: state?.brands?.brandsData?.message ?? null,
    succeeded: state?.brands?.brandsData?.succeeded ?? false,
    isCompleted: state?.brands?.brandsData?.isCompleted ?? false,
    dataArray: state?.brands?.brandsData?.dataArray ?? []
  }
}

const selectDeletedBrandResponse = (state: ReduxStateModel) => {
  return {
    message: state?.brands?.deletedBrandResponse?.message ?? null,
    succeeded: state?.brands?.deletedBrandResponse?.succeeded ?? false,
    isCompleted: state?.brands?.deletedBrandResponse?.isCompleted ?? false,
    data: state?.brands?.deletedBrandResponse?.data ?? null
  }
}

const selectAddedBrandResponse = (state: ReduxStateModel) => {
  return {
    message: state?.brands?.addBrandResponse?.message ?? null,
    succeeded: state?.brands?.addBrandResponse?.succeeded ?? false,
    isCompleted: state?.brands?.addBrandResponse?.isCompleted ?? false,
    data: state?.brands?.addBrandResponse?.data ?? null
  }
}

const selectUpdatedBrandResponse = (state: ReduxStateModel) => {
  return {
    message: state?.brands?.updateBrandResponse?.message ?? null,
    succeeded: state?.brands?.updateBrandResponse?.succeeded ?? false,
    isCompleted: state?.brands?.updateBrandResponse?.isCompleted ?? false,
    data: state?.brands?.updateBrandResponse?.data ?? null
  }
}

const brandsSliceReducer = brandsSlice.reducer

export {
  brandsSliceReducer,
  saveAllBrandsData,
  saveDeletedBrandResponse,
  saveAddBrandResponse,
  saveUpdateBrandResponse,
  resetAllBrandsDataResult,
  resetDeletedBrandResponse,
  resetAddedBrandResponse,
  resetUpdatedBrandResponse,
  selectAllBrandsDataResult,
  selectDeletedBrandResponse,
  selectAddedBrandResponse,
  selectUpdatedBrandResponse,
  signOutAction
}
