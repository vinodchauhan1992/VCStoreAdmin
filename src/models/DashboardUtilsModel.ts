import { AdminMenuStatusesModel } from "./AdminMenuStatusesModel"
import { AdminMenusModel } from "./AdminMenusModel"
import { AdminSubmenusModel } from "./AdminSubmenusModel"
import { CategoryModel } from "./CategoryModel"
import { FileFoldersModel } from "./FileFoldersModel"
import { ProductsModel } from "./ProductsModel"
import { UserRoleModel } from "./UserRoleModel"
import { UserStatusModel } from "./UserStatusModel"

export interface VerticalCardPatchStatisticDataReturnProps {
  stats?: string
  icon?: any
  color?: any
  trendNumber?: string
  title?: string
  subtitle?: string
}

export interface VerticalCardStatisticDataReturnProps {
  patchData: VerticalCardPatchStatisticDataReturnProps[] | []
}

export interface VerticalCardStatisticParamsDataProps {
  allCategoriesDataArray: CategoryModel[] | []
  allUserRolesDataArray: UserRoleModel[] | []
  allUserStatusesDataArray: UserStatusModel[] | []
  allFileFoldersDataArray: FileFoldersModel[] | []
  allAdminMenusDataArray: AdminMenusModel[] | []
  allAdminSubmenusDataArray: AdminSubmenusModel[] | []
  allAdminMenuStatusesDataArray: AdminMenuStatusesModel[] | []
  allProductsDataArray: ProductsModel[] | []
}
