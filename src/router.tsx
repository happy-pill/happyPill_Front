import { createBrowserRouter } from 'react-router-dom';

import { routePath } from './constants/path';

import {
  AdminLayout,
  AdminManagementUserPage,
  AdminManagementProductPage,
  AdminManagementSubscribePage,
  CartPage,
  Layout,
  LoginPage,
  MainPage,
  OauthRedirectPage,
  ProductPage,
  AdminManagementUserDetailPage,
} from '@/pages/index';

const router = createBrowserRouter([
  /** MEMBER */
  {
    path: routePath.common.root,
    element: <Layout />,
    errorElement: '',
    children: [
      { index: true, element: <MainPage /> },
      {
        path: routePath.common.login,
        element: <LoginPage />,
      },
      { path: routePath.common.oauthRedirect, element: <OauthRedirectPage /> },
      { path: routePath.common.product.root, element: <ProductPage /> },
      { path: routePath.common.cart, element: <CartPage /> },
    ],
  },
  /** ADMIN */
  {
    path: routePath.admin.root,
    element: <AdminLayout />,
    errorElement: '',
    children: [
      {
        path: routePath.admin.management.subscribe,
        element: <AdminManagementSubscribePage />,
      },
      {
        path: routePath.admin.management.user.root,
        element: <AdminManagementUserPage />,
      },
      {
        path: routePath.admin.management.user.detail.root,
        element: <AdminManagementUserDetailPage />,
      },
      {
        path: routePath.admin.management.product,
        element: <AdminManagementProductPage />,
      },
      {
        path: routePath.admin.management.category,
        element: null,
      },
    ],
  },
]);

export default router;
