import axios, { type AxiosInstance } from 'axios';

// 토큰 재발급 인스턴스 생성
export const RefreshInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { language: 'ko' },
});
