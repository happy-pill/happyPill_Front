import { Outlet } from 'react-router-dom';

import AdminContainer from '../container/AdminContainer';
import AdminHeader from '../header/AdminHeader';
import GlobalContainer from '../modal/GlobalContainer';
import AdminNavigation from '../navigation/AdminNavigation';

const AdminLayout = () => {
  return (
    <div className='flex min-h-screen flex-col'>
      <AdminHeader />

      <div className='flex h-[calc(100vh-80px)] w-full'>
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
