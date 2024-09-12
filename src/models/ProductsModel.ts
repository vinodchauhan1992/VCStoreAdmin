export interface ProductsModel {
  id: string
  title: string
  price: number
  description: string
  image: string
  categoryTitle: string
  categoryCode: string
  categoryID: string
  rating: {
    rate: number
    count: number
  }
  dateAdded: Date
  dateModified: Date
  isActive: boolean
  status: number
}
