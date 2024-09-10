import { all, fork } from 'redux-saga/effects'
import { watchLoginUser } from './LoginSaga'

export default function* rootSaga(): any {
  return yield all([fork(watchLoginUser)])
}
