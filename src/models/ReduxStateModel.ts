import { AdminMenuStatusesModel } from './AdminMenuStatusesModel'
import { AdminMenusModel } from './AdminMenusModel'
import { AdminSubmenusModel } from './AdminSubmenusModel'
import { CategoryModel } from './CategoryModel'
import {
  AddDataCommonReducerModel,
  CommonReducerDataArrayModel,
  DeleteDataCommonReducerModel,
  UpdateDataCommonReducerModel
} from './CommonModel'
import { FileFoldersModel } from './FileFoldersModel'
import { LoggedInUserModel } from './LoggedInUserModel'
import { ProductsModel } from './ProductsModel'
import { UIModel } from './UIModel'
import { UserModel } from './UserModel'
import { UserRoleModel } from './UserRoleModel'
import { UserStatusModel } from './UserStatusModel'

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
}

export interface AdminSubmenusStateModel {
  adminSubmenusData?: CommonReducerDataArrayModel<AdminSubmenusModel[]>
  deletedAdminSubmenuResponse?: DeleteDataCommonReducerModel<null>
  addAdminSubmenuResponse?: AddDataCommonReducerModel<AdminSubmenusModel>
}

export interface AdminMenuStatusesStateModel {
  adminMenuStatusesData?: CommonReducerDataArrayModel<AdminMenuStatusesModel[]>
  deletedAdminMenuStatusResponse?: DeleteDataCommonReducerModel<null>
  addAdminMenuStatusResponse?: AddDataCommonReducerModel<AdminMenuStatusesModel>
}

export interface ProductsStateModel {
  productsData?: CommonReducerDataArrayModel<ProductsModel[]>
  deletedProductResponse?: DeleteDataCommonReducerModel<null>
  addProductResponse?: AddDataCommonReducerModel<ProductsModel>
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
  _persist?: {
    version?: number
    rehydrated?: boolean
  }
}
