import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useGetUserInfo } from './api/member/user';

import useLoginedStore from '@/stores/loginedStore';

/**
 * db에서 유저정보를 가져와서 nickname 여부를 확인 후 login상태를 업데이트하기 위한 커스텀 훅입니다.
 * @returns userData: 유저정보 isLoading: 로딩 상태
 *
 */
export const useAuthStateManager = () => {
  const { setLogined } = useLoginedStore();
  const navigate = useNavigate();
  const { data: userData, isLoading, error } = useGetUserInfo();

  useEffect(() => {
    if (isLoading) return;

    // 에러가 있으면 로그아웃 상태
    if (error) {
      setLogined(null);
      return;
    }

    // 유저 정보가 없으면 로그아웃 상태
    if (!userData) {
      setLogined(null);
      return;
    }
    if (userData.nickname === null) {
      // 닉네임이 없으면 온보딩 필요
      if (window.location.pathname !== '/') {
        navigate('/');
      }
    } else {
      setLogined(true);
    }
  }, [userData, isLoading, setLogined, navigate, error]);

  return { userData, isLoading };
};
