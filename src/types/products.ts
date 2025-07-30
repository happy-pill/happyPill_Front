export interface ProductItem {
  productId: string;
  categoryId: string;
  name: string;
  company: string;
  price: number;
  briefDescription: string;
  thumbnailUrl: string;
  best: boolean;
  categoryName: string;
}

export interface Product {
  hasNext: boolean;
  lastProductId: string | null;
  products: ProductItem[];
}

export interface ProductDetail {
  productId: string;
  name: string;
  company: string;
  price: number;
  briefDescription: string;
  description: string;
  thumbnailUrl: string;
  contentImageUrl: string;
  quantityDetails: string;
  usage: string;
  warningMessage: string;
}

export interface RelatedProduct {
  productId: string;
  thumbnail: string;
  price: number;
}
export interface CheckoutProduct {
  productId: string;
  name: string;
  price: number;
  period: number;
  thumbnailUrl: string;
}

export interface BestProduct extends ProductItem {
  best: boolean;
}
