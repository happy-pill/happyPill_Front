import { Outlet } from 'react-router-dom';

import Footer from '../footer/Footer';
import Header from '../header/Header';
import GlobalContainer from '../modal/GlobalContainer';

import { useAuthStateManager } from '@/hooks/useAuthStateManager';

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
