import { useEffect, useState } from 'react';

import MainBanner from './components/molecules/MainBanner';
import PromotionBanner from './components/molecules/PromotionBanner';
import BestProductSection from './components/organisms/BestProduct';
import ProductSection from './components/organisms/Product';

import type { Category } from '@/types/category';

import { useGetCategoryDetail } from '@/hooks/api/member/category';
import { useGetBestProductList, useGetProductList } from '@/hooks/api/member/product';
import { useGetUserInfo } from '@/hooks/api/member/user';
import useModal from '@/hooks/useModal';

const Index = () => {
  const [activeCategoryId, setActiveCategoryId] = useState<string>('ALL');

  const { openModal } = useModal();

  const { data: userData } = useGetUserInfo();
  const { isLoading: isCategoryLoading, data: categoryBlock } = useGetCategoryDetail();
  const {
    data: productBlock,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isLoading: isProductLoading,
  } = useGetProductList(categoryBlock, activeCategoryId);
  const { data: bestProductBlock, isLoading: isBestProductLoading } = useGetBestProductList();

  const allProducts = productBlock?.pages.flatMap((page) => page.products) ?? [];

  const handleLoadMore = async () => {
    if (hasNextPage && !isFetchingNextPage) {
      let attempts = 0;
      const maxAttempts = 5; // 최대 5번까지 자동 재시도

      while (attempts < maxAttempts && hasNextPage) {
        await fetchNextPage();
        const lastPage = productBlock?.pages[productBlock.pages.length - 1];

        if (lastPage?.products?.length > 0) {
          break; // 상품을 찾았으면 중단
        }
        attempts++;
      }
    }
  };
  const handleCategoryChange = async (category: Category, isAll?: boolean) => {
    setActiveCategoryId(isAll ? 'ALL' : category.categoryId);
  };

  //페이지 렌더링 시, 유저 닉네임 여부 파악 후 모달 팝업
  useEffect(() => {
    if (userData && userData.nickname === null) {
      openModal({ type: 'welcomeStep' });
    }
  }, [userData]);

  return (
    <div className='mt-[100px]'>
      <MainBanner />
      <BestProductSection products={bestProductBlock} isLoading={isBestProductLoading} />
      <PromotionBanner />
      <ProductSection
        categories={categoryBlock}
        activeCategoryId={activeCategoryId}
        onCategoryChange={handleCategoryChange}
        onLoadMore={handleLoadMore}
        productBlock={allProducts}
        isCategoryLoading={isCategoryLoading}
        isProductLoading={isProductLoading}
        hasNext={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
      />
    </div>
  );
};

export default Index;
