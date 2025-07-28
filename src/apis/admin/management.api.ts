import instance from '../instance/main';

import type { AdminProductList, AdminUserList, AdminUserSubscribeList } from '@/types/admin';

const getUserSubscribeList = async (
  page?: number,
  size?: number,
): Promise<AdminUserSubscribeList> => {
  const response = await instance.get(
    `/api/admin/users/subscriptions?page=${page || 1}&size=${size || 8}`,
  );
  return response.data;
};

const getUserList = async (page?: number, size?: number): Promise<AdminUserList> => {
  const response = await instance.get(`/api/admin/users?page=${page || 1}&size=${size || 8}`);
  return response.data;
};

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
  getProductList,
};

export default adminManagementAPI;
