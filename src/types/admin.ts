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

export interface AdminUser {
  userId: string;
  nickName: string;
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

// FIXME nickname/ nickName 데이터 반환 필드 대소문자 다름! (추후 수정 필요)
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

export interface AdminProduct {
  productId: string;
  categoryId: string;
  name: string;
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
