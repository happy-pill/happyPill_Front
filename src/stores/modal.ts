import { create } from 'zustand';

import type { ModalItem } from '@/types/modal';

interface ModalState {
  modals: ModalItem[];
  openModal: (modal: ModalItem) => void;
  closeModal: () => void;
}

const useModalStore = create<ModalState>((set) => ({
  modals: [],
  openModal: ({ type, props }) => {
    set((state) => ({ modals: [...state.modals, { type, props } as ModalItem] }));
  },
  closeModal: () => set((state) => ({ modals: state.modals.slice(0, -1) })),
}));

export default useModalStore;
