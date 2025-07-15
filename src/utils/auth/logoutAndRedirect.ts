import { redirect } from 'react-router-dom';

import { resetToken } from './authToken';

import authAPI from '@/apis/auth/auth.api';

export const logoutAndRedirect = async (refreshToken?: string) => {
  if (refreshToken) {
    await authAPI.postLogout(refreshToken);
  }
  resetToken();
  redirect('/login');
};
