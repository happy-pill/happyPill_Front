import axios, { AxiosError, type AxiosInstance } from 'axios';
import { redirect } from 'react-router-dom';

import { appStorage } from '@/utils/appStorage';
import { setRefreshToAccessToken } from '@/utils/auth/refreshToAccessToken';

// 인스턴스 생성
export const instance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// 요청 타임아웃
instance.defaults.timeout = 2500;

// 요청
instance.interceptors.request.use(
  function (config) {
    const currentLanguage = appStorage.getLanguage();
    config.headers.language = currentLanguage;

    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

// 응답
instance.interceptors.response.use(
  function (respones) {
    return respones;
  },
  async function (error: AxiosError) {
    const originalConfig = error.config; // 서버에 보내려고 했던 요청

    const { accessToken } = await setRefreshToAccessToken();

    if (accessToken && originalConfig) {
      originalConfig.headers.Authorization = `Bearer ${accessToken}`;
      return axios(originalConfig);
    } else {
      redirect('/login');
    }

    return Promise.reject(error);
  },
);

export default instance;
