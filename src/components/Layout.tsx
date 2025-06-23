import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import GlobalContainer from './modal/GlobalContainer'

const Layout = () => {
  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <div className='flex-1'>
        <Outlet />
      </div>
      <Footer />
      <GlobalContainer />
    </div>
  )
}

export default Layout
