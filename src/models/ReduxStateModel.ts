import { NavLink } from 'src/@core/layouts/types'
import { AdminMenuStatusesModel } from './AdminMenuStatusesModel'
import { AdminMenusMaxPriorityDataModel, AdminMenusModel } from './AdminMenusModel'
import { AdminSubmenusMaxPriorityDataModel, AdminSubmenusModel } from './AdminSubmenusModel'
import { CategoryModel } from './CategoryModel'
import {
  AddDataCommonReducerModel,
  CommonReducerDataArrayModel,
  CommonReducerByIdDataArrayModel,
  DeleteDataCommonReducerModel,
  UpdateDataCommonReducerModel,
  CommonReducerByIdDataObjectModel
} from './CommonModel'
import { FileFoldersModel } from './FileFoldersModel'
import { LoggedInUserModel } from './LoggedInUserModel'
import { ProductsDataModel } from './ProductsModel'
import { UIModel } from './UIModel'
import { UserModel } from './UserModel'
import { UserRoleModel } from './UserRoleModel'
import { UserStatusModel } from './UserStatusModel'
import { BrandsModel } from './BrandsModel'
import { CountriesModel } from './CountriesModel'
import { StatesModel } from './StatesModel'
import { CitiesModel } from './CitiesModel'

export interface LoggedInUserStateModel {
  loggedInUserData?: LoggedInUserModel | null
}

export interface UIStateModel {
  uiData: UIModel
}

export interface UserStateModel {
  usersData?: CommonReducerDataArrayModel<UserModel[]>
  deletedUserResponse?: DeleteDataCommonReducerModel<null>
  addUserResponse?: AddDataCommonReducerModel<UserModel>
}

export interface CategoriesStateModel {
  categoriesData?: CommonReducerDataArrayModel<CategoryModel[]>
  deletedCategoryResponse?: DeleteDataCommonReducerModel<null>
  addCategoryResponse?: AddDataCommonReducerModel<CategoryModel>
  updateCategoryResponse?: UpdateDataCommonReducerModel<CategoryModel>
}

export interface UserRolesStateModel {
  userRolesData?: CommonReducerDataArrayModel<UserRoleModel[]>
  deletedUserRoleResponse?: DeleteDataCommonReducerModel<null>
  addUserRoleResponse?: AddDataCommonReducerModel<UserRoleModel>
  updateUserRoleResponse?: UpdateDataCommonReducerModel<UserRoleModel>
}

export interface UserStatusesStateModel {
  userStatusesData?: CommonReducerDataArrayModel<UserStatusModel[]>
  deletedUserStatusResponse?: DeleteDataCommonReducerModel<null>
  addUserStatusResponse?: AddDataCommonReducerModel<UserStatusModel>
}

export interface FileFoldersStateModel {
  fileFoldersData?: CommonReducerDataArrayModel<FileFoldersModel[]>
  deletedFileFolderResponse?: DeleteDataCommonReducerModel<null>
  addFileFolderResponse?: AddDataCommonReducerModel<FileFoldersModel>
}

export interface AdminMenusStateModel {
  adminMenusData?: CommonReducerDataArrayModel<AdminMenusModel[]>
  deletedAdminMenuResponse?: DeleteDataCommonReducerModel<null>
  addAdminMenuResponse?: AddDataCommonReducerModel<AdminMenusModel>
  menusMaxPriorityData?: AdminMenusMaxPriorityDataModel
  selectedVerticalNavMenu?: NavLink | null
}

export interface AdminSubmenusStateModel {
  adminSubmenusData?: CommonReducerDataArrayModel<AdminSubmenusModel[]>
  deletedAdminSubmenuResponse?: DeleteDataCommonReducerModel<null>
  addAdminSubmenuResponse?: AddDataCommonReducerModel<AdminSubmenusModel>
  submenusMaxPriorityData?: AdminSubmenusMaxPriorityDataModel
  adminSubmenusDataByMenuId?: CommonReducerByIdDataArrayModel<AdminSubmenusModel[]>
}

export interface AdminMenuStatusesStateModel {
  adminMenuStatusesData?: CommonReducerDataArrayModel<AdminMenuStatusesModel[]>
  deletedAdminMenuStatusResponse?: DeleteDataCommonReducerModel<null>
  addAdminMenuStatusResponse?: AddDataCommonReducerModel<AdminMenuStatusesModel>
}

export interface ProductsStateModel {
  productsData?: CommonReducerDataArrayModel<ProductsDataModel[]>
  deletedProductResponse?: DeleteDataCommonReducerModel<null>
  addProductResponse?: AddDataCommonReducerModel<ProductsDataModel>
}

export interface BrandsStateModel {
  brandsData?: CommonReducerDataArrayModel<BrandsModel[]>
  deletedBrandResponse?: DeleteDataCommonReducerModel<null>
  addBrandResponse?: AddDataCommonReducerModel<BrandsModel>
  updateBrandResponse?: UpdateDataCommonReducerModel<BrandsModel>
}

export interface CountriesStateModel {
  countriesData?: CommonReducerDataArrayModel<CountriesModel[]>
  deletedCountryResponse?: DeleteDataCommonReducerModel<null>
  addCountryResponse?: AddDataCommonReducerModel<CountriesModel>
  updateCountryResponse?: UpdateDataCommonReducerModel<CountriesModel>
  countryDataByCountryId?: CommonReducerByIdDataObjectModel<CountriesModel>
}

export interface StatesStateModel {
  statesData?: CommonReducerDataArrayModel<StatesModel[]>
  deletedStateResponse?: DeleteDataCommonReducerModel<null>
  addStateResponse?: AddDataCommonReducerModel<StatesModel>
  updateStateResponse?: UpdateDataCommonReducerModel<StatesModel>
  statesDataByCountryId?: CommonReducerByIdDataArrayModel<StatesModel[]>
  stateDataByStateId?: CommonReducerByIdDataObjectModel<StatesModel>
}

export interface CitiesStateModel {
  citiesData?: CommonReducerDataArrayModel<CitiesModel[]>
  deletedCityResponse?: DeleteDataCommonReducerModel<null>
  addCityResponse?: AddDataCommonReducerModel<CitiesModel>
  updateCityResponse?: UpdateDataCommonReducerModel<CitiesModel>
  citiesDataByStateId?: CommonReducerByIdDataArrayModel<CitiesModel[]>
  cityDataByCityId?: CommonReducerByIdDataObjectModel<CitiesModel>
}

export interface ReduxStateModel {
  loggedInUser?: LoggedInUserStateModel | null
  ui: UIStateModel | null
  user: UserStateModel | null
  categories: CategoriesStateModel | null
  userRoles: UserRolesStateModel | null
  userStatuses: UserStatusesStateModel | null
  fileFolders: FileFoldersStateModel | null
  adminMenus: AdminMenusStateModel | null
  adminSubmenus: AdminSubmenusStateModel | null
  adminMenuStatuses: AdminMenuStatusesStateModel | null
  products: ProductsStateModel | null
  brands: BrandsStateModel | null
  countries: CountriesStateModel | null
  states: StatesStateModel | null
  cities: CitiesStateModel | null
  _persist?: {
    version?: number
    rehydrated?: boolean
  }
}
