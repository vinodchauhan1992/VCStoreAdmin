import { all, fork } from 'redux-saga/effects'
import { watchLoginUser } from './LoginSaga'
import { watchFetchAllUsers } from './UserSaga'
import { watchFetchAllCategories } from './CategoriesSaga'
import { watchAddUserRole, watchDeleteUserRole, watchFetchAllUserRoles } from './UserRolesSaga'
import { watchFetchAllUserStatuses } from './UserStatusesSaga'
import { watchFetchAllFileFolders } from './FileFoldersSaga'
import { watchFetchAllAdminMenus } from './AdminMenusSaga'
import { watchFetchAllAdminSubmenus } from './AdminSubmenusSaga'
import { watchFetchAllAdminMenuStatuses } from './AdminMenuStatusesSaga'
import { watchFetchAllProducts } from './ProductsSaga'

export default function* rootSaga(): any {
  return yield all([
    fork(watchLoginUser),
    fork(watchFetchAllUsers),
    fork(watchFetchAllCategories),
    fork(watchFetchAllUserRoles),
    fork(watchFetchAllUserStatuses),
    fork(watchFetchAllFileFolders),
    fork(watchFetchAllAdminMenus),
    fork(watchFetchAllAdminSubmenus),
    fork(watchFetchAllAdminMenuStatuses),
    fork(watchFetchAllProducts),
    fork(watchDeleteUserRole),
    fork(watchAddUserRole)
  ])
}
