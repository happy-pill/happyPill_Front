import { Outlet } from 'react-router-dom';

import LayoutContainer from './container/LayoutContainer';
import Footer from './Footer';
import Header from './Header';
import GlobalContainer from './modal/GlobalContainer';

// TODO 각 페이지 확인 후 LayoutContainer 추가 여부 관련 수정 필요
const Layout = () => {
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
