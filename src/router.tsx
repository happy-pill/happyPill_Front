// router.tsx
import { createBrowserRouter } from 'react-router-dom'
import { Layout, ErrorPage, LoginPage, MyPage, Mainpage, RefundPage, AboutPage } from './utils'
import PurchasedItemsListPage from './pages/admin/PurchasedItemsListPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Mainpage /> },
      // 헤더/푸터가 있는 페이지들
      { path: 'mypage', element: <MyPage /> },
      { path: 'refund', element: <RefundPage /> },
      { path: 'commpony', element: <AboutPage /> },

      { path: 'purchased', element: <PurchasedItemsListPage /> },
      {},
    ],
  },
  {
    path: '/login',
    element: <LoginPage />, // 헤더/푸터 없는 페이지
  },
])

export default router
