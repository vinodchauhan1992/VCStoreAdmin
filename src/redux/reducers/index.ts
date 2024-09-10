import { combineReducers } from '@reduxjs/toolkit'
import * as LoginReducer from './LoginReducer'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { store } from '../../reduxConfig/reduxStore/store'

const rootReducer = combineReducers({
  loggedInUser: LoginReducer.loggedInUserSliceReducer
})

export { rootReducer, LoginReducer }

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof rootReducer>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
