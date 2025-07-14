import { deleteCookie, setCookie } from './cookie';

import instance from '@/apis/instance/main';
import { REFRESH_TOKEN } from '@/constants/auth';
import useLoginedStore from '@/stores/loginedStore';

/**
 * accessToken header에 바로 추가
 * isLogined true 변경
 * refreshToken 쿠키에 저장
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

  useLoginedStore.getState().setLoadined(accessToken);
  setCookie({ keyName: REFRESH_TOKEN, value: refreshToken, days: 7 });
};

/**
 * isLogined false 변경
 * refreshToken 쿠키에서 제거
 */
export const resetToken = () => {
  useLoginedStore.getState().setLoadined(null);
  deleteCookie({ keyName: REFRESH_TOKEN });
};
