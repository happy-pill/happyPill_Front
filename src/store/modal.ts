import { create } from 'zustand'
import { ModalItem } from '../types/modal'

interface ModalState {
  modals: ModalItem[]
  openModal: (modal: ModalItem) => void
  closeModal: () => void
}

const useModalStore = create<ModalState>((set) => ({
  modals: [],
  openModal: (modal) => set((state) => ({ modals: [...state.modals, modal] })),
  closeModal: () => set((state) => ({ modals: state.modals.slice(0, -1) })),
}))

export default useModalStore
