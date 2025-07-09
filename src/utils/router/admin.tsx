import { AdminLayout, AdminSubscriptionProductPage } from '@/pages';

const adminRouter = [
  {
    path: '/admin/subscription-product',
    element: <AdminLayout />,
    errorElement: '',
    children: [{ index: true, element: <AdminSubscriptionProductPage /> }],
  },
];

export default adminRouter;
