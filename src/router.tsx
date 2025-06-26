import { createBrowserRouter } from 'react-router-dom';

import { Layout, MainPage } from './pages/index';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: '',
    children: [{ index: true, element: <MainPage /> }],
  },
]);

export default router;
