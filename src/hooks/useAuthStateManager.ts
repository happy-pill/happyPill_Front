import { useEffect } from 'react';

import { useGetUserInfo } from './api/member/user';

import useLoginedStore from '@/stores/loginedStore';

/**
 * db에서 유저정보를 가져와서 nickname 여부를 확인 후 login상태를 업데이트하기 위한 커스텀 훅입니다.
 * @returns userData: 유저정보 isLoading: 로딩 상태
 *
 */

export const useAuthStateManager = () => {
  const { data: userData, isLoading } = useGetUserInfo();
  const { setLogined } = useLoginedStore();

  useEffect(() => {
    if (isLoading) return;

    if (userData) {
      setLogined(userData.nickname !== null);
    } else {
      setLogined(false);
    }
  }, [userData, isLoading, setLogined]);

  return { userData, isLoading };
};
