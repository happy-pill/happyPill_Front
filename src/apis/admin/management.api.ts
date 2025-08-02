import instance from '../instance/main';

import type {
  AdminProductList,
  AdminUserDetail,
  AdminUserList,
  AdminUserSubscribeList,
} from '@/types/admin';

/**
 * GET 구독 상품 리스트
 * @param page
 * @param size
 * @returns 구독 상품 리스트
 */
const getUserSubscribeList = async (
  page?: number,
  size?: number,
): Promise<AdminUserSubscribeList> => {
  const response = await instance.get(
    `/api/admin/users/subscriptions?page=${page || 1}&size=${size || 8}`,
  );
  return response.data;
};

/**
 * GET 회원 리스트
 * @param page
 * @param size
 * @returns 회원 리스트
 */
const getUserList = async (page?: number, size?: number): Promise<AdminUserList> => {
  const response = await instance.get(`/api/admin/users?page=${page || 1}&size=${size || 8}`);
  return response.data;
};

/**
 * GET 특정 유저 정보 조회
 * @param userId
 * @returns 유저 정보
 */
const getUserDetail = async (userId: string): Promise<AdminUserDetail> => {
  const response = await instance.get(`/api/admin/users/${userId}`);
  return response.data;
};

/**
 * PATCH 유저 정보 수정
 * @param userId
 * @returns 유저 정보 수정
 */
const patchUserDetail = async ({
  userId,
  nickName,
  notifyEmail,
}: {
  userId: string;
  nickName?: string;
  notifyEmail?: string;
}): Promise<AdminUserDetail> => {
  const response = await instance.patch(`/api/admin/users/${userId}`, {
    nickName,
    notifyEmail,
  });
  return response.data;
};

/**
 * PATCH 유저 비활성화
 * @param userId
 * @returns 유저 비활성화
 */
const patchUserDeactivate = async (userId: string): Promise<AdminUserDetail> => {
  const response = await instance.patch(`/api/admin/users/${userId}/deactivate`);
  return response.data;
};

/**
 * PATCH 유저 활성화
 * @param userId
 * @returns 유저 활성화
 */
const patchUserActivate = async (userId: string): Promise<AdminUserDetail> => {
  const response = await instance.patch(`/api/admin/users/${userId}/activate`);
  return response.data;
};

/**
 * GET 상품 리스트
 * @param page
 * @param size
 * @param categories
 * @returns 상품 리스트
 */
const getProductList = async (
  page?: number,
  size?: number,
  categories?: number,
): Promise<AdminProductList> => {
  const isCategories = categories ? `?categories=${categories}&` : '?';

  const response = await instance.get(
    `/api/admin/products${isCategories}page=${page || 1}&size=${size || 8}`,
  );
  return response.data;
};

const adminManagementAPI = {
  getUserSubscribeList,
  getUserList,
  getUserDetail,
  patchUserDetail,
  patchUserDeactivate,
  patchUserActivate,
  getProductList,
};

export default adminManagementAPI;
