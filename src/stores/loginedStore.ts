import { create } from 'zustand';

interface LoginedState {
  isLogined: boolean | null;
  setLoadined: (token: string | null) => void;
}

const useLoginedStore = create<LoginedState>()((set) => ({
  isLogined: null,
  setLoadined: (token) => set({ isLogined: !!token }),
}));

export default useLoginedStore;
