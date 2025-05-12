import axios from "axios";

// 인스턴스 생성
const refresh = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials:true,
})

// 요청 타임아웃
refresh.defaults.timeout = 2500;

refresh.interceptors.request.use((config) => {
  config.headers.Authorization = null;
  return config;
});



export default refresh;