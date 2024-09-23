export interface StatesModel {
  id: string
  countryID: string
  title: string
  code: string
  isDeleteable: boolean
  isAdminDeleteable: boolean
  dateAdded?: Date
  dateModified?: Date
}

export interface AddStateRequestModel {
  title: string
  countryID: string
  isDeleteable: boolean
  isAdminDeleteable: boolean
}

export interface UpdateStateRequestModel {
  id: string
  title: string
  countryID: string
  isDeleteable: boolean
  isAdminDeleteable: boolean
  dateAdded: Date
}
