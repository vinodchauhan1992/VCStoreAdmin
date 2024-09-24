import { AdminMenuStatusesModel } from './AdminMenuStatusesModel'
import { AdminMenusModel } from './AdminMenusModel'
import { AdminSubmenusModel } from './AdminSubmenusModel'
import { BrandsModel } from './BrandsModel'
import { CategoryModel } from './CategoryModel'
import { CitiesModel } from './CitiesModel'
import { CountriesModel } from './CountriesModel'
import { FileFoldersModel } from './FileFoldersModel'
import { ProductsDataModel } from './ProductsModel'
import { StatesModel } from './StatesModel'
import { UserRoleModel } from './UserRoleModel'
import { UserStatusModel } from './UserStatusModel'

export interface VerticalCardPatchStatisticDataReturnProps {
  stats?: string
  trend?: 'positive' | 'negative'
  icon?: any
  color?: any
  trendNumber?: string
  title?: string
  subtitle?: string
  menuPath?: string | null
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
  allProductsDataArray: ProductsDataModel[] | []
  allBrandsDataResultDataArray: BrandsModel[] | []
  allCountriesDataResultDataArray: CountriesModel[] | []
  allStatesDataResultDataArray: StatesModel[] | []
  allCitiesDataResultDataArray: CitiesModel[] | []
}
