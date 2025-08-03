import { useMutation, useQuery } from '@tanstack/react-query';

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
 * GET getUserDetail
 * @returns 특정 유저 조회
 */
export const useGetUserDetail = (userId: string) => {
  return useQuery({
    queryKey: queryKey.admin.management.user.detail(userId),
    queryFn: async () => await adminManagementAPI.getUserDetail(userId),
    retry: false,
  });
};

/**
 * PATCH patchUserDetail
 * @returns 특정 유저 정보 수정
 */
export const usePatchUserDetail = (userId: string) => {
  return useMutation({
    mutationKey: queryKey.admin.management.user.detail(userId),
    mutationFn: ({
      userId,
      nickName,
      notifyEmail,
    }: {
      userId: string;
      nickName?: string;
      notifyEmail?: string;
    }) => adminManagementAPI.patchUserDetail({ userId, nickName, notifyEmail }),
    onSuccess: (data) => {
      return data;
    },
  });
};

/**
 * PATCH patchUserDeactivate
 * @returns 특정 유저 비활성화
 */
export const usePatchUserDeactivate = (userId: string) => {
  return useMutation({
    mutationKey: queryKey.admin.management.user.detail(userId),
    mutationFn: (userId: string) => adminManagementAPI.patchUserDeactivate(userId),
    onSuccess: (data) => {
      return data;
    },
  });
};

/**
 * PATCH patchUserActivate
 * @returns 특정 유저 활성화
 */
export const usePatchUserActivate = (userId: string) => {
  return useMutation({
    mutationKey: queryKey.admin.management.user.detail(userId),
    mutationFn: (userId: string) => adminManagementAPI.patchUserActivate(userId),
    onSuccess: (data) => {
      return data;
    },
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
