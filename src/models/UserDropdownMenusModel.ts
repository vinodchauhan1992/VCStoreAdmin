export interface UDMSModel {
  id?: string
  title: string
  menuPath: string
  priority: number
  isActive: boolean
  isDeleteable: boolean
  isAdminDeleteable: boolean
  dateAdded?: Date
  dateModified?: Date
}

export interface UDMSMaxPriorityDataModel {
  maxPriorityValue: number
}

export interface AddUDMRequestModel {
  title: string
  menuPath: string
  priority: number
  isActive: boolean
  isDeleteable: boolean
  isAdminDeleteable: boolean
}

export interface UpdateUDMRequestModel {
  id: string
  title: string
  menuPath: string
  priority: number
  isActive: boolean
  isDeleteable: boolean
  isAdminDeleteable: boolean
  dateAdded: Date
}
