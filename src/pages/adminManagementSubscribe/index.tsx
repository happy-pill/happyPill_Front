import { useState } from 'react';

import Title from './components/atom/Title';
import SubscribeListSection from './components/organism/SubscribeListSection';
import TopControlsSection from './components/organism/TopControlsSection';

import LayoutContainer from '@/components/container/LayoutContainer';
import { ADMIN_SELECT_ITEMS } from '@/constants/common';
import { useGetUserSubscriptionsList } from '@/hooks/api/admin/management';

const Index = () => {
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(Math.min(...ADMIN_SELECT_ITEMS));

  const { data: subscribeList } = useGetUserSubscriptionsList(page, size);

  const onChangePage = (page: number) => {
    setPage(page);
  };

  const onChangeSize = (size: number | string) => {
    setSize(Number(size));
  };

  return (
    <LayoutContainer isMaxW={false} isHeader={false} px='px-0'>
      <Title>구독 상품 관리</Title>

      <TopControlsSection currentSize={size} onChange={onChangeSize} />

      {subscribeList && subscribeList.contents.length > 0 ? (
        <SubscribeListSection
          subscribeList={subscribeList}
          currentPage={page}
          onChangePage={onChangePage}
        />
      ) : (
        <div className='text-md flex w-full items-center justify-center text-center text-gray-400'>
          구독 중인 회원이 없습니다.
        </div>
      )}
    </LayoutContainer>
  );
};

export default Index;
