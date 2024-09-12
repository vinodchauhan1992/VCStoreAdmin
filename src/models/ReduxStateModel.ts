import { AdminMenuStatusesModel } from './AdminMenuStatusesModel'
import { AdminMenusModel } from './AdminMenusModel'
import { AdminSubmenusModel } from './AdminSubmenusModel'
import { CategoryModel } from './CategoryModel'
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
  usersData?: UserModel[] | []
}

export interface CategoriesStateModel {
  categoriesData?: CategoryModel[] | []
}

export interface UserRolesStateModel {
  userRolesData?: UserRoleModel[] | []
}

export interface UserStatusesStateModel {
  userStatusesData?: UserStatusModel[] | []
}

export interface FileFoldersStateModel {
  fileFoldersData?: FileFoldersModel[] | []
}

export interface AdminMenusStateModel {
  adminMenusData?: AdminMenusModel[] | []
}

export interface AdminSubmenusStateModel {
  adminSubmenusData?: AdminSubmenusModel[] | []
}

export interface AdminMenuStatusesStateModel {
  adminMenuStatusesData?: AdminMenuStatusesModel[] | []
}

export interface ProductsStateModel {
  productsData?: ProductsModel[] | []
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
