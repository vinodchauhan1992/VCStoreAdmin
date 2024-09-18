export interface AdminSubmenusModel {
  id?: string
  submenuTitle: string
  priority: number
  adminMenuID: string
  adminMenuTitle: string
  statusID: string
  status: string
  isDeleteable: boolean
  isAdminDeleteable: boolean
  description: string
  dateAdded?: Date
  dateModified?: Date
}

export interface AdminSubmenusMaxPriorityDataModel {
  maxPriorityValue: number
}
