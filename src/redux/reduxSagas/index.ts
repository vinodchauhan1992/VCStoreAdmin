import { all, fork } from 'redux-saga/effects'
import { watchLoginUser } from './LoginSaga'
import { watchFetchAllUsers } from './UserSaga'

export default function* rootSaga(): any {
  return yield all([fork(watchLoginUser), fork(watchFetchAllUsers)])
}
