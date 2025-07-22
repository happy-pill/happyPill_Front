import { routePath } from '@/constants/path';
import { Layout, LoginPage, MainPage, OauthRedirectPage } from '@/pages';

const memberRouter = [
  {
    path: routePath.common.root,
    element: <Layout />,
    errorElement: '',
    children: [{ index: true, element: <MainPage /> }],
  },
  {
    path: routePath.common.login,
    element: <Layout />,
    errorElement: '',
    children: [{ index: true, element: <LoginPage /> }],
  },
  {
    path: routePath.common.oauthRedirect,
    element: <Layout />,
    errorElement: '',
    children: [{ index: true, element: <OauthRedirectPage /> }],
  },
];

export default memberRouter;
