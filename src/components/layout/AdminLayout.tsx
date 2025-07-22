import { Outlet } from 'react-router-dom';

import AdminContainer from '../container/AdminContainer';
import AdminHeader from '../header/AdminHeader';
import GlobalContainer from '../modal/GlobalContainer';
import AdminNavigation from '../navigation/AdminNavigation';

// TODO 각 페이지 확인 후 LayoutContainer 추가 여부 관련 수정 필요
const AdminLayout = () => {
  return (
    <div className='flex min-h-screen flex-col'>
      <AdminHeader />

      <div className='flex h-[calc(100vh-100px)] w-full'>
        <AdminNavigation />
        <AdminContainer>
          <Outlet />
        </AdminContainer>
      </div>

      <GlobalContainer />
    </div>
  );
};

export default AdminLayout;
