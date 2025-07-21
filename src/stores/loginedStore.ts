import { create } from 'zustand';

interface LoginedState {
  isLogined: boolean | null;
  setLogined: (token: boolean | null) => void;
}

const useLoginedStore = create<LoginedState>()((set) => ({
  isLogined: null,
  setLogined: (token) => set({ isLogined: !!token }),
}));

export default useLoginedStore;
