import { useQuery } from '@tanstack/react-query';

import adminManagementAPI from '@/apis/admin/management.api';
import { queryKey } from '@/constants/queryKey';

/**
 * GET getUserSubscribeList
 * @returns 구독상품 리스트 조회
 */
export const useGetUserSubscriptionsList = (page?: number, size?: number) => {
  return useQuery({
    queryKey: queryKey.admin.management.subscribe.list(page, size),
    queryFn: async () => await adminManagementAPI.getUserSubscribeList(page, size),
    retry: false,
  });
};

/**
 * GET getUserList
 * @returns 회원 리스트 조회
 */
export const useGetUserList = (page?: number, size?: number) => {
  return useQuery({
    queryKey: queryKey.admin.management.user.list(page, size),
    queryFn: async () => await adminManagementAPI.getUserList(page, size),
    retry: false,
  });
};

/**
 * GET getProductList
 * @returns 등록 상품 리스트 조회
 */
export const useGetProductList = (page?: number, size?: number, categories?: number) => {
  return useQuery({
    queryKey: queryKey.admin.management.product.list(page, size, categories),
    queryFn: async () => await adminManagementAPI.getProductList(page, size, categories),
    retry: false,
  });
};
