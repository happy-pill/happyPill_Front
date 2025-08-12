import instance from '../instance/main';

import type {
  AdminProductList,
  AdminProductDetail,
  AdminUserDetail,
  AdminUserList,
  AdminUserSubscribeList,
  AdminProductPriseHistory,
  AdminProductDetailEdit,
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

/**
 * 상품 상세 정보
 * @param productId
 * @returns AdminProductDetail
 */
const getProductDetail = async (productId: string): Promise<AdminProductDetail> => {
  const response = await instance.get(`/api/admin/products/${productId}`);
  return response.data;
};

/**
 * 상품 등록
 * @param registerData
 * @returns
 */
const postProductRegister = async (registerData: AdminProductDetailEdit) => {
  const response = await instance.post(`/api/admin/products`, { ...registerData });
  return response.data;
};

/**
 * 상품 정보 수정
 * @param productId
 * @param editData
 * @returns AdminProductDetail
 */
const patchProductEdit = async (
  productId: string,
  editData: AdminProductDetailEdit,
): Promise<AdminProductDetailEdit> => {
  const response = await instance.patch(`/api/admin/products/${productId}`, { ...editData });
  return response.data;
};

/**
 * 상품 금액 조회
 * @param productId
 * @param page
 * @param size
 * @returns AdminProductPriseHistory
 */
const getProductPriceHistory = async (
  productId: string,
  page?: number,
  size?: number,
): Promise<AdminProductPriseHistory> => {
  const response = await instance.get(
    `/api/admin/products/${productId}/price-history?page=${page || 1}&size=${size || 5}`,
  );
  return response.data;
};

/**
 * 상품 삭제
 * @param productId
 */
const deleteProduct = async (productId: string) => {
  await instance.delete(`/api/admin/products/${productId}`);
};

const adminManagementAPI = {
  // subscribe
  getUserSubscribeList,
  // user
  getUserList,
  getUserDetail,
  patchUserDetail,
  patchUserDeactivate,
  patchUserActivate,
  // product
  getProductList,
  getProductDetail,
  getProductPriceHistory,
  postProductRegister,
  patchProductEdit,
  deleteProduct,
};

export default adminManagementAPI;
