/**
 * 상품 데이터 페칭
 * @param  categoryId 카테고리 아이디
 * @param  lastProductId 마지막으로 페칭된 상품의 아이디
 * @param  size 페이지 당 항목 수
 * @returns products: Product[], lastProductId: number, hasNext: boolean
 */

import instance from '../instance/main';

import type { MemberInfo } from '@/types/member';

const getUserInfo = async (): Promise<MemberInfo> => {
  const response = await instance.get('/api/user/me');

  return response.data;
};

// TODO: 로그인 이후 store에 유저 id이 들어가면 해당 store에서 상태를 가져와서 해당 함수 인자로 넣어 사용하면 될 것 같습니다
const postUserNickname = async (nickname: string): Promise<MemberInfo> => {
  const response = await instance.patch('/api/user/me', { nickname });

  return response.data;
};

const userAPI = {
  getUserInfo,
  postUserNickname,
};

export default userAPI;
