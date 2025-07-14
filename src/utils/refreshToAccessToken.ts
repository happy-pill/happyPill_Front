import { redirect } from 'react-router-dom';

import { resetToken } from './authToken';
import { getCookie, setCookie } from './cookie';

import authAPI from '@/apis/auth/auth.api';
import { REFRESH_TOKEN } from '@/constants/auth';
import useLoginedStore from '@/stores/loginedStore';

/**
 * refreshToken를 통한 accessToken 토큰 재발급
 * @returns {accessToken, refreshToken}
 */
export const setRefreshToAccessToken = async () => {
  let newAccessToken;
  let newRefreshToken;

  const refreshToken = getCookie({ keyName: REFRESH_TOKEN });

  if (!refreshToken) {
    resetToken();
    redirect('/login');
  }

  if (refreshToken) {
    try {
      const response = await authAPI.postRefreshToken(refreshToken);

      newAccessToken = response.accessToken;
      newRefreshToken = response.refreshToken;

      if (newAccessToken) {
        useLoginedStore.getState().setLoadined(newAccessToken);
        if (newRefreshToken) {
          setCookie({ keyName: REFRESH_TOKEN, value: newRefreshToken, days: 7 });
        }
      }
    } catch {
      await authAPI.postLogout(refreshToken);
      resetToken();
      redirect('/login');
    }
  }

  return { accessToken: newAccessToken, refreshToken: newRefreshToken };
};
