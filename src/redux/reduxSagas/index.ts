import { all, fork } from 'redux-saga/effects'
import { watchLoginUser } from './LoginSaga'
import { watchAddUser, watchDeleteUser, watchFetchAllUsers } from './UserSaga'
import { watchAddCategory, watchDeleteCategory, watchFetchAllCategories, watchUpdateCategory } from './CategoriesSaga'
import { watchAddUserRole, watchDeleteUserRole, watchFetchAllUserRoles, watchUpdateUserRole } from './UserRolesSaga'
import { watchAddUserStatus, watchDeleteUserStatus, watchFetchAllUserStatuses } from './UserStatusesSaga'
import { watchAddFileFolder, watchDeleteFileFolder, watchFetchAllFileFolders } from './FileFoldersSaga'
import {
  watchAddAdminMenu,
  watchDeleteAdminMenu,
  watchFetchAllAdminMenus,
  watchFetchMenusMaxPriority
} from './AdminMenusSaga'
import {
  watchAddAdminSubmenu,
  watchDeleteAdminSubmenu,
  watchFetchAllAdminSubmenus,
  watchFetchSubmenusByMenuId,
  watchFetchSubmenusMaxPriority
} from './AdminSubmenusSaga'
import {
  watchAddAdminMenuStatus,
  watchDeleteAdminMenuStatus,
  watchFetchAllAdminMenuStatuses
} from './AdminMenuStatusesSaga'
import { watchAddProduct, watchDeleteProduct, watchFetchAllProducts } from './ProductsSaga'
import { watchAddBrand, watchDeleteBrand, watchFetchAllBrands, watchUpdateBrand } from './BrandsSaga'
import {
  watchAddCountry,
  watchDeleteCountry,
  watchFetchAllCountries,
  watchFetchCountryByCountryId,
  watchUpdateCountry
} from './CountriesSaga'
import {
  watchAddState,
  watchDeleteState,
  watchFetchAllStates,
  watchFetchStatesByCountryId,
  watchUpdateState,
  watchFetchStateByStateId
} from './StatesSaga'
import {
  watchAddCity,
  watchDeleteCity,
  watchFetchAllCities,
  watchFetchCitiesByStateId,
  watchUpdateCity,
  watchFetchCityByCityId
} from './CitiesSaga'
import { watchAddUDM, watchDeleteUDM, watchFetchAllUDMS, watchFetchAllUDMSRegisteredPriorities, watchFetchUDMByPriority, watchFetchUDMByUDMId, watchFetchUDMSMaxPriority, watchUpdateUDM } from './UserDropdownMenusSaga'

export default function* rootSaga(): any {
  return yield all([
    fork(watchLoginUser),
    fork(watchFetchAllUsers),
    fork(watchDeleteUser),
    fork(watchAddUser),
    fork(watchFetchAllCategories),
    fork(watchDeleteCategory),
    fork(watchAddCategory),
    fork(watchUpdateCategory),
    fork(watchFetchAllUserRoles),
    fork(watchDeleteUserRole),
    fork(watchAddUserRole),
    fork(watchFetchAllUserStatuses),
    fork(watchDeleteUserStatus),
    fork(watchAddUserStatus),
    fork(watchFetchAllFileFolders),
    fork(watchDeleteFileFolder),
    fork(watchAddFileFolder),
    fork(watchFetchAllAdminMenus),
    fork(watchDeleteAdminMenu),
    fork(watchAddAdminMenu),
    fork(watchFetchAllAdminSubmenus),
    fork(watchDeleteAdminSubmenu),
    fork(watchAddAdminSubmenu),
    fork(watchFetchAllAdminMenuStatuses),
    fork(watchDeleteAdminMenuStatus),
    fork(watchAddAdminMenuStatus),
    fork(watchFetchAllProducts),
    fork(watchDeleteProduct),
    fork(watchAddProduct),
    fork(watchFetchMenusMaxPriority),
    fork(watchFetchSubmenusMaxPriority),
    fork(watchFetchSubmenusByMenuId),
    fork(watchFetchAllBrands),
    fork(watchAddBrand),
    fork(watchDeleteBrand),
    fork(watchUpdateBrand),
    fork(watchUpdateUserRole),
    fork(watchFetchAllCountries),
    fork(watchAddCountry),
    fork(watchDeleteCountry),
    fork(watchUpdateCountry),
    fork(watchFetchAllStates),
    fork(watchAddState),
    fork(watchDeleteState),
    fork(watchUpdateState),
    fork(watchFetchStatesByCountryId),
    fork(watchFetchAllCities),
    fork(watchAddCity),
    fork(watchDeleteCity),
    fork(watchUpdateCity),
    fork(watchFetchCitiesByStateId),
    fork(watchFetchCountryByCountryId),
    fork(watchFetchStateByStateId),
    fork(watchFetchCityByCityId),
    fork(watchFetchAllUDMS),
    fork(watchDeleteUDM),
    fork(watchAddUDM),
    fork(watchUpdateUDM),
    fork(watchFetchUDMSMaxPriority),
    fork(watchFetchUDMByUDMId),
    fork(watchFetchUDMByPriority),
    fork(watchFetchAllUDMSRegisteredPriorities)
  ])
}
