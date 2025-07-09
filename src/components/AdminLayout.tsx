import { Outlet } from 'react-router-dom';

import AdminHeader from './AdminHeader';
import LayoutContainer from './container/LayoutContainer';
import GlobalContainer from './modal/GlobalContainer';
import AdminNavigation from './navigation/AdminNavigation';

// TODO 각 페이지 확인 후 LayoutContainer 추가 여부 관련 수정 필요
const AdminLayout = () => {
  return (
    <div className='flex min-h-screen flex-col'>
      <AdminHeader />

      <div className='flex h-full w-full'>
        <AdminNavigation />
        <LayoutContainer>
          <Outlet />
        </LayoutContainer>
      </div>

      <GlobalContainer />
    </div>
  );
};

export default AdminLayout;
