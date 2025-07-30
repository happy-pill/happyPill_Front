import { useState } from 'react';

import Title from './components/atom/Title';
import ProductListSection from './components/organism/ProductListSection';
import TopControlsSection from './components/organism/TopControlsSection';

import LayoutContainer from '@/components/container/LayoutContainer';
import { ADMIN_SELECT_ITEMS } from '@/constants/common';
import { useGetProductList } from '@/hooks/api/admin/management';

const Index = () => {
  const [page, setPage] = useState(1);

  const { data: productList } = useGetProductList(page, Math.min(...ADMIN_SELECT_ITEMS));

  const onChangePage = (page: number) => {
    setPage(page);
  };

  return (
    <LayoutContainer isMaxW={false} isHeader={false} px='px-0'>
      <Title>상품 관리</Title>

      <TopControlsSection />

      {productList && productList.contents.length > 0 ? (
        <ProductListSection
          productList={productList}
          currentPage={page}
          onChangePage={onChangePage}
        />
      ) : (
        <div className='text-md flex w-full items-center justify-center text-center text-gray-400'>
          등록된 상품이 없습니다.
        </div>
      )}
    </LayoutContainer>
  );
};

export default Index;
