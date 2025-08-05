import type { PAYMENT_METHODS } from '@/constants/locale/purchase';

export interface OrderLineCreateRequest {
  productId: string;
  month: number;
  startDate: string;
}

export interface CreateOrderRequest {
  recipentName: string;
  recipentMobile: string;
  orderLineCreateRequests: OrderLineCreateRequest[];
}

export type PayMethod = (typeof PAYMENT_METHODS)[keyof typeof PAYMENT_METHODS];
