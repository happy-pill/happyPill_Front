import { useMemo, useState } from 'react';

import type { Category, CategoryBlock } from '@/types/category';

import categoryAPI from '@/apis/category.api';
import productAPI from '@/apis/product.api';

export const useCategoryProductFlow = () => {
  const [categoryList, setCategoryList] = useState<Category[]>([]); // 카테고리 버튼 리스트 및 배너
  const [categoryBlocks, setCategoryBlocks] = useState<CategoryBlock[]>([]); // 카테고리 배너 및 상품 리스트
  const [isAllView, setIsAllView] = useState(false);
  const [currentCategoryId, setCurrentCategoryId] = useState<string | null>(null);
  const currentIndex = useMemo(() => {
    if (!Array.isArray(categoryList)) return -1;
    return categoryList.findIndex((c) => c.categoryId === currentCategoryId);
  }, [categoryList, currentCategoryId]);

  const hasNextCategory = currentIndex >= 0 && currentIndex < categoryList.length - 1;

  // 카테고리 버튼리스트들을 불러오는 함수
  const fetchCategories = async () => {
    const res = await categoryAPI.getCategoryDetail();
    console.log(res.data[0]);

    setCategoryList(res.data);
    return res.data;
  };
  // 카테고리 버튼 클릭 시 초기화 후 첫 페이지 상품 리스트는 불러온 후 상태 저장하는 함수
  const handleCategoryClick = async (category: Category, isAll?: boolean) => {
    setCurrentCategoryId(category.categoryId);
    setCategoryBlocks([]);
    setIsAllView(isAll ?? false);

    await loadProductsForCategory(category, null);
  };

  // 특정 카테고리에 대한 상품 리스트를 불러온 후 상태 저장하는 함수
  const loadProductsForCategory = async (category: Category, lastProductId?: number | null) => {
    try {
      const validLastProductId = lastProductId != null ? lastProductId : undefined;
      const res = await productAPI.getProductList(category.categoryId, validLastProductId);
      const { products, lastProductId: newLastId, hasNext } = res.data;

      setCategoryBlocks((prev) => {
        const existing = prev.find((block) => block.category.categoryId === category.categoryId);

        if (existing) {
          return prev.map((block) =>
            block.category.categoryId === category.categoryId
              ? {
                  ...block,
                  products: [...block.products, ...products],
                  lastProductId: newLastId,
                  hasNext,
                }
              : block,
          );
        } else {
          return [
            ...prev,
            {
              category,
              products,
              lastProductId: newLastId,
              hasNext,
            },
          ];
        }
      });
    } catch (err) {
      console.log('상품을 불러오는 중에 오류가 발생했습니다.', err);
    }
  };

  // 더보기 버튼 클릭 시 현재 카테고리 상품리스트를 더 불러오거나 다음 카테고리로 넘김
  const handleLoadMore = async (category: Category, lastProductId: number | null) => {
    const block = categoryBlocks.find((block) => block.category.categoryId === currentCategoryId);

    if (block && block.hasNext) {
      // 현재 카테고리 상품 추가 로드
      await loadProductsForCategory(category, lastProductId);
    } else {
      // 다음 카테고리 존재 여부 판단
      if (isAllView) {
        // 전체 보기 모드에서만 다음 카테고리로 넘어감
        if (hasNextCategory) {
          const nextCategory = categoryList[currentIndex + 1];

          await loadProductsForCategory(nextCategory, null);
          setCurrentCategoryId(nextCategory.categoryId); // 현재 카테고리 업데이트
        }
      }
    }
  };
  return {
    currentCategoryId,
    categoryList,
    categoryBlocks,
    hasNextCategory,
    isAllView,
    handleCategoryClick,
    handleLoadMore,
    fetchCategories,
    setCategoryList,
    setCategoryBlocks,
  };
};
