// NOTE 분류, path 네이밍은 같은 의논해서 결정하기

/** 유저 - 로그인 없이 접근 */
const common = {
  root: '/',
  login: '/login',
  logout: '/logout',
  oauthRedirect: '/oauth-redirect',
  product: {
    root: '/product/:productId',
    route: (productId: string) => `/product/${productId}`,
  },
  cart: '/cart',
};

/** 유저 - 로그인 후 접근 */
const member = {
  root: '/',
  mypage: {
    root: '/mypage',
  },
};

/** 관리자 */
const admin = {
  root: '/admin',
  /** 관리 */
  management: {
    root: '/admin/management',
    subscribe: '/admin/management/subscribe-product', // 구독상품 관리
    member: '/admin/management/member', // 회원 관리
    product: '/admin/management/product', // 상품 관리
    category: '/admin/management/categoryproduct', // 카테고리 관리
  },
};

export const routePath = {
  common,
  member,
  admin,
};
