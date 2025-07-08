import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

import { ACCESS_TOKEN } from '@/constants/auth';

interface AuthState {
  accessToken: string | null;
  isLogined: boolean;
  setAccessToken: (token: string | null) => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      isLogined: false,
      setAccessToken: (token) => set({ accessToken: token, isLogined: !!token }),
    }),
    {
      name: ACCESS_TOKEN,
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useAuthStore;
