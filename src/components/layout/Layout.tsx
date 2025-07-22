import { Outlet } from 'react-router-dom';

import Footer from '../footer/Footer';
import Header from '../header/Header';
import GlobalContainer from '../modal/GlobalContainer';

import { useAuthStateManager } from '@/hooks/useAuthStateManager';

// TODO 각 페이지 확인 후 LayoutContainer 추가 여부 관련 수정 필요
const Layout = () => {
  useAuthStateManager();
  return (
    <div className='flex min-h-screen flex-col'>
      <Header />
      <Outlet />
      <Footer />
      <GlobalContainer />
    </div>
  );
};

export default Layout;
