import { createBrowserRouter } from 'react-router-dom'
import { Layout, ErrorPage, LoginPage, MyPage, RefundPage, AboutPage, MainPage } from './utils'
import MembershipManagementPage from './pages/admin/MembershipManagementPage'
import SubscriptionListPage from './pages/admin/SubscriptionListPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <MainPage /> },
      // 헤더/푸터가 있는 페이지들
      { path: 'mypage', element: <MyPage /> },
      { path: 'refund', element: <RefundPage /> },
      { path: 'company', element: <AboutPage /> },
      {},
      {
        path: 'admin',
        children: [
          { path: 'subscription', element: <SubscriptionListPage /> },
          { path: 'membership', element: <MembershipManagementPage /> },
        ],
      },
    ],
  },
  {
    path: '/login',
    element: <LoginPage />, // 헤더/푸터 없는 페이지
  },
])

export default router
