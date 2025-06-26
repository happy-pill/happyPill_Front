import { Outlet } from 'react-router-dom';

import Footer from './Footer';
import Header from './Header';
import GlobalContainer from './modal/GlobalContainer';

const Layout = () => {
  return (
    <div className='flex min-h-screen flex-col'>
      <Header />
      <div className='flex-1'>
        <Outlet />
      </div>
      <Footer />
      <GlobalContainer />
    </div>
  );
};

export default Layout;
