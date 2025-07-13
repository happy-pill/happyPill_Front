import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/constants/auth';
import useAuthStore from '@/stores/auth';
import { setCookie } from '@/utils/cookie';

const OauthRedirect = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const accessToken = searchParams.get(ACCESS_TOKEN);
  const refreshToken = searchParams.get(REFRESH_TOKEN);

  useEffect(() => {
    if (accessToken && refreshToken) {
      useAuthStore.getState().setAccessToken(accessToken);
      setCookie({ keyName: REFRESH_TOKEN, value: refreshToken, days: 7 });
      navigate('/');
    }
  }, [accessToken, navigate, refreshToken]);

  return <div>로그인 중</div>;
};

export default OauthRedirect;
