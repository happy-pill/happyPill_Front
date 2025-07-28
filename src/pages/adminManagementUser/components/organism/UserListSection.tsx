import UserTable from '../molecule/UserTable';

import type { AdminUserList } from '@/types/admin';

import Pagination from '@/components/pagination/Pagination';

interface userListSectionProps {
  userList: AdminUserList;
  currentPage: number;
  onChangePage: (page: number) => void;
}

const UserListSection = ({ userList, currentPage, onChangePage }: userListSectionProps) => {
  return (
    <div className='flex w-full flex-col items-center gap-16'>
      <UserTable userList={userList} />

      <Pagination
        currentPage={currentPage}
        totalPage={userList?.totalPages}
        onChangePage={onChangePage}
      />
    </div>
  );
};

export default UserListSection;
