import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { ACCESS_TOKEN } from '@/constants/auth';
import useAuthStore from '@/stores/auth';

// TODO refreshToken 저장 방식 백엔드 팀과 논의 필요
const OauthRedirect = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const accessToken = searchParams.get(ACCESS_TOKEN);
  // const refreshToken = searchParams.get('refreshToken');

  useEffect(() => {
    if (accessToken) {
      useAuthStore.getState().setAccessToken(accessToken);
      navigate('/');
    }
  }, [accessToken]);

  return <div>로그인 중</div>;
};

export default OauthRedirect;
