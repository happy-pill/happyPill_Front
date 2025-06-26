export interface Product {
  productId: string;
  categoryId: number;
  name: string;
  company: string;
  price: number;
  briefDescription: string;
  thumbnailUrl: string;
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
