import SubscribeTable from '../molecule/SubscribeTable';

import type { AdminUserSubscribeList } from '@/types/admin';

import Pagination from '@/components/pagination/Pagination';

interface SubscribeListSectionProps {
  subscribeList: AdminUserSubscribeList;
  currentPage: number;
  onChangePage: (page: number) => void;
}

const SubscribeListSection = ({
  subscribeList,
  currentPage,
  onChangePage,
}: SubscribeListSectionProps) => {
  return (
    <div className='flex w-full flex-col items-center gap-16'>
      <SubscribeTable subscribeList={subscribeList} />

      <Pagination
        currentPage={currentPage}
        totalPage={subscribeList?.totalPages}
        onChangePage={onChangePage}
      />
    </div>
  );
};

export default SubscribeListSection;
