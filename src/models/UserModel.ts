import { AddressModel } from './AddressModel'
import { ImageDataModel } from './ImageDataModel'
import { UserRoleModel } from './UserRoleModel'
import { UserStatusModel } from './UserStatusModel'

export interface NameModel {
  firstname: string
  lastname: string
}

export interface UserModel {
  id: string
  email: string
  username: string
  password: string
  name: NameModel
  address: AddressModel
  phone: string
  userRoleID: string
  userRole: string
  userStatusID: string
  userStatus: string
  imageData: ImageDataModel
  userType: string
  dateOfBirth: Date
  dateAdded: Date
  dateModified: Date
}

export interface AddUserRequestModel {
  email: string
  username: string
  password: string
  firstname: string
  lastname: string
  address: string
  city: string
  state: string
  zipcode: string
  phone: string
  userRoleID: string
  userRole: string
  userStatusID: string
  userStatus: string
  dateOfBirth: string
  userType: string
  file: any
}

export interface CommonValidationInfoParamsModel {
  values?: AddUserRequestModel | null
}

export interface PasswordValidationInfoParamsModel {
  values?: AddUserRequestModel | null
  confirmPassword?: string | null
}

export interface UserStatusValidationInfoParamsModel {
  selectedUserStatus?: UserStatusModel | null
}

export interface UserRoleValidationInfoParamsModel {
  selectedUserRole?: UserRoleModel | null
}

export interface AddNewUserValidationInfoParamsModel {
  selectedUserStatus?: UserStatusModel | null
  selectedUserRole?: UserRoleModel | null
  values?: AddUserRequestModel | null
  confirmPassword?: string | null
  imageFileData?: any
  defaultImage?: string | null
}

export interface UserImageValidationInfoParamsModel {
  imageFileData?: any
  defaultImage?: string | null
}
