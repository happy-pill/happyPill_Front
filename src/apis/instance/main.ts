import axios from "axios";

// 인스턴스 생성
const instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials:true,
})

// 요청 타임아웃
instance.defaults.timeout = 2500;

// TODO : request header Authorization 설정
// TODO : 로그인 만료 처리 interceptors

export default instance;