import instance from '../instance/main';

/**
 * POST 리프레쉬 토큰을 활용한 accessToken 재발급
 * refreshToken을 Bearer 방식으로 전달
 * refreshToken === null ? accessToken만 저장 : 교체
 * refreshToken은 만료 됬는데 세션이 남아 있다면, 1회 교체 가능
 * @returns {accessToken, refreshToken}
 */
const postRefreshToken = async (): Promise<{
  accessToken: string;
  refreshToken: string | null;
}> => {
  const response = await instance.post(`/auth/refresh`);
  return response.data;
};

/**
 * POST 로그아웃
 * refresh token을 Bearer 방식으로 전달
 * @returns
 */
const postLogout = async () => {
  const response = await instance.post(`/auth/logout`);
  return response;
};

const authAPI = {
  postRefreshToken,
  postLogout,
};

export default authAPI;
