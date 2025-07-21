import { useMutation, useQuery } from '@tanstack/react-query';

import userAPI from '@/apis/member/user.api';
import { queryKey } from '@/constants/queryKey';
import useLoginedStore from '@/stores/loginedStore';

export const useGetUserInfo = () => {
  const { isLogined } = useLoginedStore();
  return useQuery({
    queryKey: queryKey.member.user.info,
    queryFn: () => userAPI.getUserInfo(),
    enabled: !!isLogined,
    retry: false,
  });
};

export const usePostUserNickname = () => {
  return useMutation({
    mutationKey: queryKey.member.user.updateNickname,
    mutationFn: (nickname: string) => userAPI.postUserNickname(nickname),
  });
};
