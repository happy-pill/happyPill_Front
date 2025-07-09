import { Layout, MainPage } from '@/pages';

const memberRouter = [
  {
    path: '/',
    element: <Layout />,
    errorElement: '',
    children: [{ index: true, element: <MainPage /> }],
  },
];

export default memberRouter;
