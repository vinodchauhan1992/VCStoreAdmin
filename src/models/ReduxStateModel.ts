import { LoggedInUserModel } from './LoggedInUserModel'

export interface LoggedInUserStateModel {
  loggedInUserData?: LoggedInUserModel | null
}

export interface ReduxStateModel {
  loggedInUser?: LoggedInUserStateModel | null
  _persist?: {
    version?: number
    rehydrated?: boolean
  }
}
