import { routePath } from '@/constants/path';
import { Layout, MainPage } from '@/pages';

const memberRouter = [
  {
    path: routePath.common.root,
    element: <Layout />,
    errorElement: '',
    children: [{ index: true, element: <MainPage /> }],
  },
];

export default memberRouter;
