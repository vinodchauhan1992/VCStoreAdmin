import { UploadedFileModel } from './UploadedFileModel'

export interface BrandsModel {
  id?: string
  title?: string
  code?: string
  description?: string
  brandLogo?: UploadedFileModel | null
  dateAdded?: Date
  dateModified?: Date
}

export interface AddBrandRequestModel {
  title?: string
  description?: string
  file?: any
}
