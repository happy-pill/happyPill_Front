import axios, { type AxiosInstance } from 'axios';

import { appStorage } from '@/utils/appStorage';

// 토큰 재발급 인스턴스 생성
export const RefreshInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// 요청
RefreshInstance.interceptors.request.use(
  function (config) {
    const currentLanguage = appStorage.getLanguage();
    config.headers.language = currentLanguage;

    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);
