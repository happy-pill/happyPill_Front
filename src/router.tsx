import { createBrowserRouter } from 'react-router-dom';

import { routePath } from './constants/path';
import { AdminLayout, Layout, LoginPage, MainPage, OauthRedirectPage } from './pages/index';

const router = createBrowserRouter([
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
    ],
  },
  {
    path: routePath.admin.root,
    element: <AdminLayout />,
    errorElement: '',
    children: [
      {
        path: routePath.admin.management.subscribe,
        element: null,
      },
      {
        path: routePath.admin.management.member,
        element: null,
      },
      {
        path: routePath.admin.management.product,
        element: null,
      },
      {
        path: routePath.admin.management.category,
        element: null,
      },
    ],
  },
]);

export default router;
