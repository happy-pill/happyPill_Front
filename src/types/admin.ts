import type { Provider } from './common';

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
  nickname: string;
  loginEmail: string;
  provider: Provider;
  createdAt: string;
  deletedAt: string;
  isDeleted: boolean;
}

export interface AdminUserList {
  contents: AdminUser[];
  last: boolean;
  page: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
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
