import { routePath } from './path';

export const ADMIN_NAV_ITEMS = [
  {
    type: 'managementSubscribe',
    name: '구독 상품 관리',
    path: routePath.admin.management.subscribe,
  },
  {
    type: 'managementUser',
    name: '회원 관리',
    path: routePath.admin.management.user.root,
  },
  {
    type: 'managementProduct',
    name: '상품 관리',
    path: routePath.admin.management.product.root,
  },
  {
    type: 'managementCategory',
    name: '카테고리 관리',
    path: routePath.admin.management.category,
  },
];
