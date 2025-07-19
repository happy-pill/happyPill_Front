import { useInfiniteQuery, useQuery, type QueryFunctionContext } from '@tanstack/react-query';
import { useMemo } from 'react';

import type { Category } from '@/types/category';

import productAPI from '@/apis/member/product.api';
import { queryKey } from '@/constants/queryKey';

interface PageParam {
  categoryIndex: number;
  lastProductId?: string;
}

/**
 * GET useGetProductList
 * @param categories 카테고리 리스트
 * @param size
 * @returns 프로덕트 리스트 데이터
 */
export const useGetProductList = (categories: Category[], activeCategoryId: string = 'ALL') => {
  const filteredCategories = useMemo(() => {
    if (!categories || categories.length === 0) return [];
    return activeCategoryId === 'ALL'
      ? categories
      : categories.filter((category) => category.categoryId === activeCategoryId);
  }, [categories, activeCategoryId]);

  return useInfiniteQuery({
    queryKey: queryKey.member.product.list(
      activeCategoryId,
      filteredCategories.map((c) => c.categoryId),
    ),
    queryFn: async ({ pageParam }: QueryFunctionContext) => {
      const { categoryIndex = 0, lastProductId } = pageParam as PageParam;
      const currentCategory = filteredCategories[categoryIndex];

      let currentCategoryIndex = categoryIndex;
      let response;

      while (currentCategoryIndex < filteredCategories.length) {
        const currentCategory = filteredCategories[currentCategoryIndex];

        response = await productAPI.getProductList(currentCategory.categoryId, lastProductId);

        // 상품이 있으면 해당 카테고리의 데이터 반환
        if (response.products && response.products.length > 0) {
          return {
            ...response,
            categoryIndex: currentCategoryIndex,
            categoryId: currentCategory.categoryId,
          };
        }

        // 상품이 없으면 다음 카테고리로 이동
        currentCategoryIndex++;
      }
      return {
        ...response, // data:{products:[...], hasNext:boolean, lastProductId:string}
        categoryIndex,
        categoryId: currentCategory.categoryId,
      };
    },

    initialPageParam: { categoryIndex: 0, lastProductId: undefined } as PageParam,
    getNextPageParam: (lastPage): PageParam | undefined => {
      const { categoryIndex, lastProductId, hasNext } = lastPage;

      if (hasNext) {
        // 현재 카테고리에 더 많은 상품이 있으면 다음 페이지
        return {
          categoryIndex,
          lastProductId: lastProductId,
        };
      }

      // 현재 카테고리 완료, 다음 카테고리가 있는지 확인
      if (categoryIndex + 1 < filteredCategories.length) {
        return {
          categoryIndex: categoryIndex + 1,
          lastProductId: undefined,
        };
      }

      // 모든 카테고리 완료
      return undefined;
    },
    enabled: !!filteredCategories?.length,
  });
};

/**
 * GET getBestProductList
 * @returns 가장 많이 팔리는 상품 리스트
 */
export const useGetBestProductList = () => {
  return useQuery({
    queryKey: queryKey.member.product.related,
    queryFn: async () => await productAPI.getBestProductList(),
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
