import type { Product } from './products'

export type CartItem = Omit<Product, 'categoryId' | 'company'> & { period: number }

export interface SelectedItem {
  label: React.ReactNode
  value: string
}
