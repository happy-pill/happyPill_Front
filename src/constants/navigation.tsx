import { CiLogin, CiLogout, CiUser } from 'react-icons/ci';
import { PiShoppingBagLight } from 'react-icons/pi';
import { redirect } from 'react-router-dom';

import { routePath } from './path';

import { resetToken } from '@/utils/auth/authToken';

export const NAVIGATION_ICON_SIZE = 25;

export const HEADER_COMMON_ITEMS = [
  {
    type: 'cart',
    name: '장바구니',
    icon: <PiShoppingBagLight size={NAVIGATION_ICON_SIZE} />,
    path: routePath.common.cart,
  },
];

export const LOGGEND_OUT_ITEMS = [
  {
    type: 'login',
    name: '로그인',
    icon: <CiLogin size={NAVIGATION_ICON_SIZE} />,
    path: routePath.common.login,
  },
];

export const LOGGEND_IN_ITEMS = [
  {
    type: 'logout',
    name: '로그아웃',
    icon: <CiLogout size={NAVIGATION_ICON_SIZE} />,
    path: () => {
      resetToken();
      redirect('/');
    },
  },
  {
    type: 'user',
    name: '내정보',
    icon: <CiUser size={NAVIGATION_ICON_SIZE} />,
    path: routePath.member.mypage,
  },
];

export const ADMIN_HEADER_ITEMS = [
  {
    type: 'logout',
    name: '로그아웃',
    icon: <CiLogout size={NAVIGATION_ICON_SIZE} />,
    path: '/',
  },
  {
    type: 'user',
    name: '사용자 전환',
    icon: <CiUser size={NAVIGATION_ICON_SIZE} />,
    path: '/',
  },
];
