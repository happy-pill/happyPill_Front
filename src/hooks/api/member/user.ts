import { useMutation, useQuery } from '@tanstack/react-query';

import userAPI from '@/apis/member/user.api';
import { queryKey } from '@/constants/queryKey';

export const useGetUserInfo = () => {
  return useQuery({
    queryKey: queryKey.member.user.info,
    queryFn: () => userAPI.getUserInfo(),
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
};

export const usePostUserNickname = () => {
  return useMutation({
    mutationKey: queryKey.member.user.updateNickname,
    mutationFn: (nickname: string) => userAPI.postUserNickname(nickname),
  });
};
