import { redirect } from 'react-router-dom';

import { resetToken } from './authToken';
import { getCookie, setCookie } from './cookie';

import { RefreshInstance } from '@/apis/instance/refresh';
import { REFRESH_TOKEN } from '@/constants/auth';
import useLoginedStore from '@/stores/loginedStore';

/**
 * refreshToken를 통한 accessToken 토큰 재발급
 * accessToken | !refreshToken ? accessToken만 저장 : 둘 다 저장
 * refreshToken 없거나 error 반환 시 login 처리
 * @returns {accessToken, refreshToken}
 */
export const setRefreshToAccessToken = async () => {
  let newAccessToken;
  let newRefreshToken;

  const refreshToken = getCookie({ keyName: REFRESH_TOKEN });

  if (!refreshToken) {
    resetToken();
    redirect('login');
  }

  if (refreshToken) {
    try {
      const response = await RefreshInstance.post(
        '/auth/refresh',
        {},
        {
          headers: { Authorization: `Bearer ${refreshToken}` },
        },
      );

      newAccessToken = response.data.accessToken;
      newRefreshToken = response.data.refreshToken;

      if (newAccessToken) {
        useLoginedStore.getState().setLoadined(newAccessToken);
        if (newRefreshToken) {
          setCookie({ keyName: REFRESH_TOKEN, value: newRefreshToken, days: 7 });
        }
      }
    } catch {
      await RefreshInstance.post(
        '/auth/logout',
        {},
        {
          headers: { Authorization: `Bearer ${refreshToken}` },
        },
      );
      resetToken();
      redirect('/login');
    }
  }

  return { accessToken: newAccessToken, refreshToken: newRefreshToken };
};
