import { combineReducers } from '@reduxjs/toolkit'
import * as LoginReducer from './LoginReducer'
import * as UIReducer from './UIReducer'
import * as UserReducer from './UserReducer'
import * as CategoriesReducer from './CategoriesReducer'
import * as UserRolesReducer from './UserRolesReducer'
import * as UserStatusesReducer from './UserStatusesReducer'
import * as FileFoldersReducer from './FileFoldersReducer'
import * as AdminMenusReducer from './AdminMenusReducer'
import * as AdminSubmenusReducer from './AdminSubmenusReducer'
import * as AdminMenuStatusesReducer from './AdminMenuStatusesReducer'
import * as ProductsReducer from './ProductsReducer'
import * as BrandsReducer from './BrandsReducer'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { store } from '../../reduxConfig/reduxStore/store'

const rootReducer = combineReducers({
  loggedInUser: LoginReducer.loggedInUserSliceReducer,
  ui: UIReducer.uiSliceReducer,
  user: UserReducer.userSliceReducer,
  categories: CategoriesReducer.categoriesSliceReducer,
  userRoles: UserRolesReducer.userRolesSliceReducer,
  userStatuses: UserStatusesReducer.userStatusesSliceReducer,
  fileFolders: FileFoldersReducer.fileFoldersSliceReducer,
  adminMenus: AdminMenusReducer.adminMenusSliceReducer,
  adminSubmenus: AdminSubmenusReducer.adminSubmenusSliceReducer,
  adminMenuStatuses: AdminMenuStatusesReducer.adminMenuStatusesSliceReducer,
  products: ProductsReducer.productsSliceReducer,
  brands: BrandsReducer.brandsSliceReducer
})

export {
  rootReducer,
  LoginReducer,
  UIReducer,
  UserReducer,
  CategoriesReducer,
  UserRolesReducer,
  UserStatusesReducer,
  FileFoldersReducer,
  AdminMenusReducer,
  AdminSubmenusReducer,
  AdminMenuStatusesReducer,
  ProductsReducer,
  BrandsReducer
}

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof rootReducer>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
