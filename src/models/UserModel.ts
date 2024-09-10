import { AddressModel } from './AddressModel'
import { ImageDataModel } from './ImageDataModel'

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
  dateOfBirth: Date
  dateAdded: Date
  dateModified: Date
}
