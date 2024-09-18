import { BrandsModel } from './BrandsModel'
import { UploadedFileModel } from './UploadedFileModel'

export interface ProductsModel {
  id: string
  title: string
  description: string
  categoryDetails: {
    categoryTitle: string
    categoryCode: string
    categoryID: string
  }
  brandDetails: {
    brandTitle: string
    brandCode: string
    brandID: string
  }
  isActive: boolean
  rating: {
    rate: number
    count: number
  }
  priceDetails: {
    purchasePrice: number
    sellingPrice: number
    profitMargin: number
    maxDiscountPercentage: number
    maxDiscountValue: number
    profitAfterMaxDiscount: number
    isProfit: boolean
  }
  imageData: UploadedFileModel | null
  dateAdded: Date
  dateModified: Date
}

export interface AddProductModel {
  title: string
  description: string
  categoryID: string
  isActive: boolean
  purchasePrice: number
  sellingPrice: number
  maxDiscountPercentage: number
  imageData: UploadedFileModel | null
  brandID: string
}

export interface ProductsDataModel {
  productData: ProductsModel
  brandDetails: BrandsModel
}
