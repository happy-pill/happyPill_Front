import { useMutation } from '@tanstack/react-query';

import type { CreateOrderRequest } from '@/types/order';

import OrderAPI from '@/apis/member/order.api';
import { queryKey } from '@/constants/queryKey';

export const useCreateOrder = () => {
  return useMutation({
    mutationKey: queryKey.member.order.create,
    mutationFn: (orderRequest: CreateOrderRequest) => OrderAPI.createOrder(orderRequest),
  });
};
