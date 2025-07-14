import { create } from 'zustand';

interface LoginedState {
  isLogined: boolean;
  setLoadined: (token: string | null) => void;
}

const useLoginedStore = create<LoginedState>()((set) => ({
  isLogined: false,
  setLoadined: (token) => set({ isLogined: !!token }),
}));

export default useLoginedStore;
