import axios, { type AxiosInstance } from 'axios';

import useAuthStore from '@/stores/auth';

// 인스턴스 생성
export const instance: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_HOST,
  withCredentials: true,
});

// 요청 타임아웃
instance.defaults.timeout = 2500;

// TODO : request header Authorization 설정
// TODO : 로그인 만료 처리 interceptors

/**
 * 리프레쉬 토큰으로 액세스 토큰 재발급 가능한 api 필요
 * 리프레쉬 토큰
 */
// 요청 인터셉터 추가하기
instance.interceptors.request.use(
  function (config) {
    const accessToken = useAuthStore((state) => state.accessToken);
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  function (error) {
    // 요청 오류가 있는 작업 수행
    return Promise.reject(error);
  },
);

instance.interceptors.response.use((config) => {
  config.headers.Authorization = null;
  return config;
});

export default instance;
