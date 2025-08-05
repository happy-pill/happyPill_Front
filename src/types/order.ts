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
