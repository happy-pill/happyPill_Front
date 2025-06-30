import { useQuery } from '@tanstack/react-query';

import productAPI from '@/apis/member/product.api';
import { queryKey } from '@/constants/queryKey';

/**
 * GET getProductList
 * @param categoryId
 * @param lastProductId
 * @param size
 * @returns 프로덕트 리스트 데이터
 */
export const useGetProductList = (categoryId: string, lastProductId?: number, size: number = 8) => {
  return useQuery({
    queryKey: ['productList'],
    queryFn: () => productAPI.getProductList(categoryId, lastProductId, size),
  });
};

/**
 * GET getProductDetail
 * @param productId
 * @returns 상품 상세 정보 데이터
 */
export const useGetProductDetail = (productId: string) => {
  return useQuery({
    queryKey: queryKey.member.product.detail(productId),
    queryFn: () => productAPI.getProductDetail(productId),
  });
};

/**
 * GET getRelatedProducts
 * @returns 관련 상품 보기 (제일 많이 팔리는 순) 리스트
 */
export const useGetRelatedProducts = () => {
  return useQuery({
    queryKey: queryKey.member.product.related,
    queryFn: () => productAPI.getRelatedProducts(),
  });
};
