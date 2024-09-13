export interface AdminMenusModel {
  id?: string
  menuTitle: string
  adminMenuStatusID: string
  adminMenuStatus: string
  isDeleteable: boolean
  isAdminDeleteable: boolean
  description: string
  dateAdded?: Date
  dateModified?: Date
}
