import instance from '../instance/main';

import type { CreateOrderRequest } from '@/types/order';

const createOrder = async (orderRequest: CreateOrderRequest) => {
  const response = await instance.post('/api/order', orderRequest);
  return response.data;
};

const OrderAPI = {
  createOrder,
};

export default OrderAPI;
