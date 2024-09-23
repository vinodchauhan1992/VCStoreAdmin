export interface CountriesModel {
  id: string
  title: string
  code: string
  isDeleteable: boolean
  isAdminDeleteable: boolean
  dateAdded?: Date
  dateModified?: Date
}

export interface AddCountryRequestModel {
  title: string
  code: string
  isDeleteable: boolean
  isAdminDeleteable: boolean
}

export interface UpdateCountryRequestModel {
  id: string
  title: string
  code: string
  isDeleteable: boolean
  isAdminDeleteable: boolean
  dateAdded: Date
}
