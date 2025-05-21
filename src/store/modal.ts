import { create } from 'zustand'

export interface ModalConfig {
  type: string
  props?: Record<string, unknown>
}

interface ModalState {
  modals: ModalConfig[]
  openModal: (modal: ModalConfig) => void
  closeModal: () => void
}

const useModalStore = create<ModalState>((set) => ({
  modals: [],
  openModal: (modal) => set((state) => ({ modals: [...state.modals, modal] })),
  closeModal: () => set((state) => ({ modals: state.modals.slice(0, -1) })),
}))

export default useModalStore
