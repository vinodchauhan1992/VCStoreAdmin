import { UploadedFileModel } from './UploadedFileModel'

export interface BrandsModel {
  id?: string
  title?: string
  code?: string
  description?: string
  brandLogo?: UploadedFileModel | null
  isActive?: boolean
  dateAdded?: Date
  dateModified?: Date
}

export interface AddBrandRequestModel {
  title?: string
  description?: string
  isActive?: boolean
  file?: any
}
