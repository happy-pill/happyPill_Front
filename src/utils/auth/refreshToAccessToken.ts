import { getCookie, setCookie } from '../cookie';
import { logoutAndRedirect } from './logoutAndRedirect';

import authAPI from '@/apis/auth/auth.api';
import { REFRESH_TOKEN } from '@/constants/auth';

/**
 * refreshToken를 통한 accessToken 토큰 재발급
 * @returns {accessToken, refreshToken}
 */
export const setRefreshToAccessToken = async () => {
  let newAccessToken;
  let newRefreshToken;

  const refreshToken = getCookie({ keyName: REFRESH_TOKEN });

  if (!refreshToken) {
    await logoutAndRedirect();
    return { accessToken: null, refreshToken: null };
  }

  if (refreshToken) {
    try {
      const response = await authAPI.postRefreshToken(refreshToken);

      newAccessToken = response.accessToken;
      newRefreshToken = response.refreshToken;

      if (!newAccessToken) {
        throw new Error('accessToken이 없습니다.');
      }
      if (newRefreshToken) {
        setCookie({ keyName: REFRESH_TOKEN, value: newRefreshToken, days: 7 });
      }
    } catch {
      await logoutAndRedirect();
    }
  }

  return { accessToken: newAccessToken, refreshToken: newRefreshToken };
};
