import { all, fork } from 'redux-saga/effects'
import { watchLoginUser } from './LoginSaga'
import { watchAddUser, watchDeleteUser, watchFetchAllUsers } from './UserSaga'
import { watchAddCategory, watchDeleteCategory, watchFetchAllCategories, watchUpdateCategory } from './CategoriesSaga'
import { watchAddUserRole, watchDeleteUserRole, watchFetchAllUserRoles } from './UserRolesSaga'
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
    fork(watchUpdateBrand)
  ])
}
