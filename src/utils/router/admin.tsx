import { routePath } from '@/constants/path';
import { AdminLayout, AdminSubscribeProductPage } from '@/pages';

const adminRouter = [
  {
    path: routePath.admin.management.subscribe,
    element: <AdminLayout />,
    errorElement: '',
    children: [{ index: true, element: <AdminSubscribeProductPage /> }],
  },
  {
    path: routePath.admin.management.member,
    element: <AdminLayout />,
    errorElement: '',
    children: [{ index: true }],
  },
  {
    path: routePath.admin.management.product,
    element: <AdminLayout />,
    errorElement: '',
    children: [{ index: true }],
  },
  {
    path: routePath.admin.management.category,
    element: <AdminLayout />,
    errorElement: '',
    children: [{ index: true }],
  },
];

export default adminRouter;
