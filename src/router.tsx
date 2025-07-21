import { createBrowserRouter } from 'react-router-dom';

import { Layout, LoginPage, MainPage, OauthRedirectPage } from './pages/index';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: '',
    children: [{ index: true, element: <MainPage /> }],
  },
  {
    path: '/login',
    element: <Layout />,
    errorElement: '',
    children: [{ index: true, element: <LoginPage /> }],
  },
  {
    path: '/oauth-redirect',
    element: <Layout />,
    errorElement: '',
    children: [{ index: true, element: <OauthRedirectPage /> }],
  },
]);

export default router;
