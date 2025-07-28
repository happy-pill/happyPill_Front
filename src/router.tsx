import { createBrowserRouter } from 'react-router-dom';


import { routePath } from './constants/path';
import {
  AdminLayout,
  AdminManagementUserPage,
  AdminManagementProductPage,
  AdminManagementSubscribePage,
  Layout,
  LoginPage,
  MainPage,
  OauthRedirectPage,
  ProductPage,
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
        path: routePath.admin.management.user,
        element: <AdminManagementUserPage />,
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
