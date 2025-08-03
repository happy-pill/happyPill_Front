import { useState } from 'react';

import TopControlsSection from './components/organism/TopControlsSection';
import UserListSection from './components/organism/UserListSection';

import PageTitle from '@/components/common/PageTitle';
import LayoutContainer from '@/components/container/LayoutContainer';
import { ADMIN_SELECT_ITEMS } from '@/constants/common';
import { useGetUserList } from '@/hooks/api/admin/management';

const Index = () => {
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(Math.min(...ADMIN_SELECT_ITEMS));

  const { data: userList } = useGetUserList(page, size);

  const onChangePage = (page: number) => {
    setPage(page);
  };

  const onChangeSize = (size: number | string) => {
    setSize(Number(size));
  };

  return (
    <LayoutContainer isMaxW={false} isHeader={false} px='px-0'>
      <PageTitle>회원 관리</PageTitle>

      <TopControlsSection currentSize={size} onChange={onChangeSize} />

      {userList && userList.contents.length > 0 ? (
        <UserListSection userList={userList} currentPage={page} onChangePage={onChangePage} />
      ) : (
        <div className='text-md flex w-full items-center justify-center text-center text-gray-400'>
          회원이 없습니다.
        </div>
      )}
    </LayoutContainer>
  );
};

export default Index;
