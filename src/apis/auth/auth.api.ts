import { RefreshInstance } from '../instance/refresh';

/**
 * 토큰 재발급
 * @param refreshToken
 * @returns { accessToken, refreshToken }
 */
const postRefreshToken = async (
  refreshToken: string,
): Promise<{ accessToken: string; refreshToken: string | null }> => {
  const response = await RefreshInstance.post(
    '/auth/refresh',
    {},
    {
      headers: { Authorization: `Bearer ${refreshToken}` },
    },
  );

  return { accessToken: response.data.accessToken, refreshToken: response.data.refreshToken };
};

/**
 * 로그아웃
 * @param refreshToken
 */
const postLogout = async (refreshToken: string) => {
  await RefreshInstance.post(
    '/auth/logout',
    {},
    {
      headers: { Authorization: `Bearer ${refreshToken}` },
    },
  );
};

const authAPI = {
  postRefreshToken,
  postLogout,
};

export default authAPI;
