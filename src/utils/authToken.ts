import { deleteCookie, getCookie, setCookie } from './cookie';

import instance from '@/apis/instance/main';
import { REFRESH_TOKEN } from '@/constants/auth';
import useLoginedStore from '@/stores/loginedStore';

/**
 * 쿠키에 저장된 refrshToken 있는지 확인
 * @returns boolean
 */
export const checkToken = () => {
  return getCookie({ keyName: REFRESH_TOKEN }) ? true : false;
};

/**
 * token 세팅
 * isLogined는 메인페이지에서 처리
 * @param {accessToken, refreshToken}
 */
export const setToken = ({
  accessToken,
  refreshToken,
}: {
  accessToken: string;
  refreshToken: string;
}) => {
  if (!accessToken || !refreshToken) return;
  instance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
  setCookie({ keyName: REFRESH_TOKEN, value: refreshToken, days: 7 });
};

/**
 * token 초기화
 */
export const resetToken = () => {
  useLoginedStore.getState().setLoadined(null);
  deleteCookie({ keyName: REFRESH_TOKEN });
};
