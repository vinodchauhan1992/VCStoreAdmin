import { UploadedFileModel } from './UploadedFileModel'

export interface CategoryModel {
  id?: string
  title?: string
  code?: string
  description?: string
  imageData?: UploadedFileModel | null
  isActive?: boolean
  dateAdded?: Date
  dateModified?: Date
}

export interface AddCategoryRequestModel {
  title?: string
  description?: string
  isActive?: boolean
  file?: any
}
