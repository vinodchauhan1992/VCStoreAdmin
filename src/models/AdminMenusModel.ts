export interface AdminMenusModel {
  id?: string
  menuTitle: string
  menuPath: string
  priority: number
  adminMenuStatusID: string
  adminMenuStatus: string
  isDeleteable: boolean
  isAdminDeleteable: boolean
  description: string
  dateAdded?: Date
  dateModified?: Date
}

export interface AdminMenusMaxPriorityDataModel {
  maxPriorityValue: number
}
