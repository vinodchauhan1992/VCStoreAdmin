export interface AdminSubmenusModel {
  id: string
  submenuTitle: string
  adminMenuID: string
  adminMenuTitle: string
  statusID: string
  status: string
  isDeleteable: boolean
  isAdminDeleteable: boolean
  description: string
  dateAdded: Date
  dateModified: Date
}
