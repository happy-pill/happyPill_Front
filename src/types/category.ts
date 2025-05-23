import { Product } from './products'

export interface Category {
  categoryId: number
  name: string
  thumbnailUrl: string
  description: string
  bannerImgUrl: string
}

export interface CategoryBlock {
  category: Category
  products: Product[]
  lastProductId: number | null
  hasNext: boolean
}
