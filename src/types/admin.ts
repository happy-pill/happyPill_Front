/** 구독 상품 관리 */
export interface AdminUserSubscribe {
  productName: string;
  notifyEmail: string;
  subscriptionId: string;
  nextDeliveryDate: string;
}

export interface AdminUserSubscribeList {
  contents: AdminUserSubscribe[];
  last: boolean;
  page: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
}

/** 유저 관리 */
export interface AdminUser {
  userId: string;
  nickname: string;
  loginEmail: string;
  provider: 'GOOGLE' | 'KAKAO';
  createdAt: string;
  deletedAt: string;
  deleted: boolean;
}

export interface AdminUserList {
  contents: AdminUser[];
  last: boolean;
  page: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
}

export interface AdminUserDetail {
  userId: string;
  loginEmail: string;
  nickname: string;
  notifyEmail: string;
  provider: string;
  createdAt: string;
  deletedAt: string;
  isDeleted: boolean;
}

/** 상품 등록 */
export interface AdminProduct {
  productId: string;
  categoryId: string;
  productName: string;
  company: string;
  price: number;
  stock: number;
  briefDescription: string;
  thumbnailUrl: string;
  isAvailable: boolean;
}

export interface AdminProductList {
  contents: AdminProduct[];
  last: boolean;
  page: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
}
export interface AdminProductInfo {
  language: string; //'KO' | 'EN';
  name: string;
  briefDescription: string;
  description: string;
  contentImageUrl: string;
  company: string;
  quantityDetails: string;
  usage: string;
  warningMessage: string;
}

// 표시
export interface AdminProductDetail {
  categoryId: number;
  thumbnailUrl: string;
  isAvailable: boolean;
  stock: number;
  price: number;
  productInfo: AdminProductInfo[];
}

// 변경/등록
export interface AdminProductDetailEdit {
  categoryId: number;
  thumbnailUrl: string;
  isAvailable: boolean;
  stock: number;
  price: number;
  productInfos: AdminProductInfo[];
}

export interface AdminProductPriseHistorys {
  date: string;
  price: number;
  isUsed: boolean;
}
export interface AdminProductPriseHistory {
  contents: AdminProductPriseHistorys[];
  page: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
}
