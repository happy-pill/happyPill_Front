import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import GlobalContainer from './modal/GlobalContainer'

const Layout = () => {
  return (
    <div>
      <Header />
      <div>
        <Outlet />
      </div>
      <Footer />
      <GlobalContainer />
    </div>
  )
}

export default Layout
