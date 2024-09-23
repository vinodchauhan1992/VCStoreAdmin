import { AdminMenuStatusesModel } from './AdminMenuStatusesModel'
import { AdminMenusModel } from './AdminMenusModel'
import { AdminSubmenusModel } from './AdminSubmenusModel'
import { CountriesModel } from './CountriesModel'
import { FileFoldersModel } from './FileFoldersModel'
import { UserRoleModel } from './UserRoleModel'
import { UserStatusModel } from './UserStatusModel'

export type Order = 'asc' | 'desc'

export type KeysOfProps =
  | keyof AdminMenusModel
  | keyof AdminSubmenusModel
  | keyof AdminMenuStatusesModel
  | keyof UserRoleModel
  | keyof UserStatusModel
  | keyof FileFoldersModel
  | keyof CountriesModel

export type DataArrayProps =
  | AdminMenusModel[]
  | AdminSubmenusModel[]
  | AdminMenuStatusesModel[]
  | UserRoleModel[]
  | UserStatusModel[]
  | FileFoldersModel[]
  | CountriesModel[]

export type CommonEnhancedTableDataObjectModel =
  | AdminMenusModel
  | AdminSubmenusModel
  | AdminMenuStatusesModel
  | UserRoleModel
  | UserStatusModel
  | FileFoldersModel
  | CountriesModel

export interface HeadCellModel {
  disablePadding: boolean
  id: KeysOfProps
  label: string
  numeric: boolean
}
