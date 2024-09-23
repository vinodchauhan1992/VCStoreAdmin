export interface CitiesModel {
  id: string
  countryID: string
  stateID: string
  title: string
  code: string
  isDeleteable: boolean
  isAdminDeleteable: boolean
  dateAdded?: Date
  dateModified?: Date
}

export interface AddCityRequestModel {
  title: string
  countryID: string
  stateID: string
  isDeleteable: boolean
  isAdminDeleteable: boolean
}

export interface UpdateCityRequestModel {
  id: string
  title: string
  countryID: string
  stateID: string
  isDeleteable: boolean
  isAdminDeleteable: boolean
  dateAdded: Date
}
