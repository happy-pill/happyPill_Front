import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/constants/auth';
import { setToken } from '@/utils/auth/authToken';

const OauthRedirect = () => {
  const [searchParams] = useSearchParams();
  const navigation = useNavigate();

  useEffect(() => {
    const accessToken = searchParams.get(ACCESS_TOKEN);
    const refreshToken = searchParams.get(REFRESH_TOKEN);

    if (accessToken && refreshToken) {
      setToken({ accessToken, refreshToken });
      navigation('/');
    }
  }, [navigation, searchParams]);

  return <div>로그인 중</div>;
};

export default OauthRedirect;
