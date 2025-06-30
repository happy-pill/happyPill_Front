import { useQuery } from '@tanstack/react-query';

import categoryAPI from '@/apis/member/category.api';
import { queryKey } from '@/constants/queryKey';

/**
 * GET getCategoryDetail
 * @returns 카테고리 디테일
 */
export const useGetCategoryDetail = () => {
  return useQuery({
    queryKey: queryKey.member.category.detail,
    queryFn: () => categoryAPI.getCategoryDetail(),
  });
};
